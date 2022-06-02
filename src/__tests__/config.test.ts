import { type Config, mergeConfig } from "../config";

describe("mergeConfig()", () => {
  it("should return an object composed of properties from target and sources", () => {
    const config1: Config = {
      fetch: jest.fn(),
      referrer: "test",
      integrity: "none",
      method: "get",
    };

    const config2: Config = {
      fetch: jest.fn(),
      referrer: "test2",
      integrity: "some",
      cache: "default",
    };

    const result1 = mergeConfig(
      { fetch: config1.fetch },
      {
        referrer: config1.referrer,
        integrity: config1.integrity,
      },
      { method: config1.method }
    );

    const result2 = mergeConfig(
      { fetch: config2.fetch, integrity: config2.integrity },
      {
        referrer: config2.referrer,
      },
      { cache: config2.cache }
    );

    expect(result1).toEqual(config1);
    expect(result2).toEqual(config2);
  });
});
