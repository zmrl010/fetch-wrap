<h1 align="center">
  🦆 fetchy 🦆
</h1>
<p align="center">
  Tiny wrapper around fetch for error handling and convenience.
</p>

## Install

```shell
# npm
npm i @zmrl/fetchy

# or yarn
yarn add @zmrl/fetchy
```

## Get Started

This library relies on the
[fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
for functionality. If `globalThis.fetch` is available in your environment,
then that will be used automatically.

```ts
import fetchy from "@zmrl/fetchy";

fetchy.request("https://example.com");
fetchy.get("https://example.com");
fetchy.post("https://example.com", data);
```

---

This library is WIP. I usually end up writing something similar for projects
that use fetch. With fetch now built into Node core, I thought it would be a
good opportunity to write a tiny isomorphic wrapper for it.
