import { RequestError } from "./error";
import { isRequestMethod, type RequestMethod } from "./request-method";

export interface RequestOptions {
  /**
   * fetch implementation to make requests with
   * @default globalThis.fetch
   */
  fetch: typeof globalThis.fetch;
  /**
   * init options to be passed to each request
   */
  init?: RequestInit;
}

export type FetchRequest = ReturnType<typeof createRequest>;

export type MethodActions = {
  [K in RequestMethod]: FetchRequest;
};

export type RequestClient = FetchRequest & MethodActions;

/**
 * Create the core request function.
 *
 * Used as the basis for other,
 * more specific request methods
 */
function createRequest({
  fetch: defaultFetch,
  init: defaultInit,
}: RequestOptions) {
  return async (input: RequestInfo, options: Partial<RequestOptions> = {}) => {
    const { fetch = defaultFetch, init } = options;

    const response = await fetch(input, { ...defaultInit, ...init });

    if (!response.ok) {
      throw new RequestError(response);
    }

    return response;
  };
}

function createRequestMethod(request: FetchRequest, method: RequestMethod) {
  return (input: RequestInfo, options: Partial<RequestOptions> = {}) =>
    request(input, { ...options, init: { ...options.init, method } });
}

export function createClient({
  fetch = globalThis.fetch,
  init = {},
}: RequestOptions): RequestClient {
  const request = createRequest({ fetch, init });

  const cache = new Map<RequestMethod, FetchRequest>();

  return new Proxy(request, {
    apply(_target, _thisArg, args: Parameters<FetchRequest>) {
      return request(...args);
    },

    get(_target, method) {
      if (!isRequestMethod(method)) {
        return;
      }

      if (!cache.has(method)) {
        cache.set(method, createRequestMethod(request, method));
      }
      return cache.get(method);
    },
  }) as RequestClient;
}
