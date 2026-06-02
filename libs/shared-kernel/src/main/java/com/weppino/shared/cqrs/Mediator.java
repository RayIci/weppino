package com.weppino.shared.cqrs;

import java.util.concurrent.CompletableFuture;

/**
 * Central dispatcher for the CQRS pattern.
 *
 * <p>The mediator decouples senders from handlers — callers dispatch a {@link Request} or publish a
 * {@link Notification} without knowing which handler processes it. The mediator resolves the
 * correct handler at runtime and returns the result asynchronously.
 *
 * <p>Use {@link MediatorBuilder} to create an instance and register handlers.
 *
 * <p>Implementations are expected to be thread-safe after construction.
 */
public interface Mediator {

  /**
   * Dispatches a request to its registered handler and returns the response asynchronously.
   *
   * <p>Exactly one handler must be registered for the request type. If no handler is found an
   * {@link IllegalStateException} is thrown.
   *
   * @param <ResponseT> the type of the response produced by the handler
   * @param request the request to dispatch; must not be {@code null}
   * @return a {@link CompletableFuture} that completes with the handler's response, or completes
   *     exceptionally if the handler throws
   * @throws IllegalStateException if no handler is registered for the given request type
   */
  <ResponseT> CompletableFuture<ResponseT> send(Request<ResponseT> request);

  /**
   * Publishes a notification to all registered handlers asynchronously.
   *
   * <p>All handlers registered for the notification type are invoked concurrently. If no handlers
   * are registered this method completes immediately without error.
   *
   * @param notification the notification to publish; must not be {@code null}
   * @return a {@link CompletableFuture} that completes when all handlers have finished, or
   *     completes exceptionally if any handler throws
   */
  CompletableFuture<Void> publish(Notification notification);
}
