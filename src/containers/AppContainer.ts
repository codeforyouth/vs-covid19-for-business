import { useState, useCallback, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import { createContainer } from 'unstated-next';
import { Data } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { RouteProps } from '../App';

export type AppContainerType = {
  supportsData: SupportsData;
  fetchSupports: (url: string) => void;
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
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  ); // 元となるデータ本体

  const handleSetSupports = useCallback((data?: Data | null): void => {
    setSupportsData({
      ...supportsData,
      response: { ...supportsData.response, data },
    });
  }, []);

  // 初期読込
  const fetchSupports = useCallback(async (url: string): Promise<void> => {
    setSupportsData({
      ...supportsData,
      status: 'loading',
    });
    try {
      const res: AxiosResponse<Data | null> = await axios.get(url);
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

  return {
    supportsData,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
