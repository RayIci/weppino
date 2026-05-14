package com.weppino.shared.time;

import java.time.Clock;
import java.time.Instant;

/** A TimeProvider implementation that uses the system clock to provide the current time. */
public class SystemTimeProvider implements TimeProvider {

  private final Clock clock;

  /**
   * Constructs a new SystemTimeProvider that uses the system clock to provide the current time.
   *
   * @param clock the clock to use for providing the current time.
   */
  public SystemTimeProvider(Clock clock) {
    this.clock = clock;
  }

  @Override
  public Instant now() {
    return Instant.now(this.clock);
  }
}
