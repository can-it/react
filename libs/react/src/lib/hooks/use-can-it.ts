import { useEffect, useState } from 'react';
import { usePolicyState } from '../contexts/policy-store';
import { CanIt } from '@can-it/core';
import { Request } from '@can-it/types';

export function useCanIt(...request: Request) {
  const [can, setCan] = useState(false);
  const { policy } = usePolicyState();

  useEffect(() => {
    const canIt = new CanIt(policy || { allow: [] });
    setCan(canIt.allowTo(...request))
  }, [request, policy]);

  return can;
}
