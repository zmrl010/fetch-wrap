/**
 * Error thrown when a network error occurs during a request.
 */
export class RequestError extends Error {
  readonly response: Response;

  constructor(response: Response) {
    super(response.statusText);

    this.response = response;
  }
}
