import { useEffect, useState } from 'react';
import { usePolicyState } from '../contexts/policy-store';
import { CanIt } from '@can-it/core';
import { Request } from '@can-it/types';

export function useCanIt(...request: Request) {
  const [can, setCan] = useState(false);
  const { policy, comparators } = usePolicyState();

  useEffect(() => {
    const canIt = new CanIt(policy || { allow: [] }, comparators?.action, comparators?.ri);
    setCan(canIt.allowTo(...request))
  }, [request, policy, comparators]);

  return can;
}
