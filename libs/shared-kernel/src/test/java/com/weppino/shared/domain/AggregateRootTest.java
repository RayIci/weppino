package com.weppino.shared.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;
import org.junit.jupiter.api.Test;

class AggregateRootTest {

  private static class TestAggregate extends AggregateRoot<UUID> {
    TestAggregate(UUID id) {
      super(id);
    }

    void raise(DomainEvent event) {
      registerEvent(event);
    }
  }

  private static class TestEvent extends DomainEvent {}

  @Test
  void registerEventAddsEvent() {
    TestAggregate aggregate = new TestAggregate(UUID.randomUUID());
    TestEvent event = new TestEvent();
    aggregate.raise(event);
    assertEquals(1, aggregate.getDomainEvents().size());
    assertTrue(aggregate.getDomainEvents().contains(event));
  }

  @Test
  void registerMultipleEventsPreservesOrder() {
    TestAggregate aggregate = new TestAggregate(UUID.randomUUID());
    TestEvent first = new TestEvent();
    TestEvent second = new TestEvent();
    aggregate.raise(first);
    aggregate.raise(second);
    assertEquals(2, aggregate.getDomainEvents().size());
    assertEquals(first, aggregate.getDomainEvents().get(0));
    assertEquals(second, aggregate.getDomainEvents().get(1));
  }

  @Test
  void registerNullEventThrows() {
    TestAggregate aggregate = new TestAggregate(UUID.randomUUID());
    assertThrows(IllegalArgumentException.class, () -> aggregate.raise(null));
  }

  @Test
  void getDomainEventsIsUnmodifiable() {
    TestAggregate aggregate = new TestAggregate(UUID.randomUUID());
    aggregate.raise(new TestEvent());
    assertThrows(UnsupportedOperationException.class, () -> aggregate.getDomainEvents().clear());
  }

  @Test
  void clearDomainEventsRemovesAll() {
    TestAggregate aggregate = new TestAggregate(UUID.randomUUID());
    aggregate.raise(new TestEvent());
    aggregate.clearDomainEvents();
    assertTrue(aggregate.getDomainEvents().isEmpty());
  }
}
