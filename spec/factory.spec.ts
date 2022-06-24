import { RequestError } from "../src/error";
import { configToFetchParams, createFetchy } from "../src/factory";

const url = "https://www.example.com";

const mockFetch = jest.fn();

beforeEach(() => {
  mockFetch.mockClear();
});

describe("createFetchy()", () => {
  describe("request methods", () => {
    it.each([
      "get",
      "delete",
      "head",
      "options",
      "patch",
      "post",
      "put",
    ] as const)("should call fetch with %s method", async (method) => {
      mockFetch.mockResolvedValue({
        ok: true,
      });

      const fetchy = createFetchy(mockFetch);

      await fetchy[method](url);

      expect(mockFetch).toHaveBeenCalledWith(url, { method });
    });

    it("should throw RequestError when response.ok is false", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
      });
      const fetchy = createFetchy(mockFetch);

      await expect(fetchy.get(url)).rejects.toBeInstanceOf(RequestError);
    });
  });
});

describe("configToFetchParams()", () => {
  it("should return input as first param", () => {
    const [param1] = configToFetchParams({ input: url });

    expect(param1).toBe(url);
  });

  it("should include method in second param object", () => {
    const [, param2] = configToFetchParams({ input: url, method: "get" });

    expect(param2?.method).toBe("get");
  });
});
