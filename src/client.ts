import {
  createRequestDispatch,
  type RequestDispatch,
  type RequestOptions,
} from "./request";
import { type RequestMethod } from "./request-method";

export type MethodActions = {
  [K in RequestMethod]: RequestDispatch;
};

export type RequestClient = RequestDispatch & MethodActions;

export function createClient({
  fetch = globalThis.fetch,
  ...init
}: RequestOptions): RequestClient {
  const request = createRequestDispatch({ fetch, ...init });

  return Object.assign(request, {
    get: createRequestDispatch({ fetch, method: "get" }),
    head: createRequestDispatch({ fetch, method: "head" }),
    options: createRequestDispatch({ fetch, method: "options" }),
    delete: createRequestDispatch({ fetch, method: "delete" }),
    patch: createRequestDispatch({ fetch, method: "patch" }),
    put: createRequestDispatch({ fetch, method: "put" }),
    post: createRequestDispatch({ fetch, method: "post" }),
  });
}
