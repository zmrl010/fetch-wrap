type InterceptorHandler<V = unknown> = {
  fulfilled?: (value: V) => unknown | Promise<unknown>;
  rejected?: (error: unknown) => unknown;
};

export class InterceptorManager<V> {
  private key: number;
  private handlers: Map<number, InterceptorHandler<V>>;

  constructor() {
    this.key = 1;
    this.handlers = new Map();

    this.clear = this.handlers.clear.bind(this.handlers);
    this.delete = this.handlers.delete.bind(this.handlers);
    this.forEach = this.handlers.forEach.bind(this.handlers);
  }

  /**
   * Clear all handlers
   */
  clear: typeof this.handlers.clear;
  /**
   * Remove a handler with the key returned from use()
   */
  delete: typeof this.handlers.delete;
  /**
   * Iterate over handlers, invoking a callback for each one
   */
  forEach: typeof this.handlers.forEach;

  /**
   * Register interceptor handler
   * @returns key that handler was set to
   */
  use(handler: InterceptorHandler<V>) {
    const currentKey = this.key++;

    this.handlers.set(currentKey, handler);

    return currentKey;
  }
}
