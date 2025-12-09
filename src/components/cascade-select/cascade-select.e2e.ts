import { newE2EPage } from '@stencil/core/testing';

describe('ui-cascade-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-cascade-select></ui-cascade-select>');
    const element = await page.find('ui-cascade-select');
    expect(element).not.toBeNull();
  });

  it('displays options', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-cascade-select></ui-cascade-select>');
    
    await page.$eval('ui-cascade-select', (elm: any) => {
      elm.options = [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2', children: [
          { label: 'Child 2.1', value: '2.1' }
        ]}
      ];
    });
    
    await page.waitForChanges();
    const select = await page.find('ui-cascade-select');
    expect(select).not.toBeNull();
  });

  it('supports placeholder', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-cascade-select placeholder="Select an option"></ui-cascade-select>');
    const select = await page.find('ui-cascade-select');
    expect(select.getAttribute('placeholder')).toBe('Select an option');
  });
});
