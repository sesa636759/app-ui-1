import { newE2EPage } from '@stencil/core/testing';
import './anchor';

describe('ui-anchor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-anchor></ui-anchor>');

    const element = await page.find('ui-anchor');
    expect(element).toHaveClass('hydrated');
  });

  it('renders anchor links from JSON', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-anchor></ui-anchor>');

    const component = await page.find('ui-anchor');
    component.setProperty('links', JSON.stringify([
      { id: '1', label: 'Section 1', target: 'section1' },
      { id: '2', label: 'Section 2', target: 'section2' }
    ]));
    await page.waitForChanges();

    const links = await page.findAll('ui-anchor >>> .anchor-link');
    expect(links.length).toBe(2);
  });

  it('applies vertical orientation class', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-anchor orientation="vertical"></ui-anchor>');

    const container = await page.find('ui-anchor >>> .anchor-container');
    expect(container).toHaveClass('anchor-vertical');
  });

  it('applies horizontal orientation class', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-anchor orientation="horizontal"></ui-anchor>');

    const container = await page.find('ui-anchor >>> .anchor-container');
    expect(container).toHaveClass('anchor-horizontal');
  });

  it('shows indicator when showIndicator is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-anchor show-indicator="true"></ui-anchor>');

    const indicator = await page.find('ui-anchor >>> .anchor-indicator');
    expect(indicator).toBeTruthy();
  });

  it('emits anchorClick event when link is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div id="section1">Section 1</div>
      <ui-anchor></ui-anchor>
    `);

    const component = await page.find('ui-anchor');
    const clickSpy = await component.spyOnEvent('anchorClick');

    component.setProperty('links', JSON.stringify([
      { id: 'link1', label: 'Section 1', target: 'section1' }
    ]));
    await page.waitForChanges();

    const link = await page.find('ui-anchor >>> .anchor-link');
    await link.click();

    expect(clickSpy).toHaveReceivedEventTimes(1);
  });
});
