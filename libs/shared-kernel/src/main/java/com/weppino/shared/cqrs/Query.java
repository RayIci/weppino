package com.weppino.shared.cqrs;

/**
 * Marker interface for queries in the CQRS pattern.
 *
 * <p>A query represents a read operation — it retrieves data without changing the state of the
 * system. Each query is handled by exactly one {@link RequestHandler} and produces a response of
 * type {@code ResponseT}.
 *
 * <p>By convention, queries should be named descriptively, e.g. {@code GetUserByIdQuery}, {@code
 * ListActiveOrdersQuery}.
 *
 * @param <ResponseT> the type of the data this query returns when handled
 */
public interface Query<ResponseT> extends Request<ResponseT> {}
