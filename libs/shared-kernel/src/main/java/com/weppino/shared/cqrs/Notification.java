package com.weppino.shared.cqrs;

/**
 * Marker interface for notifications in the CQRS pattern.
 *
 * <p>A notification represents an event that has already occurred. Unlike requests, notifications
 * are published to zero or more {@link NotificationHandler handlers} — there is no single owner and
 * no response is produced.
 *
 * <p>By convention, notifications should be named in the past tense, e.g. {@code
 * UserCreatedNotification}, {@code OrderShippedNotification}.
 */
public interface Notification {}
