import { newE2EPage } from '@stencil/core/testing';
import './breadcrumb';

describe('ui-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-breadcrumb></ui-breadcrumb>');

    const element = await page.find('ui-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });

  it('renders items from JSON string', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Details', active: true },
    ]);
    await page.setContent(`<ui-breadcrumb items='${items}'></ui-breadcrumb>`);

    const element = await page.find('ui-breadcrumb');
    const shadowRoot = element.shadowRoot;
    const breadcrumbItems = shadowRoot.querySelectorAll('.breadcrumb-item');
    
    expect(breadcrumbItems.length).toBe(3);
  });

  it('renders with custom separator', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-breadcrumb separator=">"></ui-breadcrumb>');

    const element = await page.find('ui-breadcrumb');
    expect(element).toBeDefined();
  });

  it('renders home icon when showHome is true', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([{ label: 'Page', active: true }]);
    await page.setContent(`<ui-breadcrumb items='${items}' show-home="true"></ui-breadcrumb>`);

    const element = await page.find('ui-breadcrumb');
    const shadowRoot = element.shadowRoot;
    const homeItem = shadowRoot.querySelector('.breadcrumb-item.home');
    
    expect(homeItem).toBeDefined();
  });

  it('applies different sizes', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([{ label: 'Test' }]);
    await page.setContent(`<ui-breadcrumb items='${items}' size="lg"></ui-breadcrumb>`);

    const element = await page.find('ui-breadcrumb');
    const shadowRoot = element.shadowRoot;
    const breadcrumb = shadowRoot.querySelector('.breadcrumb');
    
    expect(breadcrumb).toHaveClass('breadcrumb-lg');
  });

  it('emits breadcrumbClick event', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
    ]);
    await page.setContent(`<ui-breadcrumb items='${items}'></ui-breadcrumb>`);

    const breadcrumbClick = await page.spyOnEvent('breadcrumbClick');
    
    // Click on the element shadow root item
    await page.$eval('ui-breadcrumb', (elm: any) => {
      const item = elm.shadowRoot.querySelector('.breadcrumb-item');
      if (item) item.click();
    });
    
    await page.waitForChanges();
    
    expect(breadcrumbClick).toHaveReceivedEvent();
  });
});
