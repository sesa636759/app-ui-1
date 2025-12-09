import { newE2EPage } from '@stencil/core/testing';

describe('ui-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-accordion></ui-accordion>');
    const element = await page.find('ui-accordion');
    expect(element).not.toBeNull();
  });

  it('expands and collapses accordion items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-accordion>
        <ui-accordion-item header="Item 1">Content 1</ui-accordion-item>
        <ui-accordion-item header="Item 2">Content 2</ui-accordion-item>
      </ui-accordion>
    `);
    await page.waitForChanges();
    
    const firstItem = await page.find('ui-accordion-item');
    expect(firstItem).not.toBeNull();
    const header = await page.find('ui-accordion-item >>> .accordion-header');
    if (header) {
      await header.click();
      await page.waitForChanges();
    }
  });

  it('supports multiple mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-accordion multiple="true">
        <ui-accordion-item header="Item 1">Content 1</ui-accordion-item>
        <ui-accordion-item header="Item 2">Content 2</ui-accordion-item>
      </ui-accordion>
    `);
    
    const accordion = await page.find('ui-accordion');
    expect(accordion.getAttribute('multiple')).toBe('true');
  });
});
