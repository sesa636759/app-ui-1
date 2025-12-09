import { Component, h } from '@stencil/core';

@Component({
  tag: 'dialog-content',
  styleUrl: 'dialog-content.css',
  shadow: true,
})
export class DialogContent {
  render() {
    return (
      <div class="dialog-content">
        <slot></slot>
      </div>
    );
  }
}