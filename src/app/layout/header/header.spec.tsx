import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { defaultLayoutConfig } from "../../config/default-layout.config";
import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Header {...defaultLayoutConfig}/>
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
