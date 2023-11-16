
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { PolicyResolver, PolicyStore, usePolicyDispatch, usePolicyState } from '.';
import { PolicyState } from '@can-it/types';

describe('Context', () => {
  describe('No required policy and comparators', () => {
    function Consumer() {
      const { policy } = usePolicyState();

      return !policy && 'policy:empty';
    }

    beforeEach(() => {
      render(
        <PolicyStore><Consumer></Consumer></PolicyStore>
      )
    });

    it('should have no policy', () => {
      expect(screen.getByText(/policy:empty/)).toBeTruthy();
    })

    it('should have no comparators', () => {
      expect(screen.getByText('comparators:empty')).toBeTruthy();
    })
  })

  describe('Pass policy', () => {
    const SET_POLICY: PolicyState = { allow: [] };
    function Consumer() {
      const { policy } = usePolicyState();
      const { set, update } = usePolicyDispatch();

      const addDeny: PolicyResolver = (pre?: PolicyState) => {
        if (!pre) {
          return { allow: [], deny: [['', '']] };
        }

        return { ...pre, deny: (pre.deny || []).concat(['', '']) };
      }

      return (<>
        <div>{ !policy && 'policy:empty' || 'policy:presence' }</div>
        <div data-testid="allow-count">{ policy?.allow.length }</div>
        <div data-testid="deny-count">{ policy?.deny }</div>
        <button data-testid="initial" onClick={() => set(SET_POLICY)}></button>
        <button data-testid="reset" onClick={() => set()}></button>
        <button data-testid="deny" onClick={() => update(addDeny) }></button>
      </>);
    }

    beforeEach(() => {
      render(
        <PolicyStore><Consumer></Consumer></PolicyStore>
      )
    });
    it('should have no policy', () => {
      expect(screen.getByText('policy:empty')).toBeTruthy();
    })

    it('should have no comparators', () => {
      expect(screen.getByText('comparators:empty')).toBeTruthy();
    })

    it('should able to set policy', () => {
      expect(screen.getByTestId('allow-count')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('initial'));
      expect(screen.getByTestId('allow-count')).toHaveTextContent('1');
    })

    it('should able to reset policy', () => {
      expect(screen.getByTestId('allow-count')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('initial'));
      expect(screen.getByTestId('allow-count')).toHaveTextContent('1');

      fireEvent.click(screen.getByTestId('reset'));
      expect(screen.getByTestId('allow-count')).toHaveTextContent('');
    })

    it('should able to update policy base on previous policy', () => {
      expect(screen.getByTestId('deny-count')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('deny'));
      expect(screen.getByTestId('deny-count')).toHaveTextContent('1');

      fireEvent.click(screen.getByTestId('deny'));
      expect(screen.getByTestId('deny-count')).toHaveTextContent('2');
    })
  })
});
