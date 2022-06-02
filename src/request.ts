import { mergeConfig, type Config } from "./config";
import { RequestError } from "./error";

export type RequestDispatch = (
  input: RequestInfo,
  config?: Partial<Config>
) => Promise<Response>;

export type DataRequestDispatch = (
  input: RequestInfo,
  data?: unknown,
  config?: Config
) => Promise<Response>;

export const METHODS = [
  "delete",
  "get",
  "head",
  "options",
  "patch",
  "post",
  "put",
] as const;

export const DATA_REQUEST_METHODS = ["patch", "post", "put"] as const;

export type Method = typeof METHODS[number];

/**
 * Create the core request function.
 *
 * Used as the basis for other,
 * more specific request methods
 */
export function createRequestDispatch(defaultConfig: Config): RequestDispatch {
  return async (input: RequestInfo, config: Partial<Config> = {}) => {
    const { fetch, ...finalConfig } = mergeConfig(defaultConfig, config);

    const response = await fetch(input, finalConfig);

    if (!response.ok) {
      throw new RequestError(response.statusText, response);
    }

    return response;
  };
}

export function createDataRequestDispatch(
  defaultOptions: Config
): DataRequestDispatch {
  const dispatchRequest = createRequestDispatch(defaultOptions);

  return (input, data, options) =>
    dispatchRequest(input, { ...options, body: JSON.stringify(data) });
}
