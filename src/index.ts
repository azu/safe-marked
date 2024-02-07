// Node.js version
import { Marked } from "marked";
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
    const marked = new Marked();
    if (options.marked?.onInit) {
        options.marked.onInit(marked);
    }
    return createCoreProcessor({
        markdownToHTML: (markdown: string): string => {
            return marked.parse(markdown, {
                ...options.marked,
                async: false
            }) as string;
        },
        sanitizer: (html: string) => {
            return DOMPurify.sanitize(html, dompurifyOptions) as string;
        }
    });
};
