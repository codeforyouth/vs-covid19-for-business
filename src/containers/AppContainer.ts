import { useState, useCallback } from 'preact/hooks';
import { createContainer } from 'unstated-next';

export type AppContainerType = {
  word?: string;
  handleSetWord: (w?: AppContainerType['word']) => void;
};

const useAppContainer = (): AppContainerType => {
  const [word, setWord] = useState('');
  const handleSetWord = useCallback((w?: string): void => setWord(w), []);
  return { word, handleSetWord };
};

export const AppContainer = createContainer(useAppContainer);
