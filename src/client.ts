import { type Config } from "./config";
import {
  createRequestDispatch,
  mapRequestMethods,
  MethodDispatchMap,
  type RequestDispatch,
} from "./request";

export type RequestClient = RequestDispatch & MethodDispatchMap;

const defaultConfig: Config = {
  fetch: globalThis.fetch,
};

export function createClient(baseConfig: Config): RequestClient {
  const config = { ...defaultConfig, ...baseConfig };

  const request = createRequestDispatch(config);

  return Object.assign(request, mapRequestMethods(request));
}
