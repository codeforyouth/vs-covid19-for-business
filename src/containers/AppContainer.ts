import { useState, useCallback, useEffect, StateUpdater } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Data, Params } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '../constants';

export type AppContainerType = {
  isInitial: boolean;
  params?: Params | null;
  word?: string | null;
  supportsData: SupportsData;
  handleSetIsInitial: (isInitial: boolean) => void;
  setParams: StateUpdater<Params>;
  handleSetParams: (params: Params) => void;
  handleSetWord: (w?: string) => void;
  fetchSupports: (params?: Params) => void;
  handleSetSupports: (supports?: Data | null) => void;
};

type SupportsData = {
  response: AxiosResponse<Data> | null;
  error: AxiosError | null;
  status?: 'loading' | 'success' | 'fail';
};

const initialParams: Params = {
  q: null,
  industry_category: null,
  purpose_category: null,
  'prefecture.name': null,
};

const initialSupportState: SupportsData = {
  response: null,
  error: null,
  status: undefined,
};

const useAppContainer = (): AppContainerType => {
  const [isInitial, setIsInitial] = useState(true);
  const [params, setParams] = useState<Params>(initialParams);
  const [word, setWord] = useState(null);
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  );

  const handleSetParams = useCallback(
    (params?: Params): void => setParams(params),
    [],
  );

  const handleSetIsInitial = useCallback(
    (isInitial: boolean) => setIsInitial(isInitial),
    [],
  );

  const handleSetWord = useCallback((w?: string): void => setWord(w), []);

  const handleSetSupports = useCallback((data?: Data | null): void => {
    setSupportsData({
      ...supportsData,
      response: { ...supportsData.response, data },
    });
  }, []);

  const fetchSupports = useCallback(async (params: Params): Promise<void> => {
    setSupportsData({
      ...supportsData,
      status: 'loading',
    });
    const queries = Object.entries(params)
      .filter(([_key, value]) => value != null)
      .map(([key, val]) => (key === 'q' ? `,${val}` : `&${key}=${val}`))
      .join('');
    try {
      const res: AxiosResponse<Data | null> = await axios.get(
        API_BASE_URL + queries,
      );
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
  }, []);

  const createParams = useCallback(() => {
    if (!isInitial) {
      const queries =
        params &&
        Object.entries(params)
          .filter(([_key, value]) => value != null)
          .map(([key, val]) => `${key}=${val}`)
          .join('&');
      route(queries ? `/?${queries}` : '/');
    }
  }, [params, isInitial]);

  useEffect(() => {
    createParams();
  }, [createParams]);

  return {
    isInitial,
    params,
    word,
    supportsData,
    handleSetIsInitial,
    handleSetParams,
    setParams,
    handleSetWord,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
