
import { Component, Prop, h, State, Method, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { TimelineEvent, TimelineFlow, TimelineTheme } from './types';


@Component({
  tag: 'ui-timeline',
  styleUrl: 'timeline.css',
  shadow: false // Shadow DOM optional, can be toggled via prop
})
export class Timeline {
  @Element() el: HTMLElement;

  /** Events definition */
  @Prop() events: TimelineEvent[] | string = [];
  @State() normalizedEvents: TimelineEvent[] = [];

  /** Flow type */
  @Prop() flow: TimelineFlow = 'linear';

  /** Current active event */
  @State() activeEvent: number = 0;

  /** Theme variables */
  @Prop() theme?: TimelineTheme;

  /** Shadow DOM toggle */
  @Prop() useShadow: boolean = false;

  /** Responsive/collapse */
  @Prop() collapse: boolean = false;

  /** Events */
  @Event() timelineNext: EventEmitter<{ index: number, event: TimelineEvent }>;
  @Event() timelinePrev: EventEmitter<{ index: number, event: TimelineEvent }>;
  @Event() timelineGoTo: EventEmitter<{ index: number, event: TimelineEvent }>;

  /** Watch for events prop changes */
  @Watch('events')
  normalizeEvents(newEvents: TimelineEvent[] | string) {
    if (typeof newEvents === 'string') {
      try {
        this.normalizedEvents = JSON.parse(newEvents);
      } catch {
        this.normalizedEvents = [];
      }
    } else {
      this.normalizedEvents = newEvents || [];
    }
  }

  componentWillLoad() {
    this.normalizeEvents(this.events);
  }

  /** Programmatic API */
  @Method()
  async next() {
    if (this.activeEvent < this.normalizedEvents.length - 1) {
      this.activeEvent++;
      this.timelineNext.emit({ index: this.activeEvent, event: this.normalizedEvents[this.activeEvent] });
    }
  }

  @Method()
  async prev() {
    if (this.activeEvent > 0) {
      this.activeEvent--;
      this.timelinePrev.emit({ index: this.activeEvent, event: this.normalizedEvents[this.activeEvent] });
    }
  }

  @Method()
  async goTo(index: number) {
    if (index >= 0 && index < this.normalizedEvents.length) {
      this.activeEvent = index;
      this.timelineGoTo.emit({ index, event: this.normalizedEvents[index] });
    }
  }

  /** Keyboard navigation & ARIA */
  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      this.next();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      this.prev();
    }
  };

  /** Lazy rendering for events */
  renderEvent(event: TimelineEvent, index: number) {
    if (this.collapse && index !== this.activeEvent) return null;
    return (
      <div
        class={{
          'timeline-event': true,
          'timeline-event-active': index === this.activeEvent,
          [`timeline-event-${event.status}`]: !!event.status
        }}
        role="group"
        aria-label={event.label}
        tabIndex={index === this.activeEvent ? 0 : -1}
      >
        <div class="timeline-label">{event.label}</div>
        {event.description && <div class="timeline-desc">{event.description}</div>}
        {event.timestamp && <div class="timeline-timestamp">{event.timestamp}</div>}
        {event.icon && <span class="timeline-icon">{event.icon}</span>}
        {event.children && event.children.length > 0 && (
          <div class="timeline-nested">
            {event.children.map((child, i) => this.renderEvent(child, i))}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div
        class="timeline-container"
        style={this.theme ? Object.entries(this.theme).reduce((acc, [k, v]) => { acc[`--${k}`] = v; return acc; }, {} as any) : {}}
        role="list"
        aria-label="Timeline Events"
        onKeyDown={this.handleKeyDown}
      >
        {this.normalizedEvents.map((event, i) => this.renderEvent(event, i))}
      </div>
    );
  }
}
