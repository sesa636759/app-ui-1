import { Component, Prop, h, Event, EventEmitter, Element, Watch, State } from '@stencil/core';

@Component({
  tag: 'ui-anchor',
  styleUrl: 'anchor.css',
  shadow: true,
})
export class Anchor {
  @Element() hostElement: HTMLElement;

  /**
   * Anchor links array (as JSON string)
   */
  @Prop() links: string = '[]';

  /**
   * Orientation: 'vertical' or 'horizontal'
   */
  @Prop() orientation: 'vertical' | 'horizontal' = 'vertical';

  /**
   * The container element for the scrollable content. If not provided, the window will be used.
   */
  @Prop() scrollContainer: string;

  /**
   * Offset from top when scrolling (in pixels)
   */
  @Prop() scrollOffset: number = 80;

  /**
   * Active link ID
   */
  @Prop({ mutable: true }) activeLink: string = '';

  /**
   * Show active indicator line
   */
  @Prop() showIndicator: boolean = true;

  /**
   * Event emitted when anchor link is clicked
   */
  @Event() anchorClick: EventEmitter<{ linkId: string; targetId: string }>;

  @State() indicatorStyle: { [key: string]: string } = {};

  private parsedLinks: Array<{ id: string; label: string; target: string }> = [];
  private linkElements: Map<string, HTMLAnchorElement> = new Map();
  private scrollElement: HTMLElement | Window;
  private scrollTimeout: any;
  private isUpdating: boolean = false;

  @Watch('links')
  handleLinksChange(newValue: string) {
    this.parseLinks(newValue);
  }

  @Watch('activeLink')
  handleActiveLinkChange() {
    this.updateIndicatorPosition();
  }

  componentWillLoad() {
    this.parseLinks(this.links);
  }

  componentDidLoad() {
    this.scrollElement = this.scrollContainer ? (document.querySelector(this.scrollContainer) as HTMLElement) : window;
    if (this.scrollElement) {
      this.scrollElement.addEventListener('scroll', this.handleScroll, { passive: true });
    }
    this.updateActiveLink();
    setTimeout(() => {
      this.updateIndicatorPosition();
    }, 100);
  }

  disconnectedCallback() {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener('scroll', this.handleScroll);
    }
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  private parseLinks(linksString: string) {
    try {
      this.parsedLinks = JSON.parse(linksString);
      if (this.parsedLinks.length > 0 && !this.activeLink) {
        this.activeLink = this.parsedLinks[0].id;
      }
    } catch (error) {
      console.error('Invalid JSON for anchor links:', error);
      this.parsedLinks = [];
    }
  }

  private handleScroll = () => {
    // Throttle scroll updates to prevent performance issues
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    
    this.scrollTimeout = setTimeout(() => {
      if (!this.isUpdating) {
        this.updateActiveLink();
      }
    }, 50);
  };

  private getScrollTop(): number {
    if (this.scrollElement instanceof Window) {
      return window.scrollY;
    }
    return (this.scrollElement as HTMLElement).scrollTop;
  }

  private getElement(selector: string): Element | null {
    const container = this.scrollContainer ? document.querySelector(this.scrollContainer) : document;
    return container ? container.querySelector(selector) : null;
  }

  private updateActiveLink() {
    if (this.isUpdating) return;
    this.isUpdating = true;

    const scrollPosition = this.getScrollTop() + this.scrollOffset + 10;

    for (let i = this.parsedLinks.length - 1; i >= 0; i--) {
      const link = this.parsedLinks[i];
      const element = this.getElement(`#${link.target}`);
      
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + this.getScrollTop();
        
        if (scrollPosition >= elementTop) {
          if (this.activeLink !== link.id) {
            this.activeLink = link.id;
          }
          break;
        }
      }
    }

    this.isUpdating = false;
  }

  private updateIndicatorPosition() {
    if (!this.showIndicator || !this.activeLink) {
      return;
    }

    // Use requestAnimationFrame to batch DOM updates
    requestAnimationFrame(() => {
      const activeLinkElement = this.linkElements.get(this.activeLink);
      if (!activeLinkElement) {
        return;
      }

      const linksContainer = this.hostElement.shadowRoot?.querySelector('.anchor-links');
      if (!linksContainer) {
        return;
      }

      const containerRect = linksContainer.getBoundingClientRect();
      const linkRect = activeLinkElement.getBoundingClientRect();

      if (this.orientation === 'vertical') {
        const top = linkRect.top - containerRect.top;
        const height = linkRect.height;
        this.indicatorStyle = {
          transform: `translateY(${top}px)`,
          height: `${height}px`
        };
      } else {
        const left = linkRect.left - containerRect.left;
        const width = linkRect.width;
        this.indicatorStyle = {
          transform: `translateX(${left}px)`,
          width: `${width}px`
        };
      }
    });
  }

  private handleLinkClick(link: { id: string; label: string; target: string }, event: Event) {
    event.preventDefault();
    
    // Set updating flag to prevent scroll event interference
    this.isUpdating = true;
    
    // Try to find the target element
    const targetElement = document.getElementById(link.target);
    
    if (!targetElement) {
      console.warn(`Anchor target not found: #${link.target}`);
      this.isUpdating = false;
      return;
    }

    // Update active link immediately
    this.activeLink = link.id;

    // Calculate absolute position of target element
    const targetRect = targetElement.getBoundingClientRect();
    const absoluteTop = targetRect.top + window.scrollY;
    
    if (this.scrollElement instanceof Window) {
      // For window scrolling - scroll to absolute position minus offset
      const scrollToPosition = absoluteTop - this.scrollOffset;
      
      try {
        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      } catch (e) {
        // Fallback for browsers that don't support smooth scrolling
        window.scrollTo(0, scrollToPosition);
      }
    } else {
      // For container scrolling
      const container = this.scrollElement as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      
      // Get the absolute positions
      const containerAbsoluteTop = containerRect.top + window.scrollY;
      const targetAbsoluteTop = absoluteTop;
      
      // Calculate the scroll position within the container
      const scrollTo = container.scrollTop + (targetAbsoluteTop - containerAbsoluteTop) - this.scrollOffset;
      
      try {
        container.scrollTo({
          top: scrollTo,
          behavior: 'smooth'
        });
      } catch (e) {
        // Fallback
        container.scrollTop = scrollTo;
      }
    }

    // Re-enable scroll tracking after animation completes
    setTimeout(() => {
      this.isUpdating = false;
      this.updateIndicatorPosition();
    }, 1000);

    this.anchorClick.emit({ linkId: link.id, targetId: link.target });
  }

  render() {
    const containerClasses = {
      'anchor-container': true,
      [`anchor-${this.orientation}`]: true
    };

    return (
      <div class={containerClasses}>
        {this.showIndicator && (
          <div class="anchor-indicator" style={this.indicatorStyle}></div>
        )}
        <div class="anchor-links">
          {this.parsedLinks.map(link => (
            <a
              ref={el => {
                if (el) {
                  this.linkElements.set(link.id, el as HTMLAnchorElement);
                }
              }}
              href={`#${link.target}`}
              class={{
                'anchor-link': true,
                'anchor-link-active': this.activeLink === link.id
              }}
              onClick={(e) => this.handleLinkClick(link, e)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    );
  }
}
