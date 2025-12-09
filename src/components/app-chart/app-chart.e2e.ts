import { newE2EPage } from '@stencil/core/testing';
import './app-chart';

describe('app-chart', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-chart></app-chart>');

    const element = await page.find('app-chart');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with data', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <app-chart
        chart-type="line"
        data='{"labels": ["Jan", "Feb"], "datasets": [{"data": [1, 2]}]}'
      ></app-chart>
    `);

    const element = await page.find('app-chart');
    expect(element).toHaveClass('hydrated');

    // Check if canvas is created
    const canvas = await page.find('app-chart >>> canvas');
    expect(canvas).not.toBeNull();
  });

  it('updates when props change', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-chart chart-type="bar"></app-chart>');

    const element = await page.find('app-chart');
    element.setProperty('chartType', 'pie');
    await page.waitForChanges();

    expect(element.getAttribute('chart-type')).toBe('pie');
  });
});
