import { createFetchy } from "../src/factory";

describe("createFetchy()", () => {
  const mockFetch = jest.fn();

  const url = "https://www.example.com";

  beforeEach(() => {
    mockFetch.mockClear();
  });

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
});

describe("configToFetchParams()", () => {
  it("should return a fetch-compatible tuple ", () => {
    // const params = configToFetchParams({})
  });
});
