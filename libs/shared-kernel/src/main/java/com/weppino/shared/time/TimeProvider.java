package com.weppino.shared.time;

import java.time.Instant;

/**
 * Interface for providing the current time. This abstraction allows for easier testing and
 * flexibility in how time is retrieved.
 */
public interface TimeProvider {

  /**
   * Returns the current time as an Instant. This method is used to retrieve the current time
   *
   * @return the current time as an Instant
   */
  Instant now();
}
