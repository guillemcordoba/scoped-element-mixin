import { Constructor } from "lit-element";
import "scoped-registries";
export declare type Dictionary<T> = {
    [key: string]: T;
};
declare global {
    interface HTMLElement {
        connectedCallback?(): void;
    }
}
export declare type ScopedElement = HTMLElement & {
    readonly scopedElements: Dictionary<typeof HTMLElement>;
    shadowRoot: ShadowRoot & {
        customElements: CustomElementRegistry;
    };
};
export declare const Scoped: (baseClass: Constructor<HTMLElement>) => Constructor<ScopedElement>;
