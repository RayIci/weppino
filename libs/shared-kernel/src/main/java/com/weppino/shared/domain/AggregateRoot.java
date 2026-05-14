package com.weppino.shared.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * Base class for aggregate roots — the consistency boundary in DDD. All mutations to the aggregate
 * and its children go through this class, which also collects {@link DomainEvent}s to be published
 * after persistence.
 *
 * @param <IdT> the type of the aggregate root's identifier
 */
public abstract class AggregateRoot<IdT> extends Entity<IdT> {

  private final List<DomainEvent> domainEvents = new ArrayList<>();

  /**
   * Constructs a new AggregateRoot with the given identifier.
   *
   * @param id the unique identifier for this aggregate root
   */
  public AggregateRoot(IdT id) {
    super(id);
  }

  /**
   * Records a domain event to be published after this aggregate is persisted. Call this inside
   * business methods when a significant state change occurs.
   *
   * @param event the event to register
   */
  protected void registerEvent(DomainEvent event) {
    Objects.requireNonNull(event, "event must not be null");
    domainEvents.add(event);
  }

  /**
   * Returns all pending domain events as an unmodifiable list. The application layer reads this
   * after saving the aggregate and publishes the events.
   *
   * @return unmodifiable list of pending events
   */
  public List<DomainEvent> getDomainEvents() {
    return Collections.unmodifiableList(domainEvents);
  }

  /** Clears pending events — call this after they have been successfully published. */
  public void clearDomainEvents() {
    domainEvents.clear();
  }
}
