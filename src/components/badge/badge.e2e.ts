import { newE2EPage } from '@stencil/core/testing';

describe('ui-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-badge>Badge</ui-badge>');
    const element = await page.find('ui-badge');
    expect(element).not.toBeNull();
  });

  it('displays text content', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-badge>New</ui-badge>');
    const badge = await page.find('ui-badge');
    expect(badge.textContent).toContain('New');
  });

  it('supports different variants', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-badge variant="success">Success</ui-badge>');
    const badge = await page.find('ui-badge');
    expect(badge.getAttribute('variant')).toBe('success');
  });

  it('supports pill shape', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-badge pill="true">Pill</ui-badge>');
    const badge = await page.find('ui-badge');
    expect(badge.getAttribute('pill')).toBe('true');
  });
});
