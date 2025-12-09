import { Component, Prop, h, State, Method, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { SnackbarItem, SnackbarType, SnackbarPosition, SnackbarStackMode, SnackbarOpenMode, SnackbarVariant, SnackbarSize } from './types';

@Component({
  tag: 'ui-snackbar',
  styleUrl: 'snackbar.css',
  shadow: true,
})
export class Snackbar {
  @Element() element: HTMLElement;
  /**
   * Position of the snackbar container
   */
  @Prop() position: SnackbarPosition = 'top-right';

  /**
   * Maximum number of visible snackbars
   */
  @Prop() maxVisible: number = 5;

  /**
   * Stack mode for snackbars (only applies when maxVisible > 1)
   * - 'stack': New snackbars appear on top, dismiss oldest first
   * - 'queue': New snackbars appear on bottom, dismiss oldest first
   * - 'lifo': New snackbars appear on top, dismiss newest first
   */
  @Prop() stackMode: SnackbarStackMode = 'stack';

  /**
   * Open animation mode for snackbars
   * - 'slide-down': Slide down from top (default)
   * - 'slide-up': Slide up from bottom
   * - 'slide-left': Slide in from left
   * - 'slide-right': Slide in from right
   * - 'fade': Fade in only
   * - 'scale': Scale in with fade
   * - 'bounce': Bounce in effect
   */
  @Prop() openMode: SnackbarOpenMode = 'slide-down';

  /**
   * Default variant for snackbars
   * - 'filled': Solid background (default)
   * - 'outlined': Border only with transparent background
   * - 'soft': Light background with colored text
   */
  @Prop() variant: SnackbarVariant = 'filled';

  /**
   * Default size for snackbars
   * - 'sm': Small (compact)
   * - 'md': Medium (default)
   * - 'lg': Large (spacious)
   */
  @Prop() size: SnackbarSize = 'md';

  /**
   * Event emitted when a snackbar is closed
   */
  @Event() snackbarClosed: EventEmitter<{ id: string; item: SnackbarItem }>;

  /**
   * Event emitted when a snackbar link is clicked
   */
  @Event() snackbarLinkClicked: EventEmitter<{ id: string; item: SnackbarItem; link: { text: string; url: string } }>;

  @State() snackbars: SnackbarItem[] = [];
  @State() visibleSnackbars: SnackbarItem[] = [];
  @State() animatedItems: Set<string> = new Set();

  private timeouts: { [key: string]: number } = {};
  private progressTimeouts: { [key: string]: number } = {};

  componentDidLoad() {
    this.updateVisibleSnackbars();
  }

  @Watch('position')
  positionChanged() {
    this.updateVisibleSnackbars();
  }

  @Watch('maxVisible')
  maxVisibleChanged() {
    this.updateVisibleSnackbars();
  }

  @Watch('stackMode')
  stackModeChanged() {
    this.updateVisibleSnackbars();
  }

  @Watch('openMode')
  openModeChanged() {
    this.updateVisibleSnackbars();
  }

  private updateVisibleSnackbars() {
    this.visibleSnackbars = this.snackbars.slice(0, this.maxVisible);
  }

  /**
   * Add a new snackbar
   */
  @Method()
  async add(item: Omit<SnackbarItem, 'id'>): Promise<string> {
    const id = this.generateId();
    const snackbarItem: SnackbarItem = {
      id,
      type: item.type,
      message: item.message,
      link: item.link,
      duration: item.duration || 5000,
      variant: item.variant || this.variant,
      size: item.size || this.size,
    };

    // Add to the array based on stack mode
    if (this.stackMode === 'stack' || this.stackMode === 'lifo') {
      // Add to beginning (top)
      this.snackbars = [snackbarItem, ...this.snackbars];
    } else {
      // Add to end (bottom) for queue mode
      this.snackbars = [...this.snackbars, snackbarItem];
    }

    // Remove oldest if exceeding maxVisible
    if (this.snackbars.length > this.maxVisible) {
      const toRemove = this.snackbars[this.snackbars.length - 1];
      this.close(toRemove.id);
    }

    this.updateVisibleSnackbars();

    // Set auto-close timer
    this.timeouts[id] = window.setTimeout(() => {
      this.close(id);
    }, snackbarItem.duration);

    // Start progress bar animation
    this.startProgressAnimation(id, snackbarItem.duration);

    return id;
  }

  /**
   * Close a specific snackbar
   */
  @Method()
  async close(id: string) {
    const index = this.snackbars.findIndex(item => item.id === id);
    if (index === -1) return;

    // Clear timeouts
    if (this.timeouts[id]) {
      clearTimeout(this.timeouts[id]);
      delete this.timeouts[id];
    }

    if (this.progressTimeouts[id]) {
      clearTimeout(this.progressTimeouts[id]);
      delete this.progressTimeouts[id];
    }

    // Emit close event
    this.snackbarClosed.emit({ id, item: this.snackbars[index] });

    // Remove from array
    this.snackbars = this.snackbars.filter(item => item.id !== id);
    this.animatedItems.delete(id);
    this.updateVisibleSnackbars();
  }

  /**
   * Close all snackbars
   */
  @Method()
  async closeAll() {
    // Clear all timeouts
    Object.values(this.timeouts).forEach(timeout => clearTimeout(timeout));
    Object.values(this.progressTimeouts).forEach(timeout => clearTimeout(timeout));

    this.timeouts = {};
    this.progressTimeouts = {};

    // Emit close events for all
    this.snackbars.forEach(item => {
      this.snackbarClosed.emit({ id: item.id, item });
    });

    this.snackbars = [];
    this.visibleSnackbars = [];
    this.animatedItems.clear();
  }

  /**
   * Close the next snackbar based on stack mode
   */
  @Method()
  async closeNext() {
    if (this.snackbars.length === 0) return;

    let idToClose: string;

    if (this.stackMode === 'queue') {
      // For queue mode, close oldest (first in array)
      idToClose = this.snackbars[0].id;
    } else if (this.stackMode === 'lifo') {
      // For LIFO mode, close newest (first in array since new ones are added to front)
      idToClose = this.snackbars[0].id;
    } else {
      // For stack mode, close oldest (last in array)
      idToClose = this.snackbars[this.snackbars.length - 1].id;
    }

    await this.close(idToClose);
  }

  private generateId(): string {
    return `snackbar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private startProgressAnimation(id: string, duration: number) {
    // Start progress bar animation
    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      const progressBar = this.getProgressBarElement(id);
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (progress < 100 && this.timeouts[id]) {
        this.progressTimeouts[id] = window.setTimeout(updateProgress, 50);
      }
    };

    updateProgress();
  }

  private getProgressBarElement(id: string): HTMLElement | null {
    return this.element.shadowRoot?.querySelector(`[data-snackbar-id="${id}"] .snackbar-progress`) as HTMLElement;
  }

  private handleCloseClick = (id: string) => {
    this.close(id);
  };

  private handleLinkClick = (id: string, item: SnackbarItem) => {
    if (item.link) {
      this.snackbarLinkClicked.emit({ id, item, link: item.link });
    }
  };

  private renderIcon(type: SnackbarType) {
    const icons = {
      success: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ),
      error: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      ),
      warning: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      info: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
    };

    return <div class={`snackbar-icon ${type}`}>{icons[type]}</div>;
  }

  render() {
    const containerClasses = `snackbar-container ${this.position}`;

    return (
      <div class={containerClasses}>
        {this.visibleSnackbars.map((item, index) => (
          <div
            key={item.id}
            data-snackbar-id={item.id}
            class={`snackbar-item ${item.type} ${item.variant || 'filled'} ${item.size || 'md'} ${this.openMode}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {this.renderIcon(item.type)}

            <div class="snackbar-content">
              <p class="snackbar-message">{item.message}</p>
              {item.link && (
                <a
                  class="snackbar-link"
                  href={item.link.url}
                  onClick={(e) => {
                    e.preventDefault();
                    this.handleLinkClick(item.id, item);
                  }}
                >
                  {item.link.text}
                </a>
              )}
            </div>

            <button
              class="snackbar-close"
              onClick={() => this.handleCloseClick(item.id)}
              aria-label="Close snackbar"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div class={`snackbar-progress ${item.type}`}></div>
          </div>
        ))}
      </div>
    );
  }

  componentDidRender() {
    // Add show class after a brief delay to trigger animations
    this.visibleSnackbars.forEach(item => {
      if (!this.animatedItems.has(item.id)) {
        this.animatedItems.add(item.id);
        setTimeout(() => {
          const element = this.element.shadowRoot?.querySelector(`[data-snackbar-id="${item.id}"]`);
          if (element) {
            element.classList.add('show');
          }
        }, 10);
      }
    });
  }
}