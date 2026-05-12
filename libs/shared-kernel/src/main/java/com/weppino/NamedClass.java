package com.weppino;

/** A Named class. */
public class NamedClass {

  private String name;

  /**
   * Create an instance of shared class with a name.
   *
   * @param name The name of the shared class
   */
  public NamedClass(String name) {
    this.name = name;
  }

  /**
   * Get the hello name for the shared class.
   *
   * @return The string saying hello!
   */
  public String name() {
    return String.format("Hello, my name is %s", this.name);
  }
}
