import { createRequestDispatch } from "../request";
import { RequestError } from "../error";

describe("createRequestDispatch()", () => {
  const mockFetch = jest.fn(async () => new Response());

  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("=> dispatchRequest()", () => {
    it("should call fetch passed through config", async () => {
      const request = createRequestDispatch({ fetch: mockFetch });

      await request("https://example.com");

      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should accept an input argument and pass it to fetch", async () => {
      const request = createRequestDispatch({ fetch: mockFetch });

      await request("https://example.com");

      expect(mockFetch.mock.lastCall).toContain("https://example.com");
    });

    it("should throw RequestError when status code is outside of 200-299 range", async () => {
      mockFetch.mockResolvedValueOnce(new Response("", { status: 400 }));
      const request = createRequestDispatch({ fetch: mockFetch });

      expect.assertions(1);
      try {
        await request("https://example.com");
      } catch (err: unknown) {
        expect(err).toBeInstanceOf(RequestError);
      }
    });

    it("should return response when status code is within 200-299 range", async () => {
      const originalResponse = new Response("", { status: 200 });
      mockFetch.mockResolvedValueOnce(originalResponse);
      const request = createRequestDispatch({ fetch: mockFetch });

      const response = await request("https://example.com");

      expect(response).toBe(originalResponse);
    });
  });
});

describe("createDataRequestDispatch()", () => {});
