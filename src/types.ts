export type DataMethod = "patch" | "post" | "put";
export type Method = "delete" | "get" | "head" | "options" | DataMethod;

export type UpperOrLowerMethod = Uppercase<Method> | Lowercase<Method>;

export interface Config<D = unknown> {
  method?: UpperOrLowerMethod;
  data?: D;
  init?: RequestInit;
  input: RequestInfo;
}

export type ResponseType = "arraybuffer" | "blob" | "json" | "text" | "stream";
