import { RequestError } from "./error";
import { type RequestMethod } from "./request-method";

export type RequestDispatch = (
  input: RequestInfo,
  options?: Partial<RequestOptions>
) => Promise<Response>;

export type DataRequestDispatch = (
  input: RequestInfo,
  data?: unknown,
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
export function createRequestDispatch({
  fetch: defaultFetch,
  ...defaultInit
}: RequestOptions): RequestDispatch {
  return async (input: RequestInfo, options: Partial<RequestOptions> = {}) => {
    const { fetch = defaultFetch, ...init } = options;
    const response = await fetch(input, { ...defaultInit, ...init });

    if (!response.ok) {
      throw new RequestError(response.statusText, response);
    }

    return response;
  };
}

export function createDataRequestDispatch(
  defaultOptions: RequestOptions
): DataRequestDispatch {
  const dispatchRequest = createRequestDispatch(defaultOptions);

  return async (input, data, options) =>
    dispatchRequest(input, { ...options, body: JSON.stringify(data) });
}
