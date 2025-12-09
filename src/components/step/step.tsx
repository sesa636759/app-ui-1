import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'ui-step',
  styleUrl: 'step.css',
  shadow: true,
})
export class Step {
  
  /** parent will set index */
  index: number = 0;

  @Prop() stepTitle: string = '';
  @Prop() subtitle: string | null = null;
  @Prop() icon: string | null = null; // could be an icon name or HTML string
  @Prop() badge: string | null = null;
  @Prop() tooltip: string | null = null;
  @Prop() status: 'upcoming' | 'active' | 'complete' | 'error' | 'disabled' | 'custom' = 'upcoming';
  @Prop() disabled: boolean = false;

  /** A developer can provide a validation function on the DOM element before proceeding */
  @Prop() validate?: () => boolean | Promise<boolean>;
  /** optional custom renderer - parent will call if present */
  @Prop() renderContent?: () => any;

  render() {
    // Provide a default slot; stepper uses my-step for metadata but shows content inside panels.
    return (
      <div class="my-step-slot" role="presentation">
        <slot />
      </div>
    );
  }
}
