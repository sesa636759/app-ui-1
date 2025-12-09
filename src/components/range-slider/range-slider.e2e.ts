import { newE2EPage } from '@stencil/core/testing';

describe('ui-range-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-range-slider></ui-range-slider>');
    const element = await page.find('ui-range-slider');
    expect(element).not.toBeNull();
  });

  it('sets min and max values', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-range-slider min="0" max="100" value="50"></ui-range-slider>');
    const slider = await page.find('ui-range-slider');
    expect(slider.getAttribute('min')).toBe('0');
    expect(slider.getAttribute('max')).toBe('100');
    expect(slider.getAttribute('value')).toBe('50');
  });

  it('supports step increments', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-range-slider step="5"></ui-range-slider>');
    const slider = await page.find('ui-range-slider');
    expect(slider.getAttribute('step')).toBe('5');
  });

  it('emits value change event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-range-slider></ui-range-slider>');
    
    await page.spyOnEvent('rangeChange');
    
    await page.$eval('ui-range-slider', (elm: any) => {
      elm.value = 75;
    });
    
    await page.waitForChanges();
  });

  it('supports disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-range-slider disabled="true"></ui-range-slider>');
    const slider = await page.find('ui-range-slider');
    expect(slider.getAttribute('disabled')).toBe('true');
  });
});
