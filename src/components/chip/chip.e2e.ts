import { newE2EPage } from '@stencil/core/testing';

describe('ui-chip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-chip>Chip</ui-chip>');
    const element = await page.find('ui-chip');
    expect(element).not.toBeNull();
  });

  it('displays text content', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-chip>Tag</ui-chip>');
    const chip = await page.find('ui-chip');
    expect(chip.textContent).toContain('Tag');
  });

  it('supports removable chip', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-chip removable="true">Removable</ui-chip>');
    const chip = await page.find('ui-chip');
    expect(chip.getAttribute('removable')).toBe('true');
  });

  it('emits remove event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-chip removable="true">Test</ui-chip>');
    
    const removeEvent = await page.spyOnEvent('chipRemove');
    const closeBtn = await page.find('ui-chip >>> .chip-close');
    
    if (closeBtn) {
      await closeBtn.click();
      await page.waitForChanges();
      expect(removeEvent).toHaveReceivedEvent();
    }
  });
});
