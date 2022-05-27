import {
  createRequest,
  type DispatchRequest,
  type RequestOptions,
} from "./request";
import { isRequestMethod, type RequestMethod } from "./request-method";

export type MethodActions = {
  [K in RequestMethod]: DispatchRequest;
};

export type RequestClient = DispatchRequest & MethodActions;

export function createClient({
  fetch = globalThis.fetch,
  ...init
}: RequestOptions): RequestClient {
  const request = createRequest({ fetch, ...init });

  const cache = new Map<RequestMethod, DispatchRequest>();

  return new Proxy(request, {
    apply(_target, _thisArg, args: Parameters<DispatchRequest>) {
      return request(...args);
    },

    get(_target, method) {
      if (!isRequestMethod(method)) {
        return;
      }

      if (!cache.has(method)) {
        cache.set(method, createRequest({ fetch, method }));
      }
      return cache.get(method);
    },
  }) as RequestClient;
}
