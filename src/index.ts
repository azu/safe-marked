// Node.js version
import { marked } from "marked";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { createMarkdownOptions } from "./Options.js";
import { createCoreProcessor } from "./core.js";

/**
 * Create Markdown processor
 * @param options
 */
export const createMarkdown = (options: createMarkdownOptions = {}) => {
    const window = new JSDOM("").window;
    // DOMWindow vs. Window @types/DOMPurify is mismatch
    // @ts-ignore
    const DOMPurify = createDOMPurify(window);
    const dompurifyOptions = options.dompurify ? options.dompurify : {};
    return createCoreProcessor({
        markdownToHTML: (markdown: string) => {
            return marked(markdown, options.marked);
        },
        sanitizer: (html: string) => {
            return DOMPurify.sanitize(html, dompurifyOptions) as string;
        }
    });
};
