package com.weppino.shared.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;
import org.junit.jupiter.api.Test;

class EntityTest {

  private static class TestEntity extends Entity<UUID> {
    TestEntity(UUID id) {
      super(id);
    }
  }

  private static class AnotherEntity extends Entity<UUID> {
    AnotherEntity(UUID id) {
      super(id);
    }
  }

  @Test
  void equalityWhenSameId() {
    UUID id = UUID.randomUUID();
    assertEquals(new TestEntity(id), new TestEntity(id));
  }

  @Test
  void inequalityWhenDifferentId() {
    assertNotEquals(new TestEntity(UUID.randomUUID()), new TestEntity(UUID.randomUUID()));
  }

  @Test
  void inequalityWhenDifferentType() {
    UUID id = UUID.randomUUID();
    assertNotEquals(new TestEntity(id), new AnotherEntity(id));
  }

  @Test
  void notEqualToNull() {
    assertNotEquals(null, new TestEntity(UUID.randomUUID()));
  }

  @Test
  void nullIdThrowsException() {
    assertThrows(IllegalArgumentException.class, () -> new TestEntity(null));
  }

  @Test
  void hashCodeConsistentWithEquals() {
    UUID id = UUID.randomUUID();
    assertEquals(new TestEntity(id).hashCode(), new TestEntity(id).hashCode());
  }

  @Test
  void getIdReturnsCorrectId() {
    UUID id = UUID.randomUUID();
    assertEquals(id, new TestEntity(id).getId());
  }

  @Test
  void toStringContainsClassNameAndId() {
    UUID id = UUID.randomUUID();
    String result = new TestEntity(id).toString();
    assertTrue(result.contains("TestEntity"));
    assertTrue(result.contains(id.toString()));
  }
}
