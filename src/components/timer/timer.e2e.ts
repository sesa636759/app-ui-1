import { newE2EPage } from '@stencil/core/testing';

describe('ui-timer (e2e)', () => {
  it('should navigate steps with keyboard', async () => {
    const page = await newE2EPage({
      html: `<ui-timer steps='[{"label":"Step 1"},{"label":"Step 2"},{"label":"Step 3"}]'></ui-timer>`
    });
    const timer = await page.find('ui-timer');
    await timer.press('ArrowRight');
    expect(await timer.getProperty('activeStep')).toBe(1);
    await timer.press('ArrowLeft');
    expect(await timer.getProperty('activeStep')).toBe(0);
  });
});
