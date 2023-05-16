# `@substreams/core`

> Substreams ESM core utility library

This is a work in progress. Your mileage may vary.

## Install

```sh
npm install @substreams/core
```

**⚠️Warning:** This package is native [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). If your project uses CommonJS, you'll have to [convert to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) or use the [dynamic `import()`](https://v8.dev/features/dynamic-import) function. Please don't open issues for questions regarding CommonJS / ESM.

## Usage

```js
import { createSubstream } from "@substreams/core";

export async function fetchSubstream(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const array = await blob.arrayBuffer();

  return createSubstream(array);
}
```

## Authors
- [@fubhy](https://github.com/fubhy) (fubhy.eth, [Twitter](https://twitter.com/thefubhy))
- [@DenisCarriere](https://github.com/DenisCarriere) ([Twitter](https://twitter.com/DenisCarriere))

## License
[MIT](/LICENSE) License
