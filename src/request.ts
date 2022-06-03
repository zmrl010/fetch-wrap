import { type Config } from "./config";
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
export function createRequestDispatch(baseConfig: Config): RequestDispatch {
  return async (input: RequestInfo, requestConfig: Partial<Config> = {}) => {
    const { fetch, ...config } = {
      ...baseConfig,
      ...requestConfig,
    };

    const response = await fetch(input, config);

    if (!response.ok) {
      throw new RequestError(response.statusText, response);
    }

    return response;
  };
}

export function createDataRequestDispatch(
  baseConfig: Config
): DataRequestDispatch {
  const dispatchRequest = createRequestDispatch(baseConfig);

  return (input, data, config) =>
    dispatchRequest(input, { ...config, body: JSON.stringify(data) });
}
