import { RequestError } from "./error";
import { isRequestMethod, type RequestMethod } from "./request-method";

export interface ClientOptions {
  fetch: typeof globalThis.fetch;
  init?: RequestInit;
}

export type FetchRequest = ReturnType<typeof createRequest>;

export type MethodActions = {
  [K in RequestMethod]: FetchRequest;
};

export type RequestClient = ReturnType<typeof createClient>;

/**
 * Create the core request function.
 *
 * Used as the basis for other,
 * more specific request methods
 */
function createRequest({
  fetch: defaultFetch,
  init: defaultInit,
}: ClientOptions) {
  return async <R>(
    input: RequestInfo,
    options: Partial<ClientOptions> = {}
  ) => {
    const { fetch = defaultFetch, init } = options;
    const response = await fetch(input, { ...defaultInit, ...init });

    if (!response.ok) {
      throw new RequestError(response);
    }

    try {
      return (await response.json()) as R;
    } catch (err: unknown) {
      return undefined;
    }
  };
}

function createRequestMethod(request: FetchRequest, method: RequestMethod) {
  return <R>(input: RequestInfo, options: Partial<ClientOptions> = {}) =>
    request<R>(input, { ...options, init: { ...options.init, method } });
}

export function createClient({
  fetch = globalThis.fetch,
  init = {},
}: ClientOptions) {
  const request = createRequest({ fetch, init });

  const cache = new Map<RequestMethod, FetchRequest>();

  return new Proxy(request, {
    apply(_target, _thisArg, args: Parameters<FetchRequest>) {
      return request(...args);
    },
    get(_target, prop) {
      if (!isRequestMethod(prop)) {
        return;
      }

      if (!cache.has(prop)) {
        cache.set(prop, createRequestMethod(request, prop));
      }
      return cache.get(prop);
    },
  }) as FetchRequest & MethodActions;
}
