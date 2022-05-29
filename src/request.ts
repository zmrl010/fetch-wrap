import { RequestError } from "./error";
import { type RequestMethod } from "./request-method";

export type DispatchRequest = (
  input: RequestInfo,
  options?: RequestOptions
) => Promise<Response>;

export interface RequestOptions extends RequestInit {
  /**
   * Fetch implementation for making requests
   * @default globalThis.fetch
   */
  fetch: typeof globalThis.fetch;
  /**
   * Lowercase request method
   */
  method?: RequestMethod;
}

/**
 * Create the core request function.
 *
 * Used as the basis for other,
 * more specific request methods
 */
export function createRequest({
  fetch: defaultFetch,
  ...defaultInit
}: RequestOptions): DispatchRequest {
  return async (
    input: RequestInfo,
    options: RequestOptions = { fetch: defaultFetch }
  ) => {
    const { fetch, ...init } = options;

    const request = new Request(input, { ...defaultInit, ...init });

    const response = await fetch(request);

    if (!response.ok) {
      throw new RequestError(response.statusText, request, response);
    }

    return response;
  };
}
