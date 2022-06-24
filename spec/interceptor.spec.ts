import { InterceptorManager } from "../src/interceptor";

describe("InterceptorManager", () => {
  it("should be able to delete a handler with the key returned by use()", () => {
    const manager = new InterceptorManager();

    const key = manager.use({
      fulfilled: () => {},
    });

    expect(manager.delete(key)).toBe(true);
  });

  it("can iterate through each added handler with forEach()", () => {
    const args = [{}, {}, {}];

    const manager = new InterceptorManager();

    args.forEach((arg) => manager.use(arg));

    manager.forEach((handler) => {
      expect(args.includes(handler)).toBe(true);
    });
  });
});
