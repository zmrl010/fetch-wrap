import { RequestError } from "./error";
import type { Config, DataMethod, Method } from "./types";

type FetchParams = Parameters<typeof globalThis.fetch>;

/**
 * Prepare a config object into parameters that are passed to fetch
 */
export function configToFetchParams({
  input,
  init,
  method,
}: Config): FetchParams {
  return [
    input,
    {
      ...init,
      method,
    },
  ];
}

/**
 * Fetchy factory function
 */
export function createFetchy(fetch = globalThis.fetch) {
  /**
   * Dispatch a fetch request
   */
  async function request<D = unknown>(config: Config<D>) {
    const params = configToFetchParams(config);
    const response = await fetch(...params);

    if (!response.ok) {
      throw new RequestError(response.statusText, response);
    }

    return response;
  }

  function createMethod(method: Method) {
    return <D = unknown>(input: RequestInfo, config?: Config<D>) =>
      request({ ...config, input, method });
  }

  function createDataMethod(method: DataMethod) {
    return <D = unknown>(input: RequestInfo, data?: D, config?: Config<D>) =>
      request({ ...config, method, input, data });
  }

  return {
    request,
    create: createFetchy,

    get: createMethod("get"),
    head: createMethod("head"),
    options: createMethod("options"),
    delete: createMethod("delete"),

    post: createDataMethod("post"),
    put: createDataMethod("put"),
    patch: createDataMethod("patch"),
  };
}
