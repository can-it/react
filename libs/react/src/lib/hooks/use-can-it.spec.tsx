import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CanItProvider } from '../contexts/can-it';
import { useCanIt } from './use-can-it';
import { Request } from '@can-it/types';

describe('< CanIt />', () => {
  function SampleComponent(props: { allowTo: Request }) {
    const isAllowed = useCanIt(...props.allowTo);

    return isAllowed ? 'can' : 'not-authorized';
  }

  beforeEach(() => {
    render(<CanItProvider policy={{ allow: [['view', 'docs']]}}>
      <div data-testid="can">
        <SampleComponent allowTo={['view', 'docs']}></SampleComponent>
      </div>
      <div data-testid="not">
        <SampleComponent allowTo={['edit', 'docs']}></SampleComponent>
      </div>
    </CanItProvider>);
  });

  it('should show "can" element if allowing', () => {
    expect(screen.getByTestId('can')).toHaveTextContent('can');
  });

  it('should show "not" element else if not allow', () => {
    expect(screen.getByTestId('not')).toHaveTextContent('not-authorized');
  });
});
