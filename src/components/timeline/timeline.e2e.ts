import { newE2EPage } from '@stencil/core/testing';

describe('app-timeline', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-timeline></app-timeline>');

    const element = await page.find('app-timeline');
    expect(element).toHaveClass('hydrated');
  });
});
