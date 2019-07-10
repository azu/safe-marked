import { createMarkdown } from "../src";
import assert = require("assert");

describe("safe-marked", function() {
    it("should convert Markdown to HTML", () => {
        const markdown = createMarkdown();
        const html = markdown(`# Header

This is [CommonMark](https://commonmark.org/) text.
`);
        assert.strictEqual(html, `<h1 id="header">Header</h1>
<p>This is <a href="https://commonmark.org/">CommonMark</a> text.</p>
`);
    });
    it("should sanitize by default", () => {
        const markdown = createMarkdown();
        const html = markdown(`<script>alert(1)</script>
<iframe src="https://example.com"></iframe>

This is [XSS](javascript:alert)`);
        assert.strictEqual(html, `

<p>This is <a>XSS</a></p>
`);
    });
    it("should accept marked option", () => {
        const markdown = createMarkdown({
            marked: {
                headerIds: false
            }
        });
        const html = markdown(`# Header

This is [CommonMark](https://commonmark.org/) text.
`);
        assert.strictEqual(html, `<h1>Header</h1>
<p>This is <a href="https://commonmark.org/">CommonMark</a> text.</p>
`);
    });
    it("should accept DOMPurify option", () => {
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
    });
});
