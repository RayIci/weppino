package com.weppino.shared.cqrs;

/**
 * Marker interface for commands in the CQRS pattern.
 *
 * <p>A command represents a write operation — an intent to change the state of the system. Each
 * command is handled by exactly one {@link RequestHandler} and produces a response of type {@code
 * ResponseT}.
 *
 * <p>By convention, commands should be named in the imperative form, e.g. {@code
 * CreateUserCommand}, {@code DeleteOrderCommand}.
 *
 * @param <ResponseT> the type of the response this command produces when handled; use {@link Void}
 *     for commands that produce no meaningful return value
 */
public interface Command<ResponseT> extends Request<ResponseT> {}
