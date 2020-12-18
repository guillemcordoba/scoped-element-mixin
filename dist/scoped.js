import { ScopedElementsMixin } from "@open-wc/scoped-elements";
export const scopeElement = (base) => {
    if (base.getStyles)
        return scopeLitElement(base);
    else
        return scopeHTMLElement(base);
};
const scopeHTMLElement = (base) => class extends base {
    constructor(...args) {
        super(...args);
        const elements = this.constructor
            .scopedElements;
        if (elements) {
            this.attachShadow({
                mode: "open",
                customElements: new CustomElementRegistry(),
            });
        }
    }
    connectedCallback() {
        if (super.connectedCallback) {
            super.connectedCallback();
        }
        const elements = this.constructor
            .scopedElements;
        if (elements) {
            for (const tag of Object.keys(elements)) {
                this.shadowRoot.customElements.define(tag, scopeElement(elements[tag]));
            }
        }
    }
};
const scopeLitElement = (base) => class extends ScopedElementsMixin(base) {
    static get scopedElements() {
        if (base.scopedElements) {
            const elements = base
                .scopedElements;
            for (const key of Object.keys(elements)) {
                elements[key] = scopeElement(elements[key]);
            }
            return elements;
        }
        else
            return {};
    }
};
//# sourceMappingURL=scoped.js.map