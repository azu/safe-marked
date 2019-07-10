# safe-marked [![Build Status](https://travis-ci.org/azu/safe-marked.svg?branch=master)](https://travis-ci.org/azu/safe-marked)

Convert Markdown to HTML using [marked](https://marked.js.org) and [DOMPurify](https://github.com/cure53/DOMPurify).

## Features

- Convert Markdown to HTML using [marked](https://marked.js.org)
- Safe by default
    - The output is sanitized by [DOMPurify](https://github.com/cure53/DOMPurify)
- Type Safe by default
    - This library is written by TypeScript
- Work on Browser and Node.js

## Motivation

[marked](https://marked.js.org) does not sanitized by default.
Also, [marked](https://marked.js.org) will remove `sanitize` option in the future.

We want to get safe converter from Markdown to HTML.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install safe-marked

## Usage

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown();
const html = markdown(`# Header

This is [CommonMark](https://commonmark.org/) text.
`);
console.log(html); 
/* <h1 id="header">Header</h1>
   <p>This is <a href="https://commonmark.org/">CommonMark</a> text.</p>
*/
```

The output is sanitized by default.

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown();
const html = markdown(`<script>alert(1)</script>
<iframe src="https://example.com"></iframe>

This is [XSS](javascript:alert(1))`);
// sanitized by default
assert.strictEqual(html, `

<p>This is <a>XSS</a></p>
`);
```

### Options

You can pass options for these library.

- `marked`: See [marked](https://marked.js.org/#/USING_ADVANCED.md)'s options
- `dompurify`: See [DOMPurify](https://github.com/cure53/DOMPurify)'s options

An example for options:

```js
import { createMarkdown } from "safe-marked";
const markdown = createMarkdown({
    marked: {
        headerIds: false
    },
    dompurify: {
        // do not allow any tags
        ADD_TAGS: ["iframe"]
    }
});
const html = markdown(`# Header

<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
assert.strictEqual(html, `<h1>Header</h1>
<iframe src="https://example.com"></iframe>
This is [CommonMark](https://commonmark.org/) text.
`);
```

## Changelog

See [Releases page](https://github.com/azu/safe-marked/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/safe-marked/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT © azu
