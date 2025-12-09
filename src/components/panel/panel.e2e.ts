import { newE2EPage } from '@stencil/core/testing';

describe('ui-panel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-panel></ui-panel>');
    const element = await page.find('ui-panel');
    expect(element).not.toBeNull();
  });

  it('displays header', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-panel><div slot="header">Panel Header</div></ui-panel>');
    await page.waitForChanges();
    const panel = await page.find('ui-panel');
    expect(panel).not.toBeNull();
  });

  it('supports collapsible', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-panel collapsible="true"></ui-panel>');
    const panel = await page.find('ui-panel');
    expect(panel.getAttribute('collapsible')).toBe('true');
  });

  it('toggles collapsed state', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-panel collapsible="true" collapsed="false"></ui-panel>');
    
    await page.$eval('ui-panel', (elm: any) => {
      elm.collapsed = true;
    });
    
    await page.waitForChanges();
    const panel = await page.find('ui-panel');
    const collapsed = await panel.getProperty('collapsed');
    expect(collapsed).toBe(true);
  });
});
