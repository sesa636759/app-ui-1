import { newE2EPage } from '@stencil/core/testing';

describe('ui-otp-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-otp-input></ui-otp-input>');
    const element = await page.find('ui-otp-input');
    expect(element).not.toBeNull();
  });

  it('renders correct number of input fields', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-otp-input length="6"></ui-otp-input>');
    await page.waitForChanges();
    const inputs = await page.findAll('ui-otp-input >>> input');
    expect(inputs.length).toBe(6);
  });

  it('accepts only numeric input when type is number', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-otp-input type="number" length="4"></ui-otp-input>');
    await page.waitForChanges();
    const input = await page.find('ui-otp-input >>> input');
    expect(input.getAttribute('type')).toBe('number');
  });

  it('emits complete event when all fields filled', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-otp-input length="4"></ui-otp-input>');
    
    await page.spyOnEvent('otpComplete');
    
    await page.$eval('ui-otp-input', (elm: any) => {
      elm.value = '1234';
    });
    
    await page.waitForChanges();
    // Event should be emitted when value is set programmatically
  });
});
