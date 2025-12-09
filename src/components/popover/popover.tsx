import { Component, Prop, h, State, Element, Method } from '@stencil/core';

@Component({
  tag: 'ui-popover',
  styleUrl: 'popover.css',
  shadow: true,
})
export class Popover {
  @Element() element: HTMLElement;

  /**
   * Popover heading text
   */
  @Prop() heading: string = '';

  /**
   * Popover content (HTML string)
   */
  @Prop() content: string = '';

  /**
   * Trigger type: 'click', 'hover', 'focus'
   */
  @Prop() trigger: 'click' | 'hover' | 'focus' = 'click';

  /**
   * Placement of popover
   */
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' = 'top';

  /**
   * Show arrow
   */
  @Prop() showArrow: boolean = true;

  /**
   * Popover width
   */
  @Prop() width: string = '280px';

  /**
   * Whether popover is visible
   */
  @State() isVisible: boolean = false;
  @State() currentPlacement: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' = 'top';

  private targetElement: HTMLElement;
  private hideTimeout: any;
  private isPositioning: boolean = false;
  private positionUpdateScheduled: boolean = false;

  componentDidLoad() {
    this.setupTrigger();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll, true);
    // initialize currentPlacement
    this.currentPlacement = this.placement;
  }

  componentDidUpdate() {
    // Only update position when visibility changes
    if (this.isVisible && !this.isPositioning && !this.positionUpdateScheduled) {
      this.schedulePositionUpdate();
    }
  }

  disconnectedCallback() {
    this.cleanup();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  private setupTrigger() {
    // Get the trigger element (the element that wraps this component or slotted content)
    const slot = this.element.shadowRoot.querySelector('slot');
    if (slot) {
      const assignedElements = slot.assignedElements();
      if (assignedElements.length > 0) {
        this.targetElement = assignedElements[0] as HTMLElement;
        this.attachTriggerEvents();
      }
    }
  }

  private attachTriggerEvents() {
    if (!this.targetElement) return;

    switch (this.trigger) {
      case 'click':
        this.targetElement.addEventListener('click', this.handleClick);
        document.addEventListener('click', this.handleOutsideClick);
        break;
      case 'hover':
        this.targetElement.addEventListener('mouseenter', this.handleMouseEnter);
        this.targetElement.addEventListener('mouseleave', this.handleMouseLeave);
        break;
      case 'focus':
        this.targetElement.addEventListener('focus', this.handleFocus);
        this.targetElement.addEventListener('blur', this.handleBlur);
        break;
    }
  }

  private cleanup() {
    if (!this.targetElement) return;

    this.targetElement.removeEventListener('click', this.handleClick);
    this.targetElement.removeEventListener('mouseenter', this.handleMouseEnter);
    this.targetElement.removeEventListener('mouseleave', this.handleMouseLeave);
    this.targetElement.removeEventListener('focus', this.handleFocus);
    this.targetElement.removeEventListener('blur', this.handleBlur);
    document.removeEventListener('click', this.handleOutsideClick);
  }

  private handleClick = () => {
    this.isVisible = !this.isVisible;
  };

  private handleOutsideClick = (event: MouseEvent) => {
    if (!this.element.contains(event.target as Node)) {
      this.isVisible = false;
    }
  };

  private handleMouseEnter = () => {
    clearTimeout(this.hideTimeout);
    this.isVisible = true;
    this.schedulePositionUpdate();
  };

  private handleMouseLeave = () => {
    this.hideTimeout = setTimeout(() => {
      this.isVisible = false;
    }, 200);
  };

  private handleFocus = () => {
    this.isVisible = true;
    this.schedulePositionUpdate();
  };

  private handleBlur = () => {
    this.isVisible = false;
  };

  private handleResize = () => {
    if (this.isVisible) {
      this.schedulePositionUpdate();
    }
  };

  private handleScroll = () => {
    if (this.isVisible) {
      this.schedulePositionUpdate();
    }
  };

  private schedulePositionUpdate() {
    if (this.isPositioning || this.positionUpdateScheduled) return;
    
    this.positionUpdateScheduled = true;
    requestAnimationFrame(() => {
      this.updatePopoverPosition();
      this.positionUpdateScheduled = false;
    });
  }

  private updatePopoverPosition() {
    if (!this.isVisible || this.isPositioning) return;

    this.isPositioning = true;

    // Use a separate RAF to ensure DOM is ready
    requestAnimationFrame(() => {
      const popover = this.element.shadowRoot?.querySelector('.popover') as HTMLElement;
      const arrow = this.element.shadowRoot?.querySelector('.popover-arrow') as HTMLElement;
      
      if (!popover || !this.targetElement) {
        this.isPositioning = false;
        return;
      }

      const targetRect = this.targetElement.getBoundingClientRect();
      const rect = popover.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const padding = 16;

      // Calculate available space in all directions from target
      const spaceAbove = targetRect.top - padding;
      const spaceBelow = viewportHeight - targetRect.bottom - padding;
      const spaceLeft = targetRect.left - padding;
      const spaceRight = viewportWidth - targetRect.right - padding;

      // Check if popover overflows viewport boundaries
      const overflowRight = rect.right > viewportWidth - padding;
      const overflowLeft = rect.left < padding;
      const overflowBottom = rect.bottom > viewportHeight - padding;
      const overflowTop = rect.top < padding;

      // Handle vertical overflow (top/bottom placements) - check available space first
      if (this.placement.includes('top') && (overflowTop || rect.height > spaceAbove)) {
        // Check if there's more space below
        if (spaceBelow > spaceAbove) {
          // Switch from top to bottom
          popover.style.top = '100%';
          popover.style.bottom = 'auto';
          popover.style.marginTop = '12px';
          popover.style.marginBottom = '0';
          this.currentPlacement = this.placement.includes('start') ? 'bottom-start' : this.placement.includes('end') ? 'bottom-end' : 'bottom';
        } else {
          // Keep top but constrain height
          popover.style.maxHeight = `${spaceAbove}px`;
          popover.style.overflowY = 'auto';
        }
      } else if (this.placement.includes('bottom') && (overflowBottom || rect.height > spaceBelow)) {
        // Check if there's more space above
        if (spaceAbove > spaceBelow) {
          // Switch from bottom to top
          popover.style.bottom = '100%';
          popover.style.top = 'auto';
          popover.style.marginBottom = '12px';
          popover.style.marginTop = '0';
          this.currentPlacement = this.placement.includes('start') ? 'top-start' : this.placement.includes('end') ? 'top-end' : 'top';
        } else {
          // Keep bottom but constrain height
          popover.style.maxHeight = `${spaceBelow}px`;
          popover.style.overflowY = 'auto';
        }
      }

      // Handle horizontal overflow
      if (overflowRight) {
        if (this.placement.includes('right') && spaceLeft > spaceRight) {
          // Switch from right to left if more space on left
          popover.style.right = '100%';
          popover.style.left = 'auto';
          popover.style.marginRight = '12px';
          popover.style.marginLeft = '0';
          this.currentPlacement = 'left';
        } else if (this.placement === 'top' || this.placement === 'bottom') {
          // For centered placements, shift to fit in viewport
          const overflow = rect.right - (viewportWidth - padding);
          const currentLeft = rect.left;
          const newLeft = Math.max(padding, currentLeft - overflow);
          popover.style.left = `${newLeft - targetRect.left}px`;
          popover.style.transform = 'none';
        } else if (this.placement.includes('start')) {
          // Keep start alignment but constrain width
          const availableWidth = viewportWidth - rect.left - padding;
          if (availableWidth > 200 && availableWidth < parseInt(this.width)) {
            popover.style.maxWidth = `${availableWidth}px`;
          }
        } else if (this.placement.includes('end')) {
          // Align to viewport edge
          popover.style.right = '0';
        }
      }

      if (overflowLeft) {
        if (this.placement.includes('left') && spaceRight > spaceLeft) {
          // Switch from left to right if more space on right
          popover.style.left = '100%';
          popover.style.right = 'auto';
          popover.style.marginLeft = '12px';
          popover.style.marginRight = '0';
          this.currentPlacement = 'right';
        } else if (this.placement === 'top' || this.placement === 'bottom') {
          // For centered placements, shift to fit in viewport
          popover.style.left = '0';
          popover.style.right = 'auto';
          popover.style.transform = 'none';
        } else if (this.placement.includes('end')) {
          // Keep end alignment but constrain width
          const availableWidth = rect.right - padding;
          if (availableWidth > 200 && availableWidth < parseInt(this.width)) {
            popover.style.maxWidth = `${availableWidth}px`;
          }
        } else if (this.placement.includes('start')) {
          // Align to viewport edge
          popover.style.left = '0';
        }
      }

      // Ensure popover doesn't exceed viewport height
      if (rect.height > viewportHeight - padding * 2) {
        popover.style.maxHeight = `${viewportHeight - padding * 2}px`;
        popover.style.overflowY = 'auto';
      }

      // Ensure popover doesn't exceed viewport width
      const maxWidth = Math.min(parseInt(this.width), viewportWidth - padding * 2);
      if (!popover.style.maxWidth || parseInt(popover.style.maxWidth) > maxWidth) {
        popover.style.maxWidth = `${maxWidth}px`;
      }

      // After all position adjustments, recalculate arrow position if needed
      if (arrow && this.showArrow) {
        // Wait for next frame to get updated position after all style changes
        requestAnimationFrame(() => {
          const updatedRect = popover.getBoundingClientRect();
          const updatedTargetRect = this.targetElement.getBoundingClientRect();
          
          // Calculate target center position in viewport coordinates
          const targetCenterX = updatedTargetRect.left + updatedTargetRect.width / 2;
          const targetCenterY = updatedTargetRect.top + updatedTargetRect.height / 2;
          
          // Calculate popover position in viewport coordinates
          const popoverLeft = updatedRect.left;
          const popoverTop = updatedRect.top;
          const popoverWidth = updatedRect.width;
          const popoverHeight = updatedRect.height;
          
          // Adjust arrow position based on current placement orientation (use effective placement)
          const effectivePlacement = this.currentPlacement || this.placement;

          // Reset arrow position so CSS base placement rules apply, then adjust within bounds
          arrow.style.left = '';
          arrow.style.right = '';
          arrow.style.top = '';
          arrow.style.bottom = '';
          arrow.style.marginLeft = '';
          arrow.style.marginTop = '';

          if (effectivePlacement.includes('top') || effectivePlacement.includes('bottom')) {
            // For top/bottom placements, calculate where arrow should be horizontally
            // Arrow needs to point to the button center
            const arrowPositionFromLeft = targetCenterX - popoverLeft;
            
            // Keep arrow within popover bounds with safety margins
            // Allow arrow to reach near the popover edge (half arrow size = 6px)
            const minArrowPos = 6;
            const maxArrowPos = popoverWidth - 6;
            
            // Clamp the arrow position within safe bounds
            let finalArrowPos = Math.max(minArrowPos, Math.min(arrowPositionFromLeft, maxArrowPos));

            // If popover is pinned to the viewport edge (due to overflow), keep arrow inside safe bounds
            // This prevents the arrow appearing to point outside the popover box
            if (updatedRect.left <= padding) {
              finalArrowPos = Math.max(finalArrowPos, minArrowPos);
            }
            if (updatedRect.right >= viewportWidth - padding) {
              finalArrowPos = Math.min(finalArrowPos, maxArrowPos);
            }
            
            // Apply the arrow position (subtract 6px to center the 12px arrow)
            arrow.style.left = `${finalArrowPos - 6}px`;
            arrow.style.marginLeft = '0';
            arrow.style.right = 'auto';
            arrow.style.transform = 'rotate(45deg)'; // Maintain the diamond shape
            
          } else if (effectivePlacement.includes('left') || effectivePlacement.includes('right')) {
            // For left/right placements, calculate where arrow should be vertically
            // Arrow needs to point to the button center
            const arrowPositionFromTop = targetCenterY - popoverTop;
            
            // Keep arrow within popover bounds with safety margins
            // Allow arrow to reach near the popover edge (half arrow size = 6px)
            const minArrowPos = 6;
            const maxArrowPos = popoverHeight - 6;
            
            // Clamp the arrow position within safe bounds
            let finalArrowPos = Math.max(minArrowPos, Math.min(arrowPositionFromTop, maxArrowPos));

            // If popover is pinned to the viewport edge (due to overflow), keep arrow inside safe bounds
            if (updatedRect.top <= padding) {
              finalArrowPos = Math.max(finalArrowPos, minArrowPos);
            }
            if (updatedRect.bottom >= viewportHeight - padding) {
              finalArrowPos = Math.min(finalArrowPos, maxArrowPos);
            }
            
            // Apply the arrow position (subtract 6px to center the 12px arrow)
            arrow.style.top = `${finalArrowPos - 6}px`;
            arrow.style.marginTop = '0';
            arrow.style.bottom = 'auto';
            arrow.style.transform = 'rotate(45deg)'; // Maintain the diamond shape
          }
        });
      }

      this.isPositioning = false;
    });
  }

  @Method()
  async show() {
    this.isVisible = true;
    this.schedulePositionUpdate();
  }

  @Method()
  async hide() {
    this.isVisible = false;
  }

  @Method()
  async toggle() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.schedulePositionUpdate();
    }
  }

  private getPopoverStyle() {
    const styles: any = {
      width: this.width
    };

    return styles;
  }

  render() {
    const popoverClasses = {
      'popover': true,
      'popover-visible': this.isVisible,
      [`popover-${this.currentPlacement}`]: true
    };

    return (
      <div class="popover-wrapper">
        <div class="popover-trigger">
          <slot></slot>
        </div>
        {this.isVisible && (
          <div class={popoverClasses} style={this.getPopoverStyle()}>
            {this.showArrow && <div class="popover-arrow"></div>}
            <div class="popover-content">
              {this.heading && <div class="popover-title">{this.heading}</div>}
              <div class="popover-body" innerHTML={this.content}></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
