import marked from "marked";
import DOMPurify from "dompurify";
import { createMarkdownOptions } from "./Options";

/**
 * Create Markdown processor
 * @param options
 */
export const createMarkdown = (options: createMarkdownOptions = {}) => {
    return (markdown: string) => {
        const html = marked(markdown, options.marked);
        return DOMPurify.sanitize(html, options.dompurify ? options.dompurify : {});
    };
};
