package com.weppino.shared.domain;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Base class for aggregate roots in the domain model. An aggregate root is an entity that serves as
 * the entry point for a cluster of related entities and value objects. It is responsible for
 * maintaining the integrity of the aggregate and enforcing business rules.
 *
 * @param <IdT> the type of the aggregate root's identifier
 */
public abstract class AggregateRoot<IdT> extends Entity<IdT> {

  private final List<DomainEvent> domainEvents = new ArrayList<>();

  /**
   * Constructs a new aggregate root with the given identifier.
   *
   * @param id the unique identifier for the aggregate root
   */
  public AggregateRoot(IdT id) {
    super(id);
  }

  /**
   * Registers a domain event to be dispatched later. This method is typically called by the
   * aggregate root when a significant change occurs that should be communicated to other parts of
   * the system.
   *
   * @param event the domain event to register
   */
  protected void registerEvent(DomainEvent event) {

    if (event == null) {
      throw new IllegalArgumentException("Domain event cannot be null");
    }

    domainEvents.add(event);
  }

  /**
   * Retrieves the list of domain events that have been registered on this aggregate root.
   *
   * @return a list of domain events
   */
  public List<DomainEvent> getDomainEvents() {
    return Collections.unmodifiableList(domainEvents);
  }

  /**
   * Clears all domain events from the aggregate root. This is typically called after the events
   * have been dispatched.
   */
  public void clearDomainEvents() {
    domainEvents.clear();
  }
}
