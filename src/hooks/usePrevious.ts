import { useRef, useEffect } from 'preact/hooks';

export const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
