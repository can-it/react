import {
  Dispatch,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer
} from 'react';

import { Comparator, PolicyState } from '@can-it/types';
import { Action } from '../models';

type ActionType = 'set' | 'update';
interface State {
  policy?: PolicyState,
  comparators?: {
    ri?: Comparator;
    action?: Comparator;
  }
}

export type PolicyResolver = (prePolicy?: PolicyState) => PolicyState | undefined;

type PolicyAction<T = State | PolicyResolver> = Action<ActionType, T>;

const PolicyStateContext = createContext<State>({});

const PolicyDispatchContext = createContext<Dispatch<PolicyAction> | undefined>(undefined);

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

interface PolicyStoreProps extends State {
  children: ReactNode;
}

export function PolicyStore({ children, policy, comparators }: PolicyStoreProps) {
  const [state, dispatch] = useReducer<Reducer<State, PolicyAction>>(policyReducer, { policy, comparators });

  return (<PolicyStateContext.Provider value={state}>
    <PolicyDispatchContext.Provider value={dispatch}>
      {children}
    </PolicyDispatchContext.Provider>
  </PolicyStateContext.Provider>);
}

export function usePolicyState() {
  const { policy } = useContext(PolicyStateContext);

  return { policy };
}

export function usePolicyDispatch() {
  const dispatch = useContext(PolicyDispatchContext);

  if (!dispatch) {
    throw new Error('You can only use this usePolicyStore inside PolicyStore children');
  }

  return {
    set: (policy?: PolicyState) => dispatch({ type: 'set', payload: { policy } }),
    update: (stateResolver: PolicyResolver) => dispatch({ type: 'update', payload: stateResolver })
  };
}
