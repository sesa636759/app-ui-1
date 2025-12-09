import { newSpecPage } from '@stencil/core/testing';
import { Timeline } from './timeline';
import axe from 'axe-core';

describe('ui-timeline accessibility', () => {
  it('should have no axe violations', async () => {
    const page = await newSpecPage({
      components: [Timeline],
      html: `<ui-timeline events='[{"label":"Event 1"},{"label":"Event 2"}]'></ui-timeline>`
    });
    const results = await axe.run(page.root);
    expect(results.violations.length).toBe(0);
  });
});
