// Browser version
// It is referred by "browser" field
// https://github.com/defunctzombie/package-browser-field-spec
import marked from "marked";
import DOMPurify from "dompurify";
import { createMarkdownOptions } from "./Options";
import { createCoreProcessor } from "./core";

/**
 * Create Markdown processor
 * @param options
 */
export const createMarkdown = (options: createMarkdownOptions = {}) => {
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
