package com.weppino.shared.cqrs;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Fluent builder for creating a {@link Mediator} instance.
 *
 * <p>Register all {@link RequestHandler request handlers} and {@link NotificationHandler
 * notification handlers}, then call {@link #build()} to obtain an immutable {@link Mediator}.
 *
 * <p>The request and notification types are extracted automatically from each handler's generic
 * signature by walking up the class hierarchy — no manual type declaration is required. This
 * approach is compatible with framework proxies (Spring CGLIB, Quarkus CDI).
 *
 * <p>Typical usage with Spring:
 *
 * <pre>{@code
 * @Bean
 * Mediator mediator(List<RequestHandler<?, ?>> requestHandlers,
 *                   List<NotificationHandler<?>> notificationHandlers) {
 *     return new MediatorBuilder()
 *         .registerAll(requestHandlers)
 *         .registerAllNotifications(notificationHandlers)
 *         .build();
 * }
 * }</pre>
 */
public final class MediatorBuilder {

  private final Map<Class<?>, RequestHandler<?, ?>> requestHandlers = new HashMap<>();
  private final Map<Class<?>, List<NotificationHandler<?>>> notificationHandlers = new HashMap<>();

  /**
   * Registers a handler for a specific request type.
   *
   * <p>The request type is extracted automatically from the handler's generic signature. Only one
   * handler per request type is allowed.
   *
   * @param handler the handler to register; must not be {@code null}
   * @return this builder, for chaining
   * @throws IllegalStateException if a handler is already registered for the same request type
   */
  public MediatorBuilder register(RequestHandler<?, ?> handler) {
    Class<?> requestType = extractRequestType(handler);
    if (requestHandlers.containsKey(requestType)) {
      throw new IllegalStateException(
          "A handler is already registered for request type: " + requestType.getName());
    }
    requestHandlers.put(requestType, handler);
    return this;
  }

  /**
   * Registers a handler for a specific notification type.
   *
   * <p>The notification type is extracted automatically from the handler's generic signature.
   * Multiple handlers can be registered for the same notification type.
   *
   * @param handler the handler to register; must not be {@code null}
   * @return this builder, for chaining
   */
  public MediatorBuilder register(NotificationHandler<?> handler) {
    Class<?> notificationType = extractNotificationType(handler);
    notificationHandlers.computeIfAbsent(notificationType, k -> new ArrayList<>()).add(handler);
    return this;
  }

  /**
   * Registers all request handlers in the collection.
   *
   * <p>Convenience method for bulk registration. Equivalent to calling {@link
   * #register(RequestHandler)} for each element.
   *
   * @param handlers the handlers to register; must not be {@code null}
   * @return this builder, for chaining
   * @throws IllegalStateException if any two handlers in the collection handle the same request
   *     type
   */
  public MediatorBuilder registerAll(Collection<? extends RequestHandler<?, ?>> handlers) {
    handlers.forEach(this::register);
    return this;
  }

  /**
   * Registers all notification handlers in the collection.
   *
   * <p>Convenience method for bulk registration. Equivalent to calling {@link
   * #register(NotificationHandler)} for each element.
   *
   * @param handlers the handlers to register; must not be {@code null}
   * @return this builder, for chaining
   */
  public MediatorBuilder registerAllNotifications(
      Collection<? extends NotificationHandler<?>> handlers) {
    handlers.forEach(this::register);
    return this;
  }

  /**
   * Builds and returns an immutable {@link Mediator} with the registered handlers.
   *
   * <p>The builder can be discarded after this call. The returned {@link Mediator} is thread-safe.
   *
   * @return a new {@link Mediator} instance
   */
  public Mediator build() {
    return new SimpleMediator(requestHandlers, notificationHandlers);
  }

  /**
   * Returns the {@code RequestT} type argument declared on the handler's {@link RequestHandler}.
   */
  private static Class<?> extractRequestType(RequestHandler<?, ?> handler) {
    return extractFirstTypeArg(handler.getClass(), RequestHandler.class);
  }

  /**
   * Returns the {@code NotificationT} type argument declared on the handler's {@link
   * NotificationHandler}.
   */
  private static Class<?> extractNotificationType(NotificationHandler<?> handler) {
    return extractFirstTypeArg(handler.getClass(), NotificationHandler.class);
  }

  /**
   * Walks the class hierarchy from {@code clazz} upward until it finds a class that directly
   * implements {@code targetInterface} with a concrete (non-variable) first type argument, then
   * returns that argument.
   *
   * <p>Walking is necessary because framework proxies (CGLIB, CDI) subclass the real handler, so
   * {@code getClass()} does not directly expose the generic interface declaration.
   *
   * @param clazz the starting class, typically obtained via {@code handler.getClass()}
   * @param targetInterface the raw interface to look for, e.g. {@code RequestHandler.class}
   * @return the concrete {@link Class} bound to the first type argument
   * @throws IllegalArgumentException if the hierarchy is exhausted without finding a concrete
   *     binding (e.g. unresolved type variables in an abstract generic base class)
   */
  private static Class<?> extractFirstTypeArg(Class<?> clazz, Class<?> targetInterface) {
    Class<?> current = clazz;
    while (current != null) {
      for (Type iface : current.getGenericInterfaces()) {
        // ParameterizedType means the interface carries type arguments at this level,
        // e.g. RequestHandler<CreateUserCommand, UUID> — skip raw declarations
        if (iface instanceof ParameterizedType pt && pt.getRawType() == targetInterface) {
          Type arg = pt.getActualTypeArguments()[0];
          // TypeVariable means an unresolved generic parameter, e.g. <C> from an abstract
          // base class like AbstractHandler<C, R> — we cannot resolve it here, so skip
          // and keep climbing until we find the concrete binding
          if (arg instanceof Class<?> cls) {
            return cls;
          }
        }
      }
      // climb past the current class — necessary when a framework proxy (CGLIB, CDI)
      // subclasses the real handler, so getClass() does not expose the generic declaration
      current = current.getSuperclass();
    }
    throw new IllegalArgumentException(
        "Cannot determine the handled type for "
            + clazz.getName()
            + " implementing "
            + targetInterface.getSimpleName()
            + ". Abstract base classes with unresolved type variables are not supported.");
  }
}
