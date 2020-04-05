/* eslint-disable @typescript-eslint/camelcase */
import { useState, useCallback, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Data } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { RouteProps } from '../App';
import { API_BASE_URL } from '../constants';

export type AppContainerType = {
  word?: string | null;
  industryId?: string | null;
  purposeId?: string | null;
  supportsData: SupportsData;
  handleSetWord: (w?: string) => void;
  handleSetIndustryId: (value?: string | null) => void;
  handleSetPurposeId: (value?: string | null) => void;
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
  const [industryId, setIndustryId] = useState(null);
  const [purposeId, setPurposeId] = useState(null);
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  );

  const handleSetWord = useCallback((w?: string): void => setWord(w), []);
  const handleSetIndustryId = useCallback(
    (value?: string | null): void => setIndustryId(value),
    [],
  );
  const handleSetPurposeId = useCallback(
    (value?: string | null): void => setPurposeId(value),
    [],
  );

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
        requestURL = `${requestURL},${matches.q}`;
      }
      if (matches?.industry_category) {
        requestURL = `${requestURL}&industry_category=${matches.industry_category}`;
      }
      if (matches?.purpose_category) {
        requestURL = `${requestURL}&purpose_category=${matches.purpose_category}`;
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
    const paramsObj: RouteProps['matches'] = {
      q: word,
      industry_category: industryId,
      purpose_category: purposeId,
    };
    const queries = Object.entries(paramsObj)
      .filter(([_key, value]) => value != null)
      .map(([key, val]) => `${key}=${val}`)
      .join('&');
    route(queries ? `/?${queries}` : '/');
  }, [word, industryId, purposeId]);

  useEffect(() => {
    createSearchParams();
  }, [createSearchParams]);

  return {
    word,
    industryId,
    purposeId,
    supportsData,
    handleSetWord,
    handleSetIndustryId,
    handleSetPurposeId,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
