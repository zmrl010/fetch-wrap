import { type Config } from "./config";
import {
  createRequestDispatch,
  type RequestDispatch,
  type Method,
} from "./request";

export type MethodActions = {
  [K in Method]: RequestDispatch;
};

export type RequestClient = RequestDispatch & MethodActions;

const defaultConfig: Config = {
  fetch: globalThis.fetch,
};

export function createClient(baseConfig: Config): RequestClient {
  const config = { ...defaultConfig, ...baseConfig };

  const request = createRequestDispatch(config);

  const { fetch } = config;

  return Object.assign<RequestDispatch, MethodActions>(request, {
    get: createRequestDispatch({ fetch, method: "get" }),
    head: createRequestDispatch({ fetch, method: "head" }),
    options: createRequestDispatch({ fetch, method: "options" }),
    delete: createRequestDispatch({ fetch, method: "delete" }),
    patch: createRequestDispatch({ fetch, method: "patch" }),
    put: createRequestDispatch({ fetch, method: "put" }),
    post: createRequestDispatch({ fetch, method: "post" }),
  });
}
