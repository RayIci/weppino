package com.weppino.shared.result;

import com.weppino.shared.error.Error;

/**
 * Represents the outcome of an operation that can either succeed or fail.
 *
 * <p>Use {@link Result#success(Object)} for operations that return a value, {@link
 * Result#success()} for void operations, and {@link Result#failure(Error)} for failures. Always
 * check {@link #isSuccess()} before calling {@link #getValue()} or {@link #getError()}.
 *
 * @param <T> the type of the value in case of success; use {@link Void} for void operations
 */
public sealed interface Result<T> permits Result.Success, Result.Failure {

  /**
   * Returns true if the operation succeeded.
   *
   * @return true if success, false otherwise
   */
  boolean isSuccess();

  /**
   * Returns true if the operation failed.
   *
   * @return true if failure, false otherwise
   */
  boolean isFailure();

  /**
   * Returns the value of a successful result.
   *
   * @return the success value
   * @throws UnsupportedOperationException if called on a failure — check {@link #isSuccess()} first
   */
  T getValue();

  /**
   * Returns the error of a failed result.
   *
   * @return the error
   * @throws UnsupportedOperationException if called on a success — check {@link #isFailure()} first
   */
  Error getError();

  /**
   * Creates a successful result carrying a value.
   *
   * @param <T> the type of the value
   * @param value the success value
   * @return a successful {@link Result}
   */
  static <T> Result<T> success(T value) {
    return new Success<>(value);
  }

  /**
   * Creates a successful result with no value, for void operations.
   *
   * @return a successful {@link Result} of type {@link Void}
   */
  static Result<Void> success() {
    return new Success<>(null);
  }

  /**
   * Creates a failed result carrying an error.
   *
   * @param <T> the expected value type had the operation succeeded
   * @param error the error describing the failure
   * @return a failed {@link Result}
   */
  static <T> Result<T> failure(Error error) {
    return new Failure<>(error);
  }

  /**
   * Represents a successful outcome, optionally carrying a value.
   *
   * @param <T> the type of the success value
   */
  record Success<T>(T value) implements Result<T> {

    @Override
    public boolean isSuccess() {
      return true;
    }

    @Override
    public boolean isFailure() {
      return false;
    }

    @Override
    public T getValue() {
      return value;
    }

    @Override
    public Error getError() {
      throw new UnsupportedOperationException("Success does not contain an error");
    }
  }

  /**
   * Represents a failed outcome carrying an {@link Error}.
   *
   * @param <T> the expected value type had the operation succeeded
   */
  record Failure<T>(Error error) implements Result<T> {

    @Override
    public boolean isSuccess() {
      return false;
    }

    @Override
    public boolean isFailure() {
      return true;
    }

    @Override
    public T getValue() {
      throw new UnsupportedOperationException("Failure does not contain a value");
    }

    @Override
    public Error getError() {
      return error;
    }
  }
}
