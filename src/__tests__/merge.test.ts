import { merge } from "../merge";

describe("merge()", () => {
  it("should return an object composed of properties from target and sources", () => {
    const obj1 = {
      fetch: jest.fn(),
      referrer: "test",
      integrity: "none",
      method: "get",
    };

    const obj2 = {
      fetch: jest.fn(),
      referrer: "test2",
      integrity: "some",
      cache: "default",
    };

    const result1 = merge(
      { fetch: obj1.fetch },
      {
        referrer: obj1.referrer,
        integrity: obj1.integrity,
      },
      { method: obj1.method }
    );

    const result2 = merge(
      { fetch: obj2.fetch, integrity: obj2.integrity },
      {
        referrer: obj2.referrer,
      },
      { cache: obj2.cache }
    );

    expect(result1).toEqual(obj1);
    expect(result2).toEqual(obj2);
  });
});
