import { newE2EPage } from '@stencil/core/testing';

describe('snackbar', () => {
  it('should render snackbar component', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-snackbar></ui-snackbar>');

    const element = await page.find('ui-snackbar');
    expect(element).not.toBeNull();
  });

  it('should add and display a snackbar', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-snackbar></ui-snackbar>');

    const element = await page.find('ui-snackbar');
    await element.callMethod('add', {
      type: 'success',
      message: 'Test message',
    });

    await page.waitForChanges();

    const snackbarItem = await page.find('ui-snackbar >>> .snackbar-item');
    expect(snackbarItem).not.toBeNull();

    const message = await page.find('ui-snackbar >>> .snackbar-message');
    expect(message.textContent).toBe('Test message');
  });

  it('should close snackbar when close button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-snackbar></ui-snackbar>');

    const element = await page.find('ui-snackbar');
    await element.callMethod('add', {
      type: 'success',
      message: 'Test message',
    });

    await page.waitForChanges();

    let snackbarItem = await page.find('ui-snackbar >>> .snackbar-item');
    expect(snackbarItem).not.toBeNull();

    const closeButton = await page.find('ui-snackbar >>> .snackbar-close');
    await closeButton.click();

    await page.waitForChanges();

    snackbarItem = await page.find('ui-snackbar >>> .snackbar-item');
    expect(snackbarItem).toBeNull();
  });
});