import { newSpecPage } from '@stencil/core/testing';
import { SkeletonLoader } from './skeleton-loader';

describe('skeleton-loader', () => {
  it('renders with default properties', async () => {
    const page = await newSpecPage({
      components: [SkeletonLoader],
      html: '<skeleton-loader></skeleton-loader>',
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders circle shape', async () => {
    const page = await newSpecPage({
      components: [SkeletonLoader],
      html: '<skeleton-loader shape="circle" width="50px" height="50px"></skeleton-loader>',
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders with different sizes', async () => {
    const page = await newSpecPage({
      components: [SkeletonLoader],
      html: '<skeleton-loader size="lg"></skeleton-loader>',
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders avatar with size', async () => {
    const page = await newSpecPage({
      components: [SkeletonLoader],
      html: '<skeleton-loader shape="avatar" size="lg"></skeleton-loader>',
    });

    expect(page.root).toMatchSnapshot();
  });
});