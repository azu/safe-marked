import marked from "marked";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import { createMarkdownOptions } from "./Options";

/**
 * Create Markdown processor
 * @param options
 */
export const createMarkdown = (options: createMarkdownOptions = {}) => {
    const window = (new JSDOM("")).window;
    const DOMPurify = createDOMPurify(window);
    return (markdown: string) => {
        const html = marked(markdown, options.marked);
        return DOMPurify.sanitize(html, options.dompurify ? options.dompurify : {});
    };
};
