import { newSpecPage } from '@stencil/core/testing';
import { Timeline } from './timeline';

describe('ui-timeline', () => {
  it('renders events', async () => {
    const page = await newSpecPage({
      components: [Timeline],
      html: `<ui-timeline events='[{"label":"Event 1"},{"label":"Event 2"}]'></ui-timeline>`
    });
    expect(page.root.shadowRoot || page.root).toEqualHtml(`
      <div class="timeline-container" role="list" aria-label="Timeline Events">
        <div class="timeline-event timeline-event-active" role="group" aria-label="Event 1" tabindex="0">
          <div class="timeline-label">Event 1</div>
        </div>
        <div class="timeline-event" role="group" aria-label="Event 2" tabindex="-1">
          <div class="timeline-label">Event 2</div>
        </div>
      </div>
    `);
  });

  it('supports next/prev/goTo', async () => {
    const page = await newSpecPage({
      components: [Timeline],
      html: `<ui-timeline events='[{"label":"Event 1"},{"label":"Event 2"},{"label":"Event 3"}]'></ui-timeline>`
    });
    const timeline = page.rootInstance;
    await timeline.next();
    expect(timeline.activeEvent).toBe(1);
    await timeline.prev();
    expect(timeline.activeEvent).toBe(0);
    await timeline.goTo(2);
    expect(timeline.activeEvent).toBe(2);
  });
});
