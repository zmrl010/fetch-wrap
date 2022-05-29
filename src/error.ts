/**
 * Error thrown when a network error occurs during a request.
 */
export class RequestError extends Error {
  readonly response?: Response;

  constructor(message?: string, response?: Response) {
    super(message);

    this.response = response;
  }
}
