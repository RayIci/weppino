package com.weppino.shared.error;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class ErrorTest {

  @Test
  void constructorSetsFields() {
    Error error = new Error("something went wrong", "ERR_001", ErrorType.VALIDATION);
    assertEquals("something went wrong", error.getDescription());
    assertEquals("ERR_001", error.getCode());
    assertEquals(ErrorType.VALIDATION, error.getType());
  }

  @Test
  void nullDescriptionThrows() {
    assertThrows(
        NullPointerException.class, () -> new Error(null, "ERR_001", ErrorType.VALIDATION));
  }

  @Test
  void nullCodeThrows() {
    assertThrows(NullPointerException.class, () -> new Error("desc", null, ErrorType.VALIDATION));
  }

  @Test
  void nullTypeThrows() {
    assertThrows(NullPointerException.class, () -> new Error("desc", "ERR_001", null));
  }

  @Test
  void equalityWhenSameFields() {
    Error a = new Error("desc", "ERR_001", ErrorType.NOT_FOUND);
    Error b = new Error("desc", "ERR_001", ErrorType.NOT_FOUND);
    assertEquals(a, b);
  }

  @Test
  void inequalityWhenDifferentCode() {
    Error a = new Error("desc", "ERR_001", ErrorType.NOT_FOUND);
    Error b = new Error("desc", "ERR_002", ErrorType.NOT_FOUND);
    assertNotEquals(a, b);
  }

  @Test
  void inequalityWhenDifferentType() {
    Error a = new Error("desc", "ERR_001", ErrorType.NOT_FOUND);
    Error b = new Error("desc", "ERR_001", ErrorType.VALIDATION);
    assertNotEquals(a, b);
  }

  @Test
  void hashCodeConsistentWithEquals() {
    Error a = new Error("desc", "ERR_001", ErrorType.CONFLICT);
    Error b = new Error("desc", "ERR_001", ErrorType.CONFLICT);
    assertEquals(a.hashCode(), b.hashCode());
  }

  @Test
  void validationErrorFactory() {
    Error error = Error.validationError("invalid input", "INVALID_INPUT");
    assertEquals(ErrorType.VALIDATION, error.getType());
    assertEquals("invalid input", error.getDescription());
    assertEquals("INVALID_INPUT", error.getCode());
  }

  @Test
  void notFoundErrorFactory() {
    Error error = Error.notFoundError("not found", "NOT_FOUND");
    assertEquals(ErrorType.NOT_FOUND, error.getType());
  }

  @Test
  void unauthorizedErrorFactory() {
    Error error = Error.unauthorizedError("unauthorized", "UNAUTHORIZED");
    assertEquals(ErrorType.UNAUTHORIZED, error.getType());
  }

  @Test
  void conflictErrorFactory() {
    Error error = Error.conflictError("conflict", "CONFLICT");
    assertEquals(ErrorType.CONFLICT, error.getType());
  }

  @Test
  void internalErrorFactory() {
    Error error = Error.internalError("internal error", "INTERNAL");
    assertEquals(ErrorType.INTERNAL, error.getType());
  }

  @Test
  void toStringContainsAllFields() {
    Error error = new Error("something went wrong", "ERR_001", ErrorType.VALIDATION);
    String result = error.toString();
    assertTrue(result.contains("something went wrong"));
    assertTrue(result.contains("ERR_001"));
    assertTrue(result.contains("VALIDATION"));
  }
}
