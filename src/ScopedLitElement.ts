import { html, css, LitElement, property } from "lit-element";
import 'scoped-registries';

export type Dictionary<T> = { [key: string]: T };

export class ScopedLitElement extends LitElement {
  shadowRoot!: ShadowRoot & { customElements: CustomElementRegistry };

  static get scopedElements(): Dictionary<typeof HTMLElement> {
    return {};
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: "open",
      customElements: new CustomElementRegistry(),
    } as any);
  }

  connectedCallback() {
    super.connectedCallback();

    const elements = (this.constructor as typeof ScopedLitElement)
      .scopedElements;

    for (const tag of Object.keys(elements)) {
      this.shadowRoot.customElements.define(tag, elements[tag]);
    }
  }
}
