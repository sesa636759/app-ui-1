import { newE2EPage } from '@stencil/core/testing';
import './popover';
import './popover';

describe('ui-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-popover><button>Trigger</button></ui-popover>');

    const element = await page.find('ui-popover');
    expect(element).toHaveClass('hydrated');
  });

  it('shows popover on click when trigger is click', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-popover trigger="click" content="Test content">
        <button>Click me</button>
      </ui-popover>
    `);

    const trigger = await page.find('button');
    await trigger.click();
    await page.waitForChanges();

    const popover = await page.find('ui-popover >>> .popover');
    expect(popover).toHaveClass('popover-visible');
  });

  it('applies correct placement class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-popover placement="bottom" content="Test">
        <button>Trigger</button>
      </ui-popover>
    `);

    const component = await page.find('ui-popover');
    await component.callMethod('show');
    await page.waitForChanges();

    const popover = await page.find('ui-popover >>> .popover');
    expect(popover).toHaveClass('popover-bottom');
  });

  it('renders heading when provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-popover heading="Test Heading" content="Test content">
        <button>Trigger</button>
      </ui-popover>
    `);

    const component = await page.find('ui-popover');
    await component.callMethod('show');
    await page.waitForChanges();

    const heading = await page.find('ui-popover >>> .popover-title');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe('Test Heading');
  });

  it('shows arrow when showArrow is true', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-popover show-arrow="true" content="Test">
        <button>Trigger</button>
      </ui-popover>
    `);

    const component = await page.find('ui-popover');
    await component.callMethod('show');
    await page.waitForChanges();

    const arrow = await page.find('ui-popover >>> .popover-arrow');
    expect(arrow).toBeTruthy();
  });
});
