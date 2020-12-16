import { Constructor } from "lit-element";

export type Dictionary<T> = { [key: string]: T };

export type ScopedElementConstructor = Constructor<HTMLElement> & {
  readonly scopedElements: Dictionary<typeof HTMLElement>;
};
