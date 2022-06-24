import { InterceptorManager } from "../src/interceptor";

describe("InterceptorManager", () => {
  it("should be able to delete a handler with the key returned by use()", () => {
    const manager = new InterceptorManager();

    const key = manager.use({
      fulfilled: () => {},
    });

    const result = manager.delete(key);

    expect(result).toBe(true);
  });
});
