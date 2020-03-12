import { useState, useEffect } from 'preact/hooks';
import axios, { AxiosResponse, AxiosError } from 'axios';

type ReturnType = {
  response: AxiosResponse | null;
  error: AxiosError;
  isLoading: boolean;
};

export const useFetch = (url: string): ReturnType => {
  const [response, setResponse] = useState<ReturnType['response']>(null);
  const [error, setError] = useState<ReturnType['error']>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await axios.get(url);
        setResponse(res);
        return Promise.resolve();
      } catch (err) {
        setError(err);
        return Promise.reject();
      }
    };
    fetchData().finally(() => setIsLoading(false));
  }, [url]);
  return { response, error, isLoading };
};
