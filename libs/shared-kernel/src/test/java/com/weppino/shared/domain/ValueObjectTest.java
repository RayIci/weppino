package com.weppino.shared.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.math.BigDecimal;
import java.util.List;
import org.junit.jupiter.api.Test;

class ValueObjectTest {

  private static class Money extends ValueObject {
    private final BigDecimal amount;
    private final String currency;

    Money(BigDecimal amount, String currency) {
      this.amount = amount;
      this.currency = currency;
    }

    @Override
    protected List<Object> getEqualityComponents() {
      return List.of(amount, currency);
    }
  }

  @Test
  void equalityWhenSameComponents() {
    assertEquals(
        new Money(new BigDecimal("10.00"), "EUR"), new Money(new BigDecimal("10.00"), "EUR"));
  }

  @Test
  void inequalityWhenDifferentAmount() {
    assertNotEquals(
        new Money(new BigDecimal("10.00"), "EUR"), new Money(new BigDecimal("20.00"), "EUR"));
  }

  @Test
  void inequalityWhenDifferentCurrency() {
    assertNotEquals(
        new Money(new BigDecimal("10.00"), "EUR"), new Money(new BigDecimal("10.00"), "USD"));
  }

  @Test
  void notEqualToNull() {
    assertNotEquals(null, new Money(new BigDecimal("10.00"), "EUR"));
  }

  @Test
  void notEqualToDifferentType() {
    assertNotEquals(new Money(new BigDecimal("10.00"), "EUR"), "10.00 EUR");
  }

  @Test
  void hashCodeConsistentWithEquals() {
    assertEquals(
        new Money(new BigDecimal("10.00"), "EUR").hashCode(),
        new Money(new BigDecimal("10.00"), "EUR").hashCode());
  }
}
