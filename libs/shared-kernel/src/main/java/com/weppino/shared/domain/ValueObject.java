package com.weppino.shared.domain;

import java.util.Collection;

/**
 * Base class for value objects in the domain model. A value object is an immutable type that
 * represents a concept or measurement in the domain. It is defined by its properties rather than by
 * identity, and it should not have any mutable state.
 */
public abstract class ValueObject {

  /**
   * Returns a collection of the components that define the value object. These components are used
   * to determine equality between value objects. Two value objects are considered equal if their
   * components are equal. The components should be ordered consistently to ensure that the equality
   * comparison is reliable.
   *
   * @return a collection of the components that define the value object
   */
  protected abstract Collection<Object> getEqualityComponents();

  @Override
  public boolean equals(Object obj) {

    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }

    ValueObject other = (ValueObject) obj;

    return getEqualityComponents().equals(other.getEqualityComponents());
  }

  @Override
  public int hashCode() {
    return getEqualityComponents().hashCode();
  }
}
