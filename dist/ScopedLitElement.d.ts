import { LitElement } from "lit-element";
export declare type Dictionary<T> = {
    [key: string]: T;
};
export declare class ScopedLitElement extends LitElement {
    shadowRoot: ShadowRoot & {
        customElements: CustomElementRegistry;
    };
    static get scopedElements(): Dictionary<typeof HTMLElement>;
    createRenderRoot(): ShadowRoot;
    connectedCallback(): void;
}
