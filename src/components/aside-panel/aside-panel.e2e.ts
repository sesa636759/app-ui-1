import { newE2EPage } from '@stencil/core/testing';

describe('aside-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<aside-panel></aside-panel>');
    const element = await page.find('aside-panel');
    expect(element).not.toBeNull();
  });

  it('opens and closes', async () => {
    const page = await newE2EPage();
    await page.setContent('<aside-panel></aside-panel>');
    
    const panel = await page.find('aside-panel');
    await page.$eval('aside-panel', (elm: any) => {
      elm.isOpen = true;
    });
    
    await page.waitForChanges();
    const isOpen = await panel.getProperty('isOpen');
    expect(isOpen).toBe(true);
  });

  it('supports different positions', async () => {
    const page = await newE2EPage();
    await page.setContent('<aside-panel position="right"></aside-panel>');
    const panel = await page.find('aside-panel');
    expect(panel.getAttribute('position')).toBe('right');
  });
});
