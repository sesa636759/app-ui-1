import { newE2EPage } from '@stencil/core/testing';

describe('ui-avatar-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-avatar-group></ui-avatar-group>');
    const element = await page.find('ui-avatar-group');
    expect(element).not.toBeNull();
  });

  it('displays multiple avatars', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <ui-avatar-group>
        <ui-avatar name="John Doe"></ui-avatar>
        <ui-avatar name="Jane Smith"></ui-avatar>
        <ui-avatar name="Bob Johnson"></ui-avatar>
      </ui-avatar-group>
    `);
    const avatars = await page.findAll('ui-avatar');
    expect(avatars.length).toBe(3);
  });

  it('supports max count', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-avatar-group max="2"></ui-avatar-group>');
    const group = await page.find('ui-avatar-group');
    expect(group.getAttribute('max')).toBe('2');
  });
});
