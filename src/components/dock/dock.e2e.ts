import { newE2EPage } from '@stencil/core/testing';
import './dock';

describe('ui-dock', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock></ui-dock>');

    const element = await page.find('ui-dock');
    expect(element).toHaveClass('hydrated');
  });

  it('renders dock items from JSON', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock></ui-dock>');

    const component = await page.find('ui-dock');
    component.setProperty('items', JSON.stringify([
      { id: '1', label: 'Home', icon: '🏠' },
      { id: '2', label: 'Search', icon: '🔍' },
      { id: '3', label: 'Profile', icon: '👤' }
    ]));
    await page.waitForChanges();

    const items = await page.findAll('ui-dock >>> .dock-item');
    expect(items.length).toBe(3);
  });

  it('applies position classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock position="top"></ui-dock>');

    const container = await page.find('ui-dock >>> .dock-container');
    expect(container).toHaveClass('dock-top');
  });

  it('applies size classes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock size="lg"></ui-dock>');

    const container = await page.find('ui-dock >>> .dock-container');
    expect(container).toHaveClass('dock-lg');
  });

  it('emits dockItemClick event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock></ui-dock>');

    const component = await page.find('ui-dock');
    const clickSpy = await component.spyOnEvent('dockItemClick');

    component.setProperty('items', JSON.stringify([
      { id: 'home', label: 'Home', icon: '🏠' }
    ]));
    await page.waitForChanges();

    const item = await page.find('ui-dock >>> .dock-item');
    await item.click();

    expect(clickSpy).toHaveReceivedEventDetail({
      itemId: 'home',
      item: { id: 'home', label: 'Home', icon: '🏠' }
    });
  });

  it('shows labels when showLabels is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock show-labels="true"></ui-dock>');

    const component = await page.find('ui-dock');
    component.setProperty('items', JSON.stringify([
      { id: '1', label: 'Home', icon: '🏠' }
    ]));
    await page.waitForChanges();

    const label = await page.find('ui-dock >>> .dock-item-label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe('Home');
  });

  it('applies blur effect when blurEffect is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock blur-effect="true"></ui-dock>');

    const container = await page.find('ui-dock >>> .dock-container');
    expect(container).toHaveClass('dock-blur');
  });

  it('renders badge when item has badge', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-dock></ui-dock>');

    const component = await page.find('ui-dock');
    component.setProperty('items', JSON.stringify([
      { id: '1', label: 'Messages', icon: '💬', badge: 5 }
    ]));
    await page.waitForChanges();

    const badge = await page.find('ui-dock >>> .dock-item-badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toBe('5');
  });
});
