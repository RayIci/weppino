package com.weppino.shared.result;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.weppino.shared.error.Error;
import org.junit.jupiter.api.Test;

class ResultTest {

  private static final Error SAMPLE_ERROR = Error.notFoundError("not found", "NOT_FOUND");

  @Test
  void successWithValueIsSuccess() {
    assertTrue(Result.success("value").isSuccess());
  }

  @Test
  void successWithValueIsNotFailure() {
    assertFalse(Result.success("value").isFailure());
  }

  @Test
  void successWithValueReturnsValue() {
    assertEquals("value", Result.success("value").getValue());
  }

  @Test
  void successWithValueGetErrorThrows() {
    assertThrows(UnsupportedOperationException.class, () -> Result.success("value").getError());
  }

  @Test
  void voidSuccessIsSuccess() {
    assertTrue(Result.success().isSuccess());
  }

  @Test
  void voidSuccessGetValueReturnsNull() {
    assertNull(Result.success().getValue());
  }

  @Test
  void failureIsFailure() {
    assertTrue(Result.failure(SAMPLE_ERROR).isFailure());
  }

  @Test
  void failureIsNotSuccess() {
    assertFalse(Result.failure(SAMPLE_ERROR).isSuccess());
  }

  @Test
  void failureReturnsError() {
    assertEquals(SAMPLE_ERROR, Result.failure(SAMPLE_ERROR).getError());
  }

  @Test
  void failureGetValueThrows() {
    assertThrows(
        UnsupportedOperationException.class, () -> Result.failure(SAMPLE_ERROR).getValue());
  }
}
