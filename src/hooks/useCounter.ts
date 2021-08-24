import { useCallback, useRef } from 'react';

export interface Counter {
  label: string;
  count: number;
}

export const useCounter = (label: string) => {
  const countersRef = useRef<Counter[]>([]);
  if (!countersRef.current.some((c) => c.label === label)) {
    countersRef.current.push({ label, count: 0 });
  }

  const counter = countersRef.current.find((c) => c.label === label);
  const next = useCallback(() => {
    if (!counter) {
      return 0;
    }

    return ++counter.count;
  }, [counter]);

  return {
    counter,
    next,
  };
};
