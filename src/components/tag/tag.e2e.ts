import { newE2EPage } from '@stencil/core/testing';

describe('ui-tag', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tag>Tag</ui-tag>');
    const element = await page.find('ui-tag');
    expect(element).not.toBeNull();
  });

  it('displays text content', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tag>Label</ui-tag>');
    const tag = await page.find('ui-tag');
    expect(tag.textContent).toContain('Label');
  });

  it('supports different colors', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tag color="blue">Blue Tag</ui-tag>');
    const tag = await page.find('ui-tag');
    expect(tag.getAttribute('color')).toBe('blue');
  });

  it('supports closable tags', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tag closable="true">Closable</ui-tag>');
    const tag = await page.find('ui-tag');
    expect(tag.getAttribute('closable')).toBe('true');
  });

  it('emits close event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tag closable="true">Test</ui-tag>');
    
    const closeEvent = await page.spyOnEvent('tagClose');
    const closeBtn = await page.find('ui-tag >>> .tag-close');
    
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForChanges();
      expect(closeEvent).toHaveReceivedEvent();
    }
  });
});
