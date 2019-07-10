export type createCoreProcessorOptions = {
    markdownToHTML: (markdown: string) => string;
    sanitizer: (html: string) => string;
}
/**
 * Create Core processor
 * @param options
 */
export const createCoreProcessor = ({ markdownToHTML, sanitizer }: createCoreProcessorOptions) => {
    return (markdown: string) => {
        return sanitizer(markdownToHTML(markdown));
    };
};
