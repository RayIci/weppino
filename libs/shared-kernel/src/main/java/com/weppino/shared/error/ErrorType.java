package com.weppino.shared.error;

/** Classifies the nature of an {@link Error}, enabling callers to respond appropriately. */
public enum ErrorType {

  /** Input failed business or format validation rules. */
  VALIDATION,

  /** The requested resource does not exist. */
  NOT_FOUND,

  /** The caller lacks permission to perform the operation. */
  UNAUTHORIZED,

  /** The operation conflicts with the current state of the resource. */
  CONFLICT,

  /** An unexpected server-side failure — not caused by the caller. */
  INTERNAL
}
