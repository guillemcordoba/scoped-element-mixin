import { LitElement } from "lit-element";
export class ScopedLitElement extends LitElement {
    static get scopedElements() {
        return {};
    }
    createRenderRoot() {
        return this.attachShadow({
            mode: "open",
            customElements: new CustomElementRegistry(),
        });
    }
    connectedCallback() {
        super.connectedCallback();
        const elements = this.constructor
            .scopedElements;
        for (const tag of Object.keys(elements)) {
            this.shadowRoot.customElements.define(tag, elements[tag]);
        }
    }
}
//# sourceMappingURL=ScopedLitElement.js.map