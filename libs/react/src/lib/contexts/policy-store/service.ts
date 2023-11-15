import { PolicyState } from '@can-it/types';
import { useContext } from 'react';
import { PolicyDispatchContext, PolicyStateContext, PolicyResolver } from './context';

function usePolicyDispatch() {
  return useContext(PolicyDispatchContext)!;
}

const set = () => (policy: PolicyState) => {
  const dispatch = usePolicyDispatch()
  dispatch({ type: 'set', payload: { policy } })
}

const update = () => (stateResolver: PolicyResolver) => {
  const dispatch = usePolicyDispatch()
  dispatch({ type: 'update', payload: stateResolver })
}

export function usePolicyState() {
  return useContext(PolicyStateContext);
}

export const setPolicy = (policy: PolicyState) => set()(policy);

export const updatePolicy = (policyResolver: PolicyResolver) => update()(policyResolver);
