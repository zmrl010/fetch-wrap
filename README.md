<h1 align="center">
  🌯 fetch-wrap 🌯
</h1>
<p align="center">
  Tiny wrapper around fetch for error handling and convenience.
</p>

## Install

```shell
# npm
npm i @zmrl/fetch-wrap

# or yarn
yarn add @zmrl/fetch-wrap
```

## Get Started

This library relies on the
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
for functionality. If `globalThis.fetch` is available in your environment,
then that will be used automatically.

```ts
import { createClient } from "@zmrl/fetch-wrap";

const request = createClient();
```

Otherwise, pass a compatible `fetch` implementation.

```ts
import { createClient } from "@zmrl/fetch-wrap";
import fetch from "node-fetch";

const request = createClient({ fetch });
```

```ts
request("https://example.com");
request.get("https://example.com");
request.post("https://example.com", data);
```

---

This library is WIP. I usually end up writing something similar for projects
that use fetch. With fetch now built into Node core, I thought it would be a
good opportunity to write a tiny isomorphic wrapper for it.
