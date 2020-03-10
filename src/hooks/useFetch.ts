import { useState, useEffect } from 'preact/hooks';
import Axios from 'axios';

const useFetch = (url: string) => {
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      const res = await Axios.get(url);
      setRes(res);
      return Promise.resolve();
    };
    fetchData().finally(() => setLoading(false));
  }, [url]);
  return { res, loading };
};

export default useFetch;
