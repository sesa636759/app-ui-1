import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'app-timeline-item',
  styleUrl: 'timeline-item.css',
  shadow: true,
})
export class TimelineItem {
  /**
   * The title of the timeline item.
   */
  @Prop() itemTitle: string;

  /**
   * The description of the timeline item.
   */
  @Prop() itemDescription: string;

  /**
   * The date of the timeline item.
   */
  @Prop() itemDate: string;

  render() {
    return (
      <div class="timeline-item-container">
        <div class="timeline-item-content">
          <h2>{this.itemTitle}</h2>
          <p>{this.itemDescription}</p>
          <span>{this.itemDate}</span>
        </div>
      </div>
    );
  }
}
