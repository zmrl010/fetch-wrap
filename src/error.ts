import type { Config } from "./factory";

/**
 * Error thrown when a network error occurs during a request.
 */
export class RequestError extends Error {
  readonly response?: Response;
  readonly config?: Config;

  constructor(message?: string, config?: Config, response?: Response) {
    super(message);

    this.config = config;
    this.response = response;
  }
}
