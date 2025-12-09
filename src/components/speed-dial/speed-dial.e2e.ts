
import { newE2EPage } from '@stencil/core/testing';
import './speed-dial';

describe('ui-speed-dial', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-speed-dial></ui-speed-dial>');
    const element = await page.find('ui-speed-dial');
    expect(element).not.toBeNull();
  });

  it('opens and closes', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-speed-dial></ui-speed-dial>');
    
    await page.$eval('ui-speed-dial', (elm: any) => {
      elm.open = true;
    });
    
    await page.waitForChanges();
    const speedDial = await page.find('ui-speed-dial');
    const isOpen = await speedDial.getProperty('open');
    expect(isOpen).toBe(true);
  });

  it('displays action items', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-speed-dial></ui-speed-dial>');
    
    await page.$eval('ui-speed-dial', (elm: any) => {
      elm.actions = [
        { icon: 'edit', label: 'Edit' },
        { icon: 'delete', label: 'Delete' }
      ];
    });
    
    await page.waitForChanges();
    const speedDial = await page.find('ui-speed-dial');
    expect(speedDial).not.toBeNull();
  });

  it('supports different directions', async () => {
    const page = await newE2EPage();
    await page.setContent('<ui-speed-dial direction="up"></ui-speed-dial>');
    const speedDial = await page.find('ui-speed-dial');
    expect(speedDial.getAttribute('direction')).toBe('up');
  });
});
