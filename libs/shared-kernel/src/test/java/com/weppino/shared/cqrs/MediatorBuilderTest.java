package com.weppino.shared.cqrs;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.junit.jupiter.api.Test;

class MediatorBuilderTest {

  // --- Fixtures ---

  private record TestCommand(String value) implements Command<String> {}

  private record AnotherCommand(int n) implements Command<Integer> {}

  private record TestNotification(String event) implements Notification {}

  private record AnotherNotification(int code) implements Notification {}

  private static class TestCommandHandler implements RequestHandler<TestCommand, String> {
    @Override
    public CompletableFuture<String> handle(TestCommand request) {
      return CompletableFuture.completedFuture(request.value());
    }
  }

  private static class AnotherCommandHandler implements RequestHandler<AnotherCommand, Integer> {
    @Override
    public CompletableFuture<Integer> handle(AnotherCommand request) {
      return CompletableFuture.completedFuture(request.n());
    }
  }

  private static class TestNotificationHandler implements NotificationHandler<TestNotification> {
    @Override
    public CompletableFuture<Void> handle(TestNotification notification) {
      return CompletableFuture.completedFuture(null);
    }
  }

  private static class AnotherNotificationHandler
      implements NotificationHandler<AnotherNotification> {
    @Override
    public CompletableFuture<Void> handle(AnotherNotification notification) {
      return CompletableFuture.completedFuture(null);
    }
  }

  // Subclass with no overrides — simulates a CGLIB proxy subclassing the real handler
  private static class ProxyCommandHandler extends TestCommandHandler {}

  // Non-generic abstract base — concrete type args declared on the abstract class itself
  private abstract static class AbstractConcreteHandler
      implements RequestHandler<TestCommand, String> {}

  private static class ConcreteNonGenericHandler extends AbstractConcreteHandler {
    @Override
    public CompletableFuture<String> handle(TestCommand request) {
      return CompletableFuture.completedFuture(request.value());
    }
  }

  // Generic abstract base — type variable C is unresolvable from the handler alone
  private abstract static class AbstractGenericHandler<C extends Command<R>, R>
      implements RequestHandler<C, R> {}

  private static class ConcreteGenericHandler extends AbstractGenericHandler<TestCommand, String> {
    @Override
    public CompletableFuture<String> handle(TestCommand request) {
      return CompletableFuture.completedFuture(request.value());
    }
  }

  // --- Registration: RequestHandler ---

  @Test
  void registerRequestHandlerSucceeds() {
    assertNotNull(new MediatorBuilder().register(new TestCommandHandler()).build());
  }

  @Test
  void registerDuplicateRequestHandlerThrows() {
    assertThrows(
        IllegalStateException.class,
        () ->
            new MediatorBuilder()
                .register(new TestCommandHandler())
                .register(new TestCommandHandler()));
  }

  @Test
  void registerAllRegistersEachHandler() {
    var mediator =
        new MediatorBuilder()
            .registerAll(List.of(new TestCommandHandler(), new AnotherCommandHandler()))
            .build();
    assertNotNull(mediator.send(new TestCommand("x")).join());
    assertNotNull(mediator.send(new AnotherCommand(1)).join());
  }

  @Test
  void registerAllThrowsOnDuplicateInCollection() {
    assertThrows(
        IllegalStateException.class,
        () ->
            new MediatorBuilder()
                .registerAll(List.of(new TestCommandHandler(), new TestCommandHandler())));
  }

  // --- Registration: NotificationHandler ---

  @Test
  void registerNotificationHandlerSucceeds() {
    assertNotNull(new MediatorBuilder().register(new TestNotificationHandler()).build());
  }

  @Test
  void registerMultipleNotificationHandlersForSameTypeSucceeds() {
    assertNotNull(
        new MediatorBuilder()
            .register(new TestNotificationHandler())
            .register(new TestNotificationHandler())
            .build());
  }

  @Test
  void registerAllNotificationsRegistersEachHandler() {
    var mediator =
        new MediatorBuilder()
            .registerAllNotifications(
                List.of(new TestNotificationHandler(), new AnotherNotificationHandler()))
            .build();
    assertDoesNotThrow(() -> mediator.publish(new TestNotification("e")).join());
    assertDoesNotThrow(() -> mediator.publish(new AnotherNotification(1)).join());
  }

  // --- Build ---

  @Test
  void buildReturnsMediatorInstance() {
    assertInstanceOf(Mediator.class, new MediatorBuilder().build());
  }

  @Test
  void buildWithNoHandlersSucceeds() {
    assertNotNull(new MediatorBuilder().build());
  }

  // --- Type extraction ---

  @Test
  void typeExtractionWorksForDirectImplementation() {
    var mediator = new MediatorBuilder().register(new TestCommandHandler()).build();
    assertEquals("hello", mediator.send(new TestCommand("hello")).join());
  }

  @Test
  void typeExtractionWorksForSubclass() {
    // ProxyCommandHandler extends TestCommandHandler without overriding anything —
    // the hierarchy walk must climb past it to find the generic interface declaration
    var mediator = new MediatorBuilder().register(new ProxyCommandHandler()).build();
    assertEquals("hello", mediator.send(new TestCommand("hello")).join());
  }

  @Test
  void typeExtractionWorksForNonGenericAbstractBaseClass() {
    // AbstractConcreteHandler declares concrete type args — walk must climb one level
    var mediator = new MediatorBuilder().register(new ConcreteNonGenericHandler()).build();
    assertEquals("hello", mediator.send(new TestCommand("hello")).join());
  }

  @Test
  void typeExtractionWorksForNotificationHandler() {
    var mediator = new MediatorBuilder().register(new TestNotificationHandler()).build();
    assertDoesNotThrow(() -> mediator.publish(new TestNotification("e")).join());
  }

  @Test
  void typeExtractionThrowsForAbstractGenericBaseClass() {
    // AbstractGenericHandler<C, R> declares type variables — C is a TypeVariable at
    // AbstractGenericHandler's level, so the hierarchy walk cannot resolve it
    assertThrows(
        IllegalArgumentException.class,
        () -> new MediatorBuilder().register(new ConcreteGenericHandler()));
  }
}
