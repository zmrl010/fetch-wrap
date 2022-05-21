import { RequestError } from "./error";

export type RequestMethod =
  | "GET"
  | "PUT"
  | "POST"
  | "DELETE"
  | "OPTIONS"
  | "PATCH";

export interface ClientOptions {
  fetch: typeof globalThis.fetch;
  defaultInit: RequestInit;
}

export function createClient({
  fetch = globalThis.fetch,
  defaultInit = {},
}: ClientOptions) {
  const createRequestMethod =
    (method: RequestMethod) =>
    async (input: RequestInfo, init: Omit<RequestInit, "method">) => {
      const response = await fetch(input, { ...defaultInit, ...init, method });

      if (!response.ok) {
        throw new RequestError(response);
      }

      return response.json();
    };

  return {
    get: createRequestMethod("GET"),
    put: createRequestMethod("PUT"),
    post: createRequestMethod("POST"),
    delete: createRequestMethod("DELETE"),
    options: createRequestMethod("OPTIONS"),
    patch: createRequestMethod("PATCH"),
  };
}
