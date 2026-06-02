package com.weppino.shared.cqrs;

import java.util.concurrent.CompletableFuture;

/**
 * Handles a specific type of {@link Notification} asynchronously.
 *
 * <p>Multiple handlers can be registered for the same notification type. All registered handlers
 * are invoked when the notification is published via {@link Mediator#publish(Notification)}.
 * Handlers are independent — the failure of one does not prevent the others from being invoked.
 *
 * @param <NotificationT> the type of notification this handler processes
 */
@FunctionalInterface
public interface NotificationHandler<NotificationT extends Notification> {

  /**
   * Handles the given notification asynchronously.
   *
   * <p>Implementations that perform purely synchronous work can return {@link
   * java.util.concurrent.CompletableFuture#completedFuture(Object)
   * CompletableFuture.completedFuture(null)}.
   *
   * @param notification the notification to handle; never {@code null}
   * @return a {@link java.util.concurrent.CompletableFuture CompletableFuture} that completes when
   *     the handling is done, or completes exceptionally if the handling fails
   */
  CompletableFuture<Void> handle(NotificationT notification);
}
