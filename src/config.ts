import { type Method } from "./request";

export interface Config extends RequestInit {
  /**
   * Fetch implementation for making requests
   * @default globalThis.fetch
   */
  fetch: typeof globalThis.fetch;
  method?: Method | Uppercase<Method>;
}

/**
 * Shallow merge two or more configuration objects
 */
export function mergeConfig(
  target: Config,
  ...sources: Partial<Config>[]
): Config {
  const nextTarget = { ...target };

  for (const source of sources) {
    Object.assign(nextTarget, source);
  }

  return nextTarget;
}
