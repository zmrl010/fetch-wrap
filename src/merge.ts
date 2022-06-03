/**
 * Shallow merge two or more objects
 */

export function merge<T extends object, S extends object>(
  target: T,
  ...sources: S[]
): T & S {
  const nextTarget = { ...target } as T & S;

  for (const source of sources) {
    Object.assign(nextTarget, source);
  }

  return nextTarget;
}
