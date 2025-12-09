import { newSpecPage } from '@stencil/core/testing';
import { Snackbar } from './snackbar';

describe('snackbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Snackbar],
      html: `<ui-snackbar></ui-snackbar>`,
    });
    expect(page.root).toBeTruthy();
    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('adds and displays a snackbar', async () => {
    const page = await newSpecPage({
      components: [Snackbar],
      html: `<ui-snackbar></ui-snackbar>`,
    });

    const component = page.rootInstance as Snackbar;
    const id = await component.add({
      type: 'success',
      message: 'Test message',
    });

    await page.waitForChanges();

    expect(id).toBeDefined();
    expect(component.snackbars.length).toBe(1);
  });

  it('closes a snackbar', async () => {
    const page = await newSpecPage({
      components: [Snackbar],
      html: `<ui-snackbar></ui-snackbar>`,
    });

    const component = page.rootInstance as Snackbar;
    const id = await component.add({
      type: 'success',
      message: 'Test message',
    });

    await page.waitForChanges();
    expect(component.snackbars.length).toBe(1);

    await component.close(id);
    await page.waitForChanges();

    expect(component.snackbars.length).toBe(0);
  });
});