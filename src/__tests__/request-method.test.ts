import { isRequestMethod, REQUEST_METHODS } from "../request-method";

describe("isRequestMethod()", () => {
  it.each([[0], [{}], ["/"], [[]]])("%s should return false", (value) => {
    expect(isRequestMethod(value)).toBe(false);
  });

  it.each(REQUEST_METHODS)("%s should return true", (value) => {
    expect(isRequestMethod(value)).toBe(true);
  });
});
