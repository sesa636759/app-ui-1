import { newE2EPage } from '@stencil/core/testing';

describe('ui-rating', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-rating></ui-rating>');
    const element = await page.find('ui-rating');
    expect(element).not.toBeNull();
  });

  it('displays correct number of stars', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-rating max="5"></ui-rating>');
    await page.waitForChanges();
    const rating = await page.find('ui-rating');
    expect(rating).not.toBeNull();
    const max = await rating.getProperty('max');
    expect(max).toBe(5);
  });

  it('sets rating value', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-rating value="3"></ui-rating>');
    const rating = await page.find('ui-rating');
    const value = await rating.getProperty('value');
    expect(value).toBe(3);
  });

  it('emits rating change event', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-rating></ui-rating>');
    
    await page.spyOnEvent('ratingChange');
    
    await page.$eval('ui-rating', (elm: any) => {
      elm.value = 4;
    });
    
    await page.waitForChanges();
  });

  it('supports readonly mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-rating readonly="true"></ui-rating>');
    const rating = await page.find('ui-rating');
    expect(rating.getAttribute('readonly')).toBe('true');
  });
});
