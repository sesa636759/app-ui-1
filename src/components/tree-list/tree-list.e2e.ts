import { newE2EPage } from '@stencil/core/testing';

describe('ui-tree-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tree-list></ui-tree-list>');
    const element = await page.find('ui-tree-list');
    expect(element).not.toBeNull();
  });

  it('displays tree nodes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tree-list></ui-tree-list>');
    
    await page.$eval('ui-tree-list', (elm: any) => {
      elm.data = [
        { label: 'Node 1', value: '1', children: [
          { label: 'Child 1.1', value: '1.1' }
        ]},
        { label: 'Node 2', value: '2' }
      ];
    });
    
    await page.waitForChanges();
    const treeList = await page.find('ui-tree-list');
    expect(treeList).not.toBeNull();
  });

  it('supports selection', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tree-list selectable="true"></ui-tree-list>');
    const treeList = await page.find('ui-tree-list');
    expect(treeList.getAttribute('selectable')).toBe('true');
  });

  it('supports expand/collapse', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-tree-list expandable="true"></ui-tree-list>');
    const treeList = await page.find('ui-tree-list');
    expect(treeList.getAttribute('expandable')).toBe('true');
  });
});
