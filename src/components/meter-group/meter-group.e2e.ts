import { newE2EPage } from '@stencil/core/testing';

describe('ui-meter-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-meter-group></ui-meter-group>');
    const element = await page.find('ui-meter-group');
    expect(element).not.toBeNull();
  });

  it('displays multiple meters', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-meter-group></ui-meter-group>');
    
    await page.$eval('ui-meter-group', (elm: any) => {
      elm.meters = [
        { label: 'Meter 1', value: 30, max: 100 },
        { label: 'Meter 2', value: 70, max: 100 }
      ];
    });
    
    await page.waitForChanges();
    const meterGroup = await page.find('ui-meter-group');
    expect(meterGroup).not.toBeNull();
  });

  it('supports different orientations', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-meter-group orientation="vertical"></ui-meter-group>');
    const meterGroup = await page.find('ui-meter-group');
    expect(meterGroup.getAttribute('orientation')).toBe('vertical');
  });
});
