import "scoped-registries";

export type Dictionary<T> = { [key: string]: T };

declare global {
  interface HTMLElement {
    connectedCallback?(): void;
  }
}

export type ScopedElementType = typeof HTMLElement & {
  scopedElements: Dictionary<typeof HTMLElement>;
};

export const Scoped = (baseClass: typeof HTMLElement) =>
  class extends baseClass {
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
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      const elements = (this.constructor as ScopedElementType).scopedElements;

      for (const tag of Object.keys(elements)) {
        this.shadowRoot.customElements.define(tag, elements[tag]);
      }
    }
  };
