package com.weppino.shared.domain;

/**
 * Base class for all entities in the domain model.
 *
 * @param <IdT> the type of the entity's identifier
 */
public abstract class Entity<IdT> {

  private final IdT id;

  /**
   * Constructs a new entity with the given identifier.
   *
   * @param id the unique identifier for the entity
   */
  public Entity(IdT id) {

    if (id == null) {
      throw new IllegalArgumentException("Id cannot be null");
    }

    this.id = id;
  }

  public IdT getId() {
    return id;
  }

  @Override
  public boolean equals(Object obj) {

    if (obj == null || getClass() != obj.getClass()) {
      return false;
    }

    Entity<?> other = (Entity<?>) obj;
    return id.equals(other.id);
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }

  @Override
  public String toString() {
    return getClass().getSimpleName() + "[id=" + id + "]";
  }
}
