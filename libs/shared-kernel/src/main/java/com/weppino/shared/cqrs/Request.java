package com.weppino.shared.cqrs;

/**
 * Base marker interface for all requests in the CQRS pattern.
 *
 * <p>A request represents an intent — either a command that changes state or a query that reads it.
 * Every request is handled by exactly one {@link RequestHandler} and produces a response of type
 * {@code ResponseT}.
 *
 * <p>Do not implement this interface directly. Use {@link Command} for write operations or {@link
 * Query} for read operations.
 *
 * @param <ResponseT> the type of the response this request produces when handled
 */
public interface Request<ResponseT> {}
