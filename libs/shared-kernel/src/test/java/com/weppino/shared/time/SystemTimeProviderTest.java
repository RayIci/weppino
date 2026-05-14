package com.weppino.shared.time;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.Test;

class SystemTimeProviderTest {

  @Test
  void nowReturnsTimeFromClock() {
    Instant fixed = Instant.parse("2026-01-01T00:00:00Z");
    SystemTimeProvider provider = new SystemTimeProvider(Clock.fixed(fixed, ZoneOffset.UTC));
    assertEquals(fixed, provider.now());
  }

  @Test
  void nowReflectsInjectedClock() {
    Instant first = Instant.parse("2026-01-01T00:00:00Z");
    Instant second = Instant.parse("2026-06-01T12:00:00Z");
    assertNotEquals(
        new SystemTimeProvider(Clock.fixed(first, ZoneOffset.UTC)).now(),
        new SystemTimeProvider(Clock.fixed(second, ZoneOffset.UTC)).now());
  }
}
