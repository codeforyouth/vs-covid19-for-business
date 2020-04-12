import { useState, useCallback, useEffect, StateUpdater } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Data, Params } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { API_BASE_URL } from '../constants';

export type AppContainerType = {
  isInitial: boolean;
  pageNumber: number;
  params?: Params | null;
  word?: string | null;
  supportsData: SupportsData;
  setIsInitial: StateUpdater<boolean>;
  setPageNumber: StateUpdater<number>;
  setParams: StateUpdater<Params>;
  setWord: StateUpdater<string | undefined>;
  fetchSupports: (params?: Params, withLoadMore?: boolean) => void;
};

type SupportsData = {
  data?: Data | null;
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
  data: null,
  error: null,
  status: undefined,
};

const useAppContainer = (): AppContainerType => {
  const [isInitial, setIsInitial] = useState(true);
  const [word, setWord] = useState(null);
  const [params, setParams] = useState<Params>(initialParams);
  const [pageNumber, setPageNumber] = useState(0);
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  );

  const fetchSupports = useCallback(
    async (params: Params, withLoadMore?: boolean): Promise<void> => {
      if (!withLoadMore) {
        setSupportsData(prevState => ({
          ...prevState,
          status: 'loading',
        }));
      }
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
          status: 'success',
          data: withLoadMore
            ? {
                ...prevState.data,
                items: prevState.data.items.concat(res.data.items),
              }
            : res.data,
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
    pageNumber,
    params,
    word,
    supportsData,
    setIsInitial,
    setPageNumber,
    setParams,
    setWord,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
