package com.weppino.shared.error;

import java.util.Objects;

/**
 * The Error class represents a structured error response that can be used to convey information
 * about errors that occur within an application.
 */
public final class Error {

  private final String description;
  private final String code;
  private final ErrorType type;

  /**
   * Constructs a new Error instance with the specified description, code, and type.
   *
   * @param description A human-readable description of the error.
   * @param code A unique code representing the error, useful for programmatic handling.
   * @param type The type of error, categorized by the ErrorType enum, indicating the nature of the
   *     error.
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

  @Override
  public String toString() {
    return "Error{"
        + "description='"
        + description
        + '\''
        + ", code='"
        + code
        + '\''
        + ", type="
        + type
        + '}';
  }

  /**
   * Factory method to create a ValidationError instance with the given description and code.
   *
   * @param description A human-readable description of the validation error.
   * @param code A unique code representing the validation error, useful for programmatic handling.
   * @return An Error instance categorized as a VALIDATION error with the provided description and
   *     code.
   */
  public static Error validationError(String description, String code) {
    return new Error(description, code, ErrorType.VALIDATION);
  }

  /**
   * Factory method to create a NotFoundError instance with the given description and code.
   *
   * @param description A human-readable description of the not found error.
   * @param code A unique code representing the not found error, useful for programmatic handling.
   * @return An Error instance categorized as a NOT_FOUND error with the provided description and
   *     code.
   */
  public static Error notFoundError(String description, String code) {
    return new Error(description, code, ErrorType.NOT_FOUND);
  }

  /**
   * Factory method to create an UnauthorizedError instance with the given description and code.
   *
   * @param description A human-readable description of the unauthorized error.
   * @param code A unique code representing the unauthorized error, useful for programmatic
   *     handling.
   * @return An Error instance categorized as an UNAUTHORIZED error with the provided description
   *     and code.
   */
  public static Error unauthorizedError(String description, String code) {
    return new Error(description, code, ErrorType.UNAUTHORIZED);
  }

  /**
   * Factory method to create a ConflictError instance with the given description and code.
   *
   * @param description A human-readable description of the conflict error.
   * @param code A unique code representing the conflict error, useful for programmatic handling.
   * @return An Error instance categorized as a CONFLICT error with the provided description and
   *     code.
   */
  public static Error conflictError(String description, String code) {
    return new Error(description, code, ErrorType.CONFLICT);
  }

  /**
   * Factory method to create an InternalError instance with the given description and code.
   *
   * @param description A human-readable description of the internal error.
   * @param code A unique code representing the internal error, useful for programmatic handling.
   * @return An Error instance categorized as an INTERNAL error with the provided description and
   *     code.
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
}
