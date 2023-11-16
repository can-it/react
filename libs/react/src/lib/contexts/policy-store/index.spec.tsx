
import { render, screen } from '@testing-library/react';
import { PolicyStore, usePolicyState } from '.';

function Consumer() {
  const { policy } = usePolicyState();
  return (<p data-id='policy'>{ policy?.allow.length }</p>);
}

describe('Context', () => {
  beforeEach(() => {
    render(
      <PolicyStore policy={{ allow: [] }}><Consumer></Consumer></PolicyStore>
    )
  });
  it('should', () => {
    expect(screen.getByText('0')).toBeTruthy();
  })
});
