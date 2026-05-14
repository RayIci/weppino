package com.weppino.shared.domain;

/**
 * Marker interface for domain events — things that happened in the domain that other parts of the
 * system may care about.
 *
 * <p>Raise events inside an {@link AggregateRoot} via {@code registerEvent()}. The application
 * layer is responsible for publishing them after the aggregate is persisted.
 */
public interface DomainEvent {}
