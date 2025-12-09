import { newSpecPage } from '@stencil/core/testing';
import { Timer } from './timer';
import axe from 'axe-core';

describe('ui-timer accessibility', () => {
  it('should have no axe violations', async () => {
    const page = await newSpecPage({
      components: [Timer],
      html: `<ui-timer steps='[{"label":"Step 1"},{"label":"Step 2"}]'></ui-timer>`
    });
    const results = await axe.run(page.root);
    expect(results.violations.length).toBe(0);
  });
});
