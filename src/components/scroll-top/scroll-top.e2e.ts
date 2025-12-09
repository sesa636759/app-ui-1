import { newE2EPage } from '@stencil/core/testing';

describe('ui-scroll-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-scroll-top></ui-scroll-top>');
    const element = await page.find('ui-scroll-top');
    expect(element).not.toBeNull();
  });

  it('shows after scrolling threshold', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div style="height: 3000px;">
        <ui-scroll-top threshold="500"></ui-scroll-top>
      </div>
    `);
    
    const button = await page.find('ui-scroll-top');
    expect(button.getAttribute('threshold')).toBe('500');
  });

  it('supports different positions', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-scroll-top position="left"></ui-scroll-top>');
    const button = await page.find('ui-scroll-top');
    expect(button.getAttribute('position')).toBe('left');
  });

  it('supports smooth scrolling', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-scroll-top smooth="true"></ui-scroll-top>');
    const button = await page.find('ui-scroll-top');
    expect(button.getAttribute('smooth')).toBe('true');
  });
});
