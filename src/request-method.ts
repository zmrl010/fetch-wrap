export const REQUEST_METHODS = [
  "delete",
  "get",
  "head",
  "options",
  "patch",
  "post",
  "put",
] as const;

export type RequestMethod = typeof REQUEST_METHODS[number];

export function isRequestMethod(val: unknown): val is RequestMethod {
  if (typeof val !== "string") {
    return false;
  }
  return REQUEST_METHODS.includes(val as RequestMethod);
}
