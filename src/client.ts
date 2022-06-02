import { mergeConfig, type Config } from "./config";
import {
  createRequestDispatch,
  type RequestDispatch,
  type Method,
} from "./request";

export type MethodActions = {
  [K in Method]: RequestDispatch;
};

export type RequestClient = RequestDispatch & MethodActions;

export function createClient(config: Config): RequestClient {
  const combinedConfig = mergeConfig({ fetch: globalThis.fetch }, config);
  const request = createRequestDispatch(combinedConfig);

  const { fetch } = combinedConfig;

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
