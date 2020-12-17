import { ScopedElementConstructor } from "./types";
import "scoped-registries";
import { Constructor, LitElement } from "lit-element";

export const scopeElement = <T extends Constructor<HTMLElement>>(
  base: T
): T => {
  if (((base as unknown) as any).getStyles)
    return (scopeLitElement(
      (base as any) as Constructor<LitElement>
    ) as any) as T;
  else return scopeHTMLElement(base);
};

const scopeHTMLElement = <T extends Constructor<HTMLElement>>(base: T) =>
  class extends base {
    constructor(...args: any[]) {
      super(...args);

      const elements = (this.constructor as ScopedElementConstructor)
        .scopedElements;
      if (elements) {
        this.attachShadow({
          mode: "open",
          customElements: new CustomElementRegistry(),
        } as any);
      }
    }

    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      const elements = (this.constructor as ScopedElementConstructor)
        .scopedElements;

      for (const tag of Object.keys(elements)) {
        (((this.shadowRoot as any) as { customElements: CustomElementRegistry })
          .customElements as CustomElementRegistry).define(
          tag,
          scopeElement(elements[tag])
        );
      }
    }
  };

const scopeLitElement = <T extends Constructor<LitElement>>(base: T): T =>
  class extends base {
    protected createRenderRoot(): Element | ShadowRoot {
      const elements = (this.constructor as ScopedElementConstructor)
        .scopedElements;
      if (elements) {
        return this.attachShadow({
          mode: "open",
          customElements: new CustomElementRegistry(),
        } as any);
      } else return super.createRenderRoot();
    }

    connectedCallback() {
      super.connectedCallback();

      const elements = (this.constructor as ScopedElementConstructor)
        .scopedElements;

      for (const tag of Object.keys(elements)) {
        (((this.shadowRoot as any) as { customElements: CustomElementRegistry })
          .customElements as CustomElementRegistry).define(
          tag,
          scopeElement(elements[tag])
        );
      }
    }
  };
