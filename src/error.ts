/**
 * Error thrown when a network error occurs during a request.
 */
export class RequestError extends Error {
  readonly request?: Request;
  readonly response?: Response;

  constructor(message?: string, request?: Request, response?: Response) {
    super(message);

    this.request = request;
    this.response = response;
  }
}
