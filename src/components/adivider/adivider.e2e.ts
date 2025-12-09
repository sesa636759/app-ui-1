import { newE2EPage } from '@stencil/core/testing';

describe('a-divider', () => {
  it('renders a single line for solid variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-divider variant="solid"></a-divider>');
    await page.waitForChanges();
    const lines = await page.findAll('a-divider >>> .adivider-line');
    expect(lines.length).toBe(1);
  });

  it('renders double lines for double variant', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-divider variant="double-solid"></a-divider>');
    await page.waitForChanges();
    const lines = await page.findAll('a-divider >>> .adivider-line');
    expect(lines.length).toBe(2);
  });

  it('renders double dashed lines', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-divider variant="double-dashed"></a-divider>');
    await page.waitForChanges();
    const lines = await page.findAll('a-divider >>> .adivider-line');
    expect(lines.length).toBe(2);
  });

  it('renders double dotted lines', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-divider variant="double-dotted"></a-divider>');
    await page.waitForChanges();
    const lines = await page.findAll('a-divider >>> .adivider-line');
    expect(lines.length).toBe(2);
  });

  it('renders text in the center', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-divider text="Hello" text-align="center"></a-divider>');
    await page.waitForChanges();
    const text = await page.find('a-divider >>> .adivider-text');
    expect(text).not.toBeNull();
    expect(text.textContent).toBe('Hello');
  });

  it('renders vertical orientation', async () => {
    const page = await newE2EPage();
    await page.setContent('<a-divider orientation="vertical"></a-divider>');
    await page.waitForChanges();
    const divider = await page.find('a-divider');
    const orientationProp = await divider.getProperty('orientation');
    expect(orientationProp).toBe('vertical');
  });
});
