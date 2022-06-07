import { type Config } from "./config";
import { RequestError } from "./error";

export interface RequestConfig extends RequestInit {
  /**
   * Fetch implementation for making requests
   * @default globalThis.fetch
   */
  fetch?: typeof globalThis.fetch;
  method?: Method | Uppercase<Method>;
  data?: unknown;
}

export type RequestDispatch = (
  input: RequestInfo,
  config?: Partial<Config>
) => Promise<Response>;

export type DataRequestDispatch = (
  input: RequestInfo,
  data?: unknown,
  config?: Partial<Config>
) => Promise<Response>;

export const SAFE_METHODS = ["delete", "get", "head", "options"] as const;

export const DATA_METHODS = ["patch", "post", "put"] as const;

type SafeMethod = typeof SAFE_METHODS[number];
type DataMethod = typeof DATA_METHODS[number];

export type Method = SafeMethod | DataMethod;

export type MethodDispatchMap = {
  [K in SafeMethod]: RequestDispatch;
} & {
  [K in DataMethod]: DataRequestDispatch;
};

/**
 * Create the core request function.
 *
 * Used as basis for other methods
 */
export function createRequestDispatch(baseConfig: Config): RequestDispatch {
  return async (input: RequestInfo, requestConfig: Partial<Config> = {}) => {
    const { fetch, ...config } = { ...baseConfig, ...requestConfig };

    const response = await fetch(input, config);

    if (!response.ok) {
      throw new RequestError(response.statusText, response);
    }

    return response;
  };
}

export function createRequestMethod(
  request: RequestDispatch,
  method: SafeMethod
): RequestDispatch {
  return (input, config) => request(input, { ...config, method });
}

export function createDataRequestMethod(
  request: RequestDispatch,
  method: DataMethod
): DataRequestDispatch {
  return (input, data, config) => request(input, { ...config, method, data });
}

export function mapRequestMethods(request: RequestDispatch): MethodDispatchMap {
  const entries = [
    ...SAFE_METHODS.map((method) => [
      method,
      createRequestMethod(request, method),
    ]),
    ...DATA_METHODS.map((method) => [
      method,
      createDataRequestMethod(request, method),
    ]),
  ];

  return Object.fromEntries(entries) as MethodDispatchMap;
}
