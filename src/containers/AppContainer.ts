import { useState, useCallback } from 'preact/hooks';
import { createContainer } from 'unstated-next';
import { Support } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';

export type AppContainerType = {
  word?: string;
  supportsData: SupportsData;
  handleSetWord: (w?: AppContainerType['word']) => void;
  handleSetSupports: (supports?: Support[] | null) => void;
  fetchSupports: (url: string) => void;
};

type SupportsData = {
  response: AxiosResponse<Support[]> | null;
  error: AxiosError | null;
  isLoading: boolean;
};

const initialSupportState: SupportsData = {
  response: null,
  error: null,
  isLoading: false,
};

const useAppContainer = (): AppContainerType => {
  const [word, setWord] = useState('');
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  );

  const handleSetWord = useCallback((w?: string): void => setWord(w), []);

  const handleSetSupports = useCallback((supports?: Support[] | null): void => {
    setSupportsData({
      ...supportsData,
      response: { ...supportsData.response, data: supports },
    });
  }, []);

  const fetchSupports = useCallback(async (url: string): Promise<void> => {
    setSupportsData({ ...supportsData, isLoading: true });
    try {
      const res: AxiosResponse<Support[]> = await axios.get(url);
      setSupportsData(prevState => ({ ...prevState, response: res }));
      return Promise.resolve();
    } catch (err) {
      setSupportsData(prevState => ({ ...prevState, error: err }));
      return Promise.reject();
    } finally {
      setSupportsData(prevState => ({ ...prevState, isLoading: false }));
    }
  }, []);

  return {
    word,
    supportsData,
    handleSetWord,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
