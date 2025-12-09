import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'ui-scroll-top',
  styleUrl: 'scroll-top.css',
  shadow: true,
})
export class ScrollTop {
  /**
   * Threshold (in pixels) before button appears
   */
  @Prop() threshold: number = 300;

  /**
   * Scroll behavior
   */
  @Prop() behavior: 'auto' | 'smooth' = 'smooth';

  /**
   * Position of the button
   */
  @Prop() position: 'bottom-right' | 'bottom-left' | 'bottom-center' = 'bottom-right';

  /**
   * Icon to display (can be emoji or text)
   */
  @Prop() icon: string = '↑';

  /**
   * Button size
   */
  @Prop() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Color scheme
   */
  @Prop() color: 'primary' | 'secondary' | 'dark' = 'primary';

  /**
   * Target element selector to scroll (default is window)
   */
  @Prop() target?: string;

  @State() isVisible: boolean = false;

  private targetElement: HTMLElement | Window;

  componentDidLoad() {
    this.targetElement = this.target 
      ? (document.querySelector(this.target) as HTMLElement)
      : window;

    if (this.targetElement) {
      this.targetElement.addEventListener('scroll', this.handleScroll);
      // Trigger initial check
      this.handleScroll();
    }
  }

  disconnectedCallback() {
    if (this.targetElement) {
      this.targetElement.removeEventListener('scroll', this.handleScroll);
    }
  }

  private handleScroll = () => {
    const scrollTop = this.targetElement instanceof Window
      ? window.pageYOffset || document.documentElement.scrollTop
      : (this.targetElement as HTMLElement).scrollTop;

    this.isVisible = scrollTop > this.threshold;
  };

  private scrollToTop = () => {
    if (this.targetElement instanceof Window) {
      window.scrollTo({
        top: 0,
        behavior: this.behavior,
      });
    } else {
      (this.targetElement as HTMLElement).scrollTo({
        top: 0,
        behavior: this.behavior,
      });
    }
  };

  render() {
    const classes = [
      'scroll-top',
      `scroll-top-${this.position}`,
      `scroll-top-${this.size}`,
      `scroll-top-${this.color}`,
      this.isVisible ? 'scroll-top-visible' : '',
      this.target ? 'scroll-top-container' : '',
    ].filter(Boolean).join(' ');

    return (
      <button
        class={classes}
        onClick={this.scrollToTop}
        aria-label="Scroll to top"
        type="button"
        style={{
          pointerEvents: this.isVisible ? 'auto' : 'none',
        }}
      >
        <span class="scroll-top-icon">{this.icon}</span>
      </button>
    );
  }
}
