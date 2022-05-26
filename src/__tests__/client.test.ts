import { RequestClient, createClient } from "../client";
import { RequestError } from "../error";
import { REQUEST_METHODS } from "../request-method";

describe("client created by createClient()", () => {
  const mockFetch = jest.fn(
    async (..._args: Parameters<typeof globalThis.fetch>) => new Response()
  );

  let request: RequestClient;

  beforeEach(() => {
    mockFetch.mockClear();
    request = createClient({ fetch: mockFetch });
  });

  it("should be callable for a standard request", async () => {
    await request("test.com");
    expect(mockFetch).toHaveBeenCalledWith("test.com", {});
  });

  it.each(REQUEST_METHODS)(
    "should have shortcut method .%s()",
    async (method) => {
      expect(typeof request[method]).toBe("function");
      await request[method]("test.com");
      expect(mockFetch).toHaveBeenCalledWith("test.com", { method });
    }
  );

  it("should throw when response was not successful", async () => {
    mockFetch.mockImplementationOnce(
      async () => new Response("{}", { status: 400 })
    );
    request = createClient({ fetch: mockFetch });
    await expect(request("test.com")).rejects.toBeInstanceOf(RequestError);
  });
});
