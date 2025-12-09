import { newE2EPage } from '@stencil/core/testing';

describe('ui-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-card></ui-card>');
    const element = await page.find('ui-card');
    expect(element).not.toBeNull();
  });

  it('displays header and content', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-card><div slot="header">Card Title</div>Card content</ui-card>');
    await page.waitForChanges();
    const card = await page.find('ui-card');
    expect(card).not.toBeNull();
    expect(card.textContent).toContain('Card content');
  });

  it('supports hoverable effect', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-card hoverable="true"></ui-card>');
    const card = await page.find('ui-card');
    expect(card.getAttribute('hoverable')).toBe('true');
  });

  it('supports different variants', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-card variant="outlined"></ui-card>');
    const card = await page.find('ui-card');
    expect(card.getAttribute('variant')).toBe('outlined');
  });
});
