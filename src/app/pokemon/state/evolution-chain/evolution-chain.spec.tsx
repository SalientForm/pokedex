import { render } from '@testing-library/react';

import EvolutionChainNodeTree from './evolution-chain-node-tree';

describe('EvolutionChain', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EvolutionChainNodeTree />);
    expect(baseElement).toBeTruthy();
  });
});
