import { useEffect, useState } from 'preact/hooks';

export const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    let tmpPosition = 0;
    let isPending = false;
    const handleScroll = (): void => {
      tmpPosition = window.scrollY;
      if (!isPending) {
        window.requestAnimationFrame(() => {
          setScrollPosition(tmpPosition);
          isPending = false;
        });
        isPending = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return scrollPosition;
};
