import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useReducer
} from 'react';

import { PolicyState } from '@can-it/types';
import { Action } from '../models';

type ActionType = 'set' | 'update';
interface State {
  policy?: PolicyState
}

export type PolicyResolver = (prePolicy?: PolicyState) => PolicyState;

type PolicyAction<T = State | PolicyResolver> = Action<ActionType, T>;

export const PolicyStateContext = createContext<State>({});

export const PolicyDispatchContext = createContext<Dispatch<PolicyAction> | undefined>(undefined);

const policyReducer: Reducer<State, PolicyAction> = (state: State, action: PolicyAction) => {
  switch (action.type) {
    case 'set':
      return { ...state, policy: (action.payload as State).policy };

    case 'update':
      return { ...state, policy: (action.payload as PolicyResolver)(state.policy)};

    default:
      return state;
  }
};

export function PolicyStore({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<Reducer<State, PolicyAction>>(policyReducer, {});

  return (<PolicyStateContext.Provider value={state}>
    <PolicyDispatchContext.Provider value={dispatch}>
      {children}
    </PolicyDispatchContext.Provider>
  </PolicyStateContext.Provider>);
}
