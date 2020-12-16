import { Constructor } from "lit-element";
import { Dictionary, ScopedElementConstructor } from "./types";

declare global {
  interface HTMLElement {
    connectedCallback?(): void;
  }
}

export const Scoped = <T extends Constructor<HTMLElement>>(
  baseClass: T
): T & ScopedElementConstructor =>
  class extends baseClass {
    static get scopedElements(): Dictionary<typeof HTMLElement> {
      return {};
    }
  };
