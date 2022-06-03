import { type Method } from "./request";

export interface Config extends RequestInit {
  /**
   * Fetch implementation for making requests
   * @default globalThis.fetch
   */
  fetch: typeof globalThis.fetch;
  method?: Method | Uppercase<Method>;
}
