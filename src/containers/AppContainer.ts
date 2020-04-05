import { useState, useCallback, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Data } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { RouteProps } from '../App';
import { API_BASE_URL } from '../constants';

export type AppContainerType = {
  word?: string | null;
  supportsData: SupportsData;
  handleSetWord: (w?: string) => void;
  fetchSupports: (matches?: RouteProps['matches']) => void;
  handleSetSupports: (supports?: Data | null) => void;
};

type SupportsData = {
  response: AxiosResponse<Data> | null;
  error: AxiosError | null;
  status?: 'loading' | 'success' | 'fail';
};

const initialSupportState: SupportsData = {
  response: null,
  error: null,
  status: undefined,
};

const useAppContainer = (): AppContainerType => {
  const [word, setWord] = useState(null);
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  );

  const handleSetWord = useCallback((w?: string): void => setWord(w), []);
  const handleSetSupports = useCallback((data?: Data | null): void => {
    setSupportsData({
      ...supportsData,
      response: { ...supportsData.response, data },
    });
  }, []);

  const fetchSupports = useCallback(
    async (matches: RouteProps['matches']): Promise<void> => {
      setSupportsData({
        ...supportsData,
        status: 'loading',
      });
      let requestURL = API_BASE_URL;
      if (matches?.q) {
        requestURL = `${API_BASE_URL},${matches.q}`;
      }
      try {
        const res: AxiosResponse<Data | null> = await axios.get(requestURL);
        setSupportsData(prevState => ({
          ...prevState,
          response: res,
          status: 'success',
        }));
        return Promise.resolve();
      } catch (err) {
        setSupportsData(prevState => ({
          ...prevState,
          error: err,
          status: 'fail',
        }));
        return Promise.reject();
      }
    },
    [],
  );

  const createSearchParams = useCallback(() => {
    const paramsObj: RouteProps['matches'] = { q: word };
    const queries = Object.entries(paramsObj)
      .filter(([_key, value]) => value != null)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    route(queries ? `/?${queries}` : '/');
  }, [word]);

  useEffect(() => {
    createSearchParams();
  }, [createSearchParams]);

  return {
    word,
    supportsData,
    handleSetWord,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
