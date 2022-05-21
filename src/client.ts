interface ClientOptions {
  fetch: typeof globalThis.fetch;
  defaultInit: RequestInit;
}

type RequestMethod = "GET" | "PUT" | "POST" | "DELETE";

export function createClient({
  fetch = globalThis.fetch,
  defaultInit = {},
}: ClientOptions) {
  const createRequestMethod =
    (method: RequestMethod) =>
    async (input: RequestInfo, init: Omit<RequestInit, "method">) => {
      const result = await fetch(input, { ...defaultInit, ...init, method });

      if (!result.ok) {
        throw new Error("Network error occurred");
      }

      return result.json();
    };

  return {
    get: createRequestMethod("GET"),
    put: createRequestMethod("PUT"),
    post: createRequestMethod("POST"),
    delete: createRequestMethod("DELETE"),
  };
}
