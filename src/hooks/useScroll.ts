import { useEffect, useState, useCallback } from 'preact/hooks';

type ReturnType = {
  scrollPosition: number;
  scrollToTop: () => void;
};
export const useScroll = (): ReturnType => {
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
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return {
    scrollPosition,
    scrollToTop,
  };
};
