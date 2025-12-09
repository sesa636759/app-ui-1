import { newE2EPage } from '@stencil/core/testing';

describe('ui-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-avatar></ui-avatar>');
    const element = await page.find('ui-avatar');
    expect(element).not.toBeNull();
  });

  it('displays initials when no image provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-avatar content="JD"></ui-avatar>');
    await page.waitForChanges();
    const avatar = await page.find('ui-avatar >>> .avatar-content');
    expect(avatar).not.toBeNull();
    if (avatar) {
      expect(avatar.textContent.trim()).toBe('J');
    }
  });

  it('displays image when src provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-avatar src="https://example.com/avatar.jpg"></ui-avatar>');
    const img = await page.find('ui-avatar >>> img');
    expect(img).not.toBeNull();
  });

  it('supports different sizes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-avatar size="lg"></ui-avatar>');
    const avatar = await page.find('ui-avatar');
    expect(avatar.getAttribute('size')).toBe('lg');
  });
});
