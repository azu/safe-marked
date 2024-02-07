import { Marked, MarkedOptions } from "marked";
import type { Config } from "dompurify";

export type MarkedOnInit = (marked: Marked) => unknown;
export type createMarkdownOptions = {
    /**
     * Options for marked
     * @see https://marked.js.org/using_advanced#options
     * onInit is called with the marked instance once it's created
     * async option is not allowed
     */
    marked?: Omit<MarkedOptions, "async"> & {
        onInit?: MarkedOnInit;
    };
    /**
     * Options for dompurify
     */
    dompurify?: Config;
};
