import { render } from '@testing-library/react';

import EvolutionChainView from './evolution-chain-view';

describe('EvolutionChain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EvolutionChainView />);
    expect(baseElement).toBeTruthy();
  });
});
