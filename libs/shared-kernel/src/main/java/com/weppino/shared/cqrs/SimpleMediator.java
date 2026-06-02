package com.weppino.shared.cqrs;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

/**
 * Package-private implementation of {@link Mediator}. Create via {@link MediatorBuilder}.
 *
 * <p>Internally maintains two immutable dispatch maps built at construction time — one mapping each
 * request type to its single handler, and one mapping each notification type to its list of
 * handlers. All lookups are O(1). The instance is immutable and thread-safe after construction.
 */
final class SimpleMediator implements Mediator {

  private final Map<Class<?>, RequestHandler<?, ?>> requestHandlers;
  private final Map<Class<?>, List<NotificationHandler<?>>> notificationHandlers;

  /**
   * Constructs a new SimpleMediator with the given handler maps.
   *
   * @param requestHandlers map of request type → handler, as built by {@link MediatorBuilder}
   * @param notificationHandlers map of notification type → handler list, as built by {@link
   *     MediatorBuilder}
   */
  SimpleMediator(
      Map<Class<?>, RequestHandler<?, ?>> requestHandlers,
      Map<Class<?>, List<NotificationHandler<?>>> notificationHandlers) {
    this.requestHandlers = Map.copyOf(requestHandlers);
    this.notificationHandlers =
        notificationHandlers.entrySet().stream()
            .collect(
                Collectors.toUnmodifiableMap(Map.Entry::getKey, e -> List.copyOf(e.getValue())));
  }

  @Override
  @SuppressWarnings("unchecked")
  public <ResponseT> CompletableFuture<ResponseT> send(Request<ResponseT> request) {

    // cast is safe: MediatorBuilder keyed this handler under exactly request.getClass(),
    // which is the same type as RequestT — the type system cannot express this at runtime
    // due to erasure, so the unchecked cast is the only option
    var handler =
        (RequestHandler<Request<ResponseT>, ResponseT>) requestHandlers.get(request.getClass());

    if (handler == null) {
      throw new IllegalStateException(
          "No handler registered for request type: " + request.getClass().getName());
    }

    return handler.handle(request);
  }

  @Override
  @SuppressWarnings("unchecked")
  public CompletableFuture<Void> publish(Notification notification) {

    List<NotificationHandler<?>> handlers =
        notificationHandlers.getOrDefault(notification.getClass(), List.of());

    // cast is safe for the same reason as send(): each handler was registered under
    // exactly the notification type it declared, so the wildcard is always the right type
    CompletableFuture<?>[] futures =
        handlers.stream()
            .map(h -> ((NotificationHandler<Notification>) h).handle(notification))
            .toArray(CompletableFuture[]::new);

    // allOf completes when every handler's future completes — if no handlers are registered
    // it completes immediately with an already-done empty future
    return CompletableFuture.allOf(futures);
  }
}
