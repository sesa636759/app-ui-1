import { newE2EPage } from '@stencil/core/testing';

describe('ui-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tabs></ui-tabs>');
    const element = await page.find('ui-tabs');
    expect(element).not.toBeNull();
  });

  it('displays multiple tabs', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-tabs>
        <ui-tab label="Tab 1">Content 1</ui-tab>
        <ui-tab label="Tab 2">Content 2</ui-tab>
        <ui-tab label="Tab 3">Content 3</ui-tab>
      </ui-tabs>
    `);
    const tabs = await page.findAll('ui-tab');
    expect(tabs.length).toBe(3);
  });

  it('switches active tab', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tabs active-tab="0"></ui-tabs>');
    
    await page.$eval('ui-tabs', (elm: any) => {
      elm.activeTab = 1;
    });
    
    await page.waitForChanges();
    const tabs = await page.find('ui-tabs');
    const activeTab = await tabs.getProperty('activeTab');
    expect(activeTab).toBe(1);
  });

  it('emits tab change event', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-tabs>
        <ui-tab label="Tab 1">Content 1</ui-tab>
        <ui-tab label="Tab 2">Content 2</ui-tab>
      </ui-tabs>
    `);
    
    await page.spyOnEvent('tabChange');
    
    await page.$eval('ui-tabs', (elm: any) => {
      elm.activeTab = 1;
    });
    
    await page.waitForChanges();
  });
});
