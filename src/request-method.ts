export const DATA_REQUEST_METHODS = ["patch", "post", "put"] as const;

export const REQUEST_METHODS = ["delete", "get", "head", "options"] as const;

export type RequestMethod = typeof REQUEST_METHODS[number] | DataRequestMethod;

export type DataRequestMethod = typeof DATA_REQUEST_METHODS[number];
