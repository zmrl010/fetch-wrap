export const REQUEST_METHODS = ["delete", "get", "head", "options"] as const;

export const DATA_REQUEST_METHODS = ["patch", "post", "put"] as const;

export type RequestMethod = typeof REQUEST_METHODS[number] | DataRequestMethod;
// type RequestMethod = "delete" | "get" | "head" | "options" | "patch" | "post" | "put"
export type DataRequestMethod = typeof DATA_REQUEST_METHODS[number];
