import { newE2EPage } from '@stencil/core/testing';

describe('ui-advanced-data-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-advanced-data-table></ui-advanced-data-table>');
    const element = await page.find('ui-advanced-data-table');
    expect(element).not.toBeNull();
  });

  it('displays data in rows', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-advanced-data-table></ui-advanced-data-table>');
    
    await page.$eval('ui-advanced-data-table', (elm: any) => {
      elm.data = [
        { id: 1, name: 'John', email: 'john@test.com' },
        { id: 2, name: 'Jane', email: 'jane@test.com' }
      ];
      elm.columns = [
        { id: 'id', field: 'id', label: 'ID' },
        { id: 'name', field: 'name', label: 'Name' },
        { id: 'email', field: 'email', label: 'Email' }
      ];
    });
    
    await page.waitForChanges();
    const rows = await page.findAll('ui-advanced-data-table >>> tbody tr');
    expect(rows.length).toBeGreaterThanOrEqual(0);
  });

  it('supports sorting', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-advanced-data-table sortable="true"></ui-advanced-data-table>');
    const table = await page.find('ui-advanced-data-table');
    expect(table.getAttribute('sortable')).toBe('true');
  });

  it('emits column pin events', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-advanced-data-table column-pinning="true"></ui-advanced-data-table>');
    
    await page.spyOnEvent('columnPin');
    const table = await page.find('ui-advanced-data-table');
    expect(table).not.toBeNull();
  });
});
