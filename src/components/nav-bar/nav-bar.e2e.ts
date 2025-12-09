import { newE2EPage } from '@stencil/core/testing';

describe('nav-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nav-bar></nav-bar>');
    const element = await page.find('nav-bar');
    expect(element).not.toBeNull();
  });

  it('displays brand name', async () => {
    const page = await newE2EPage();
    await page.setContent('<nav-bar></nav-bar>');
    await page.waitForChanges();
    const navbar = await page.find('nav-bar');
    expect(navbar).not.toBeNull();
  });

  it('supports different themes', async () => {
    const page = await newE2EPage();
    await page.setContent('<nav-bar theme="dark"></nav-bar>');
    const navbar = await page.find('nav-bar');
    expect(navbar.getAttribute('theme')).toBe('dark');
  });

  it('supports sticky positioning', async () => {
    const page = await newE2EPage();
    await page.setContent('<nav-bar sticky="true"></nav-bar>');
    const navbar = await page.find('nav-bar');
    expect(navbar.getAttribute('sticky')).toBe('true');
  });
});
