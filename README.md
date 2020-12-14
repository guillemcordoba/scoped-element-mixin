# ScopedLitElement

This is a very small class that imports the [`scoped-registries`](https://github.com/manolakis/scoped-registries/) polyfill and exposes an `scopedElements` function to override with the custom elements that should be registered inside the custom elements registry of the element.

## Usage

```ts
import { html } from 'lit-element';
import { ScopedLitElement } from 'scoped-lit-element';
import { MySubElement } from './my-sub-element';

export class MyElement extends ScopedLitElement {
  
  static get scopedElements() {
    return {
      'my-sub-element': MySubElement,
    };
  }
  render() {
    return html`<my-sub-element></my-sub-element>`;
  }
}
```

Bear in mind, this class needs and already includes the polyfill.