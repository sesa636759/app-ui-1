import { newE2EPage } from '@stencil/core/testing';

describe('ui-horizontal-nav', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-horizontal-nav></ui-horizontal-nav>');

    const element = await page.find('ui-horizontal-nav');
    expect(element).toHaveClass('hydrated');
  });

  it('renders items from JSON string', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([
      { id: '1', label: 'Home', active: true },
      { id: '2', label: 'About' },
      { id: '3', label: 'Contact' },
    ]);
    await page.setContent(`<ui-horizontal-nav items='${items}'></ui-horizontal-nav>`);

    const element = await page.find('ui-horizontal-nav');
    const shadowRoot = element.shadowRoot;
    const navItems = shadowRoot.querySelectorAll('.nav-item');
    
    expect(navItems.length).toBe(3);
  });

  it('applies different variants', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([{ id: '1', label: 'Test' }]);
    await page.setContent(`<ui-horizontal-nav items='${items}' variant="pills"></ui-horizontal-nav>`);

    const element = await page.find('ui-horizontal-nav');
    const shadowRoot = element.shadowRoot;
    const nav = shadowRoot.querySelector('.horizontal-nav');
    
    expect(nav).toHaveClass('variant-pills');
  });

  it('applies different sizes', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([{ id: '1', label: 'Test' }]);
    await page.setContent(`<ui-horizontal-nav items='${items}' size="lg"></ui-horizontal-nav>`);

    const element = await page.find('ui-horizontal-nav');
    const shadowRoot = element.shadowRoot;
    const nav = shadowRoot.querySelector('.horizontal-nav');
    
    expect(nav).toHaveClass('size-lg');
  });

  it('applies alignment', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([{ id: '1', label: 'Test' }]);
    await page.setContent(`<ui-horizontal-nav items='${items}' align="center"></ui-horizontal-nav>`);

    const element = await page.find('ui-horizontal-nav');
    const shadowRoot = element.shadowRoot;
    const nav = shadowRoot.querySelector('.horizontal-nav');
    
    expect(nav).toHaveClass('align-center');
  });

  it('emits navItemClick event', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([
      { id: '1', label: 'Home' },
      { id: '2', label: 'About' },
    ]);
    await page.setContent(`<ui-horizontal-nav items='${items}'></ui-horizontal-nav>`);

    const navItemClick = await page.spyOnEvent('navItemClick');
    
    // Click on the element shadow root item
    await page.$eval('ui-horizontal-nav', (elm: any) => {
      const item = elm.shadowRoot.querySelector('.nav-item');
      if (item) item.click();
    });
    
    await page.waitForChanges();
    
    expect(navItemClick).toHaveReceivedEvent();
  });

  it('shows scroll buttons when scrollable', async () => {
    const page = await newE2EPage();
    const items = JSON.stringify([
      { id: '1', label: 'Item 1' },
      { id: '2', label: 'Item 2' },
      { id: '3', label: 'Item 3' },
    ]);
    await page.setContent(`<ui-horizontal-nav items='${items}' scrollable="true"></ui-horizontal-nav>`);

    const element = await page.find('ui-horizontal-nav');
    const shadowRoot = element.shadowRoot;
    const container = shadowRoot.querySelector('.horizontal-nav-container');
    
    expect(container).toHaveClass('scrollable');
  });
});
