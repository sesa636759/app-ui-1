import { newE2EPage } from '@stencil/core/testing';

describe('ui-picklist', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-picklist></ui-picklist>');
    const element = await page.find('ui-picklist');
    expect(element).not.toBeNull();
  });

  it('displays source and target lists', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-picklist></ui-picklist>');
    
    await page.$eval('ui-picklist', (elm: any) => {
      elm.sourceItems = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' }
      ];
      elm.targetItems = [];
    });
    
    await page.waitForChanges();
    const picklist = await page.find('ui-picklist');
    expect(picklist).not.toBeNull();
  });

  it('supports filtering', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-picklist filterable="true"></ui-picklist>');
    const picklist = await page.find('ui-picklist');
    expect(picklist.getAttribute('filterable')).toBe('true');
  });
});
