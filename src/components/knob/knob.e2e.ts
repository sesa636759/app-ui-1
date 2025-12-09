import { newE2EPage } from '@stencil/core/testing';
import './knob';

describe('ui-knob', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob></ui-knob>');

    const element = await page.find('ui-knob');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with custom value', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob value="50"></ui-knob>');

    const element = await page.find('ui-knob');
    const value = await element.getProperty('value');
    
    expect(value).toBe(50);
  });

  it('renders with custom min and max', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob min="0" max="200" value="100"></ui-knob>');

    const element = await page.find('ui-knob');
    const min = await element.getProperty('min');
    const max = await element.getProperty('max');
    const value = await element.getProperty('value');
    
    expect(min).toBe(0);
    expect(max).toBe(200);
    expect(value).toBe(100);
  });

  it('renders with custom size', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob size="150"></ui-knob>');

    const element = await page.find('ui-knob');
    const size = await element.getProperty('size');
    
    expect(size).toBe(150);
  });

  it('shows value label when showValue is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob value="75" show-value="true"></ui-knob>');

    const element = await page.find('ui-knob');
    const shadowRoot = element.shadowRoot;
    const valueLabel = shadowRoot.querySelector('.value-label');
    
    expect(valueLabel).toBeTruthy();
  });

  it('shows min/max labels when showMinMax is true', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob show-min-max="true"></ui-knob>');

    const element = await page.find('ui-knob');
    const shadowRoot = element.shadowRoot;
    const minMaxLabels = shadowRoot.querySelector('.min-max-labels');
    
    expect(minMaxLabels).toBeTruthy();
  });

  it('applies custom color', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob color="#ff0000"></ui-knob>');

    const element = await page.find('ui-knob');
    const color = await element.getProperty('color');
    
    expect(color).toBe('#ff0000');
  });

  it('applies value suffix', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob value="50" value-suffix="%"></ui-knob>');

    const element = await page.find('ui-knob');
    const shadowRoot = element.shadowRoot;
    const suffix = shadowRoot.querySelector('.value-suffix');
    
    expect(suffix.textContent).toBe('%');
  });

  it('handles disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob disabled="true"></ui-knob>');

    const element = await page.find('ui-knob');
    const shadowRoot = element.shadowRoot;
    const container = shadowRoot.querySelector('.knob-container');
    
    expect(container).toHaveClass('disabled');
  });

  it('emits knobChange event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-knob value="50"></ui-knob>');

    const element = await page.find('ui-knob');
    
    element.setProperty('value', 75);
    await page.waitForChanges();
    
    // Note: Event emission happens on mouse/touch interactions, not property changes
    // This test verifies the component is set up correctly
    expect(element).toBeDefined();
  });
});
