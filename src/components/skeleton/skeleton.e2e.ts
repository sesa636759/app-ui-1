import { newE2EPage } from '@stencil/core/testing';
import './skeleton-loader';

describe('skeleton-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<skeleton-loader></skeleton-loader>');
    const element = await page.find('skeleton-loader');
    expect(element).not.toBeNull();
  });

  it('supports different types', async () => {
    const page = await newE2EPage();
    await page.setContent('<skeleton-loader type="circle"></skeleton-loader>');
    const skeleton = await page.find('skeleton-loader');
    expect(skeleton.getAttribute('type')).toBe('circle');
  });

  it('supports custom width and height', async () => {
    const page = await newE2EPage();
    await page.setContent('<skeleton-loader width="200px" height="100px"></skeleton-loader>');
    const skeleton = await page.find('skeleton-loader');
    expect(skeleton.getAttribute('width')).toBe('200px');
    expect(skeleton.getAttribute('height')).toBe('100px');
  });

  it('supports animation', async () => {
    const page = await newE2EPage();
    await page.setContent('<skeleton-loader animation="wave"></skeleton-loader>');
    const skeleton = await page.find('skeleton-loader');
    expect(skeleton.getAttribute('animation')).toBe('wave');
  });
});
