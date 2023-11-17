import { Request } from '@can-it/types';
import { ReactNode } from 'react';
import { useCanIt } from '../hooks/use-can-it';

interface CanItProps {
  request: Request,
  children: ReactNode,
  else?: ReactNode
}

export function CanIt(props: CanItProps) {
  const isAllowed = useCanIt(...props.request);

  if (isAllowed) {
    return props.children;
  }

  return props.else;
}
