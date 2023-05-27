import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { defaultLayoutConfig } from '../config/default-layout.config';
import DefaultLayout from './default-layout';

describe('DefaultLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <DefaultLayout layoutProps={defaultLayoutConfig} />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
