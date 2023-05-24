import { render } from '@testing-library/react';

import DefaultLayout from './default-layout';

describe('DefaultLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DefaultLayout />);
    expect(baseElement).toBeTruthy();
  });
});
