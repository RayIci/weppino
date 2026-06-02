package com.weppino.shared.cqrs;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import org.junit.jupiter.api.Test;

class SimpleMediatorTest {

  // --- Fixtures ---

  private record TestCommand(String value) implements Command<String> {}

  private record AnotherCommand(int n) implements Command<Integer> {}

  private record TestQuery(String id) implements Query<String> {}

  private record TestNotification(String event) implements Notification {}

  private record AnotherNotification(int code) implements Notification {}

  private static class TestCommandHandler implements RequestHandler<TestCommand, String> {
    @Override
    public CompletableFuture<String> handle(TestCommand request) {
      return CompletableFuture.completedFuture(request.value());
    }
  }

  private static class TestQueryHandler implements RequestHandler<TestQuery, String> {
    @Override
    public CompletableFuture<String> handle(TestQuery request) {
      return CompletableFuture.completedFuture(request.id());
    }
  }

  // Captures the last received request value to assert correct routing
  private static class CapturingCommandHandler implements RequestHandler<TestCommand, String> {
    String lastReceived = null;

    @Override
    public CompletableFuture<String> handle(TestCommand request) {
      lastReceived = request.value();
      return CompletableFuture.completedFuture("result:" + request.value());
    }
  }

  private static class CapturingAnotherCommandHandler
      implements RequestHandler<AnotherCommand, Integer> {
    int lastReceived = -1;

    @Override
    public CompletableFuture<Integer> handle(AnotherCommand request) {
      lastReceived = request.n();
      return CompletableFuture.completedFuture(request.n());
    }
  }

  // Counts how many times it was invoked to assert notification fan-out
  private static class CountingNotificationHandler
      implements NotificationHandler<TestNotification> {
    int invocationCount = 0;

    @Override
    public CompletableFuture<Void> handle(TestNotification notification) {
      invocationCount++;
      return CompletableFuture.completedFuture(null);
    }
  }

  private static class CountingAnotherNotificationHandler
      implements NotificationHandler<AnotherNotification> {
    int invocationCount = 0;

    @Override
    public CompletableFuture<Void> handle(AnotherNotification notification) {
      invocationCount++;
      return CompletableFuture.completedFuture(null);
    }
  }

  private static class FailingRequestHandler implements RequestHandler<TestCommand, String> {
    @Override
    public CompletableFuture<String> handle(TestCommand request) {
      return CompletableFuture.failedFuture(new RuntimeException("handler failed"));
    }
  }

  private static class FailingNotificationHandler implements NotificationHandler<TestNotification> {
    @Override
    public CompletableFuture<Void> handle(TestNotification notification) {
      return CompletableFuture.failedFuture(new RuntimeException("handler failed"));
    }
  }

  // --- send(): happy path ---

  @Test
  void sendCommandReturnsHandlerResponse() {
    var mediator = new MediatorBuilder().register(new TestCommandHandler()).build();
    assertEquals("ping", mediator.send(new TestCommand("ping")).join());
  }

  @Test
  void sendQueryReturnsHandlerResponse() {
    var mediator = new MediatorBuilder().register(new TestQueryHandler()).build();
    assertEquals("user-1", mediator.send(new TestQuery("user-1")).join());
  }

  @Test
  void sendDispatchesToCorrectHandler() {
    var handler = new CapturingCommandHandler();
    var mediator = new MediatorBuilder().register(handler).build();
    mediator.send(new TestCommand("hello")).join();
    assertEquals("hello", handler.lastReceived);
  }

  @Test
  void sendReturnsExactHandlerResponse() {
    var mediator = new MediatorBuilder().register(new CapturingCommandHandler()).build();
    assertEquals("result:ping", mediator.send(new TestCommand("ping")).join());
  }

  @Test
  void sendRoutesToCorrectHandlerWhenMultipleRegistered() {
    var commandHandler = new CapturingCommandHandler();
    var anotherHandler = new CapturingAnotherCommandHandler();
    var mediator = new MediatorBuilder().register(commandHandler).register(anotherHandler).build();

    mediator.send(new TestCommand("hello")).join();
    mediator.send(new AnotherCommand(42)).join();

    assertEquals("hello", commandHandler.lastReceived);
    assertEquals(42, anotherHandler.lastReceived);
  }

  // --- send(): error cases ---

  @Test
  void sendThrowsWhenNoHandlerRegistered() {
    var mediator = new MediatorBuilder().build();
    assertThrows(IllegalStateException.class, () -> mediator.send(new TestCommand("x")));
  }

  @Test
  void sendHandlerExceptionPropagatesThroughFuture() {
    var mediator = new MediatorBuilder().register(new FailingRequestHandler()).build();
    assertThrows(CompletionException.class, () -> mediator.send(new TestCommand("x")).join());
  }

  // --- publish(): happy path ---

  @Test
  void publishInvokesSingleRegisteredHandler() {
    var handler = new CountingNotificationHandler();
    var mediator = new MediatorBuilder().register(handler).build();
    mediator.publish(new TestNotification("event")).join();
    assertEquals(1, handler.invocationCount);
  }

  @Test
  void publishInvokesAllHandlersForSameNotificationType() {
    var h1 = new CountingNotificationHandler();
    var h2 = new CountingNotificationHandler();
    var mediator = new MediatorBuilder().register(h1).register(h2).build();

    mediator.publish(new TestNotification("event")).join();

    assertEquals(1, h1.invocationCount);
    assertEquals(1, h2.invocationCount);
  }

  @Test
  void publishWithNoHandlersCompletesNormally() {
    var mediator = new MediatorBuilder().build();
    assertDoesNotThrow(() -> mediator.publish(new TestNotification("event")).join());
  }

  @Test
  void publishOnlyInvokesHandlersForMatchingNotificationType() {
    var testHandler = new CountingNotificationHandler();
    var anotherHandler = new CountingAnotherNotificationHandler();
    var mediator = new MediatorBuilder().register(testHandler).register(anotherHandler).build();

    mediator.publish(new TestNotification("event")).join();

    assertEquals(1, testHandler.invocationCount);
    assertEquals(0, anotherHandler.invocationCount);
  }

  // --- publish(): error cases ---

  @Test
  void publishHandlerExceptionPropagatesThroughFuture() {
    var mediator = new MediatorBuilder().register(new FailingNotificationHandler()).build();
    assertThrows(
        CompletionException.class, () -> mediator.publish(new TestNotification("event")).join());
  }
}
