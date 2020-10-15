import {JsonDocsComponent, JSXBase} from "@stencil/core/internal";

export enum WebComponentProps {
  ATTR = "attr",
  SLOTS = "slots",
  CSS = "css",
}

// These key values are common through css, slots, and props docs generated by stencil.
export interface DocsBaseEntry {
  name: string;
  docs: string;
}

export type TableGenerator = (
  docs: JsonDocsComponent,
) => JSXBase.IntrinsicElements[];