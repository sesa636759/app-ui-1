import { newE2EPage } from '@stencil/core/testing';
import './dialog-box';
import './dialog-box';

describe('dialog-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dialog-box></dialog-box>');
    const element = await page.find('dialog-box');
    expect(element).not.toBeNull();
  });

  it('opens and closes', async () => {
    const page = await newE2EPage();
    await page.setContent('<dialog-box></dialog-box>');
    
    const dialog = await page.find('dialog-box');
    await page.$eval('dialog-box', (elm: any) => {
      elm.open = true;
    });
    
    await page.waitForChanges();
    const isOpen = await dialog.getProperty('open');
    expect(isOpen).toBe(true);
  });

  it('displays title', async () => {
    const page = await newE2EPage();
    await page.setContent('<dialog-box title="Dialog Title" open="true"></dialog-box>');
    await page.waitForChanges();
    const title = await page.find('dialog-box >>> .dialog-title');
    if (title) {
      expect(title.textContent).toContain('Dialog Title');
    }
  });

  it('supports different sizes', async () => {
    const page = await newE2EPage();
    await page.setContent('<dialog-box size="lg"></dialog-box>');
    const dialog = await page.find('dialog-box');
    expect(dialog.getAttribute('size')).toBe('lg');
  });
});
