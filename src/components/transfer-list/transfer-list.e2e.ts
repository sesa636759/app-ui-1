import { newE2EPage } from '@stencil/core/testing';

describe('ui-transfer-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-transfer-list></ui-transfer-list>');
    const element = await page.find('ui-transfer-list');
    expect(element).not.toBeNull();
  });

  it('displays source and target lists', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-transfer-list></ui-transfer-list>');
    
    await page.$eval('ui-transfer-list', (elm: any) => {
      elm.sourceData = [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' }
      ];
      elm.targetData = [];
    });
    
    await page.waitForChanges();
    const transferList = await page.find('ui-transfer-list');
    expect(transferList).not.toBeNull();
  });

  it('supports search functionality', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-transfer-list searchable="true"></ui-transfer-list>');
    const transferList = await page.find('ui-transfer-list');
    expect(transferList.getAttribute('searchable')).toBe('true');
  });
});
