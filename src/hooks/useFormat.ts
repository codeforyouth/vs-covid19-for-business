import { useState, useEffect } from 'preact/hooks';
import { convertCSVToArray, convertCSVToJson } from '../utils';
import { Support } from '../typings';

type ReturnType = {
  data: Support[] | null;
};

export const useFormat = (res: string): ReturnType => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (res) {
      const array = convertCSVToArray(res);
      const jsonData = convertCSVToJson(array);
      setData(jsonData);
    } else {
      setData(null);
    }
  }, [res]);
  return { data };
};
