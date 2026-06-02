package com.weppino.shared.cqrs;

import java.util.concurrent.CompletableFuture;

/**
 * Handles a specific type of {@link Request} and produces a response asynchronously.
 *
 * <p>Each request type must have exactly one handler registered in the {@link Mediator}. Handlers
 * are the application's use-case entry points — they receive a request, execute the corresponding
 * business logic, and return a response wrapped in a {@link java.util.concurrent.CompletableFuture
 * CompletableFuture}.
 *
 * <p>Implementations are typically registered with a {@link MediatorBuilder} and discovered
 * automatically by the DI container (Spring, Quarkus, etc.).
 *
 * @param <RequestT> the type of request this handler processes
 * @param <ResponseT> the type of the response produced by this handler
 */
public interface RequestHandler<RequestT extends Request<ResponseT>, ResponseT> {

  /**
   * Handles the given request and returns the response asynchronously.
   *
   * <p>Implementations that perform purely synchronous work can wrap the result with {@link
   * java.util.concurrent.CompletableFuture#completedFuture(Object)
   * CompletableFuture.completedFuture()}. Implementations that perform I/O should return a future
   * that completes when the I/O is done.
   *
   * @param request the request to handle; never {@code null}
   * @return a {@link java.util.concurrent.CompletableFuture CompletableFuture} that completes with
   *     the response when the operation finishes, or completes exceptionally if the operation fails
   */
  CompletableFuture<ResponseT> handle(RequestT request);
}
