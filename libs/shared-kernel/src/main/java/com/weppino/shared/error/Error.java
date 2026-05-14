package com.weppino.shared.error;

import java.util.Objects;

/**
 * Represents a structured domain or application error — not an exception, but a first-class value
 * describing what went wrong, why, and how to categorize it.
 */
public final class Error {

  private final String description;
  private final String code;
  private final ErrorType type;

  /**
   * Creates a new instance of {@link Error}.
   *
   * @param description human-readable explanation of the error
   * @param code machine-readable identifier, used for programmatic handling
   * @param type categorizes the error for downstream consumers
   */
  public Error(String description, String code, ErrorType type) {
    Objects.requireNonNull(description, "description must not be null");
    Objects.requireNonNull(code, "code must not be null");
    Objects.requireNonNull(type, "type must not be null");

    this.description = description;
    this.code = code;
    this.type = type;
  }

  public String getDescription() {
    return description;
  }

  public String getCode() {
    return code;
  }

  public ErrorType getType() {
    return type;
  }

  /**
   * Factory method for creating a validation error.
   *
   * @return a {@link ErrorType#VALIDATION} error
   */
  public static Error validationError(String description, String code) {
    return new Error(description, code, ErrorType.VALIDATION);
  }

  /**
   * Factory method for creating a not found error.
   *
   * @return a {@link ErrorType#NOT_FOUND} error
   */
  public static Error notFoundError(String description, String code) {
    return new Error(description, code, ErrorType.NOT_FOUND);
  }

  /**
   * Factory method for creating an unauthorized error.
   *
   * @return an {@link ErrorType#UNAUTHORIZED} error
   */
  public static Error unauthorizedError(String description, String code) {
    return new Error(description, code, ErrorType.UNAUTHORIZED);
  }

  /**
   * Factory method for creating a conflict error.
   *
   * @return a {@link ErrorType#CONFLICT} error
   */
  public static Error conflictError(String description, String code) {
    return new Error(description, code, ErrorType.CONFLICT);
  }

  /**
   * Factory method for creating an internal error.
   *
   * @return an {@link ErrorType#INTERNAL} error
   */
  public static Error internalError(String description, String code) {
    return new Error(description, code, ErrorType.INTERNAL);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }

    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    Error error = (Error) o;
    return description.equals(error.description) && code.equals(error.code) && type == error.type;
  }

  @Override
  public int hashCode() {
    int result = description.hashCode();
    result = 31 * result + code.hashCode();
    result = 31 * result + type.hashCode();
    return result;
  }

  @Override
  public String toString() {
    return "Error{description='" + description + "', code='" + code + "', type=" + type + '}';
  }
}
