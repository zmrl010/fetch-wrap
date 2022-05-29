import {
  createRequest,
  type DispatchRequest,
  type RequestOptions,
} from "./request";
import { type RequestMethod } from "./request-method";

export type MethodActions = {
  [K in RequestMethod]: DispatchRequest;
};

export type RequestClient = DispatchRequest & MethodActions;

export function createClient({
  fetch = globalThis.fetch,
  ...init
}: RequestOptions): RequestClient {
  const request = createRequest({ fetch, ...init });

  return Object.assign(request, {
    get: createRequest({ fetch, method: "get" }),
    head: createRequest({ fetch, method: "head" }),
    options: createRequest({ fetch, method: "options" }),
    delete: createRequest({ fetch, method: "delete" }),
    patch: createRequest({ fetch, method: "patch" }),
    put: createRequest({ fetch, method: "put" }),
    post: createRequest({ fetch, method: "post" }),
  });
}
