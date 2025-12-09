import { Component, Prop, h, Method } from '@stencil/core';

@Component({
  tag: 'my-step',
  styleUrl: 'my-step.css',
  shadow: true,
})
export class MyStep {
  @Prop() stepTitle: string = '';
  @Prop() icon: string = '';
  @Prop() subtitle: string = '';
  @Prop() badge: string = '';
  @Prop() tooltip: string = '';
  @Prop() disabled: boolean = false;
  @Prop() status: string = '';
  @Prop() index: number = 0;
  @Prop() validate?: () => boolean | Promise<boolean>;
  @Method()
  async renderContent() {
    return <slot />;
  }
  render() {
    return <slot />;
  }
}
