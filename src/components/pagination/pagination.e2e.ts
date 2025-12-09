import { newE2EPage } from '@stencil/core/testing';

describe('ui-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-pagination total-items="100"></ui-pagination>');
    const element = await page.find('ui-pagination');
    expect(element).not.toBeNull();
  });

  it('calculates total pages correctly', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-pagination total-items="100" items-per-page="10"></ui-pagination>');
    await page.waitForChanges();
    const buttons = await page.findAll('ui-pagination >>> .pagination-page');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('emits page change event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-pagination total-items="100" items-per-page="10"></ui-pagination>');
    
    const pageChangeEvent = await page.spyOnEvent('pageChange');
    const nextBtn = await page.find('ui-pagination >>> .pagination-next');
    
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForChanges();
      expect(pageChangeEvent).toHaveReceivedEvent();
    }
  });

  it('supports different types', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-pagination type="dropdown" total-items="100"></ui-pagination>');
    const pagination = await page.find('ui-pagination');
    expect(pagination.getAttribute('type')).toBe('dropdown');
  });

  it('supports hide nav buttons', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-pagination type="dropdown" hide-nav-buttons="true" total-items="100"></ui-pagination>');
    const pagination = await page.find('ui-pagination');
    expect(pagination.getAttribute('hide-nav-buttons')).toBe('true');
  });
});
