import { Component, h } from '@stencil/core';

@Component({
  tag: 'dialog-footer',
  styleUrl: 'dialog-footer.css',
  shadow: true,
})
export class DialogFooter {
  render() {
    return (
      <div class="dialog-footer">
        <slot></slot>
      </div>
    );
  }
}