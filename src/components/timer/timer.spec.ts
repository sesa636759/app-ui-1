import { newSpecPage } from '@stencil/core/testing';
import { Timer } from './timer';

describe('ui-timer', () => {
  it('renders steps', async () => {
    const page = await newSpecPage({
      components: [Timer],
      html: `<ui-timer steps='[{"label":"Step 1"},{"label":"Step 2"}]'></ui-timer>`
    });
    expect(page.root.shadowRoot || page.root).toEqualHtml(`
      <div class="timer-container" role="list" aria-label="Timer Steps">
        <div class="timer-step timer-step-active" role="group" aria-label="Step 1" tabindex="0">
          <div class="timer-label">Step 1</div>
        </div>
        <div class="timer-step" role="group" aria-label="Step 2" tabindex="-1">
          <div class="timer-label">Step 2</div>
        </div>
      </div>
    `);
  });

  it('supports next/prev/goTo', async () => {
    const page = await newSpecPage({
      components: [Timer],
      html: `<ui-timer steps='[{"label":"Step 1"},{"label":"Step 2"},{"label":"Step 3"}]'></ui-timer>`
    });
    const timer = page.rootInstance;
    await timer.next();
    expect(timer.activeStep).toBe(1);
    await timer.prev();
    expect(timer.activeStep).toBe(0);
    await timer.goTo(2);
    expect(timer.activeStep).toBe(2);
  });
});
