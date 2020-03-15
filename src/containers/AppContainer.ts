import { useState, useCallback, useEffect } from 'preact/hooks';
import { createContainer } from 'unstated-next';
import { Support } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';

export type AppContainerType = {
  word?: string;
  target?: string;
  supportsData: SupportsData;
  handleSetWord: (w?: string) => void;
  handleSetTarget: (w?: string) => void;
  handleSetSupports: (supports?: Support[] | null) => void;
  fetchSupports: (url: string) => void;
  filteredSupports: Support[] | null;
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
  const [word, setWord] = useState(null);
  const [target, setTarget] = useState(null);
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  );
  const [filteredSupports, setFilteredSupports] = useState<Support[] | null>(
    null,
  );
  const [targetSupports, setTargetSupports] = useState<Support[] | null>(null);

  const handleSetWord = useCallback((w?: string): void => setWord(w), []);

  const handleSetTarget = useCallback((w?: string): void => setTarget(w), []);

  const handleSetSupports = useCallback((supports?: Support[] | null): void => {
    setSupportsData({
      ...supportsData,
      response: { ...supportsData.response, data: supports },
    });
  }, []);

  // 初期読込
  const fetchSupports = useCallback(async (url: string): Promise<void> => {
    setSupportsData({ ...supportsData, isLoading: true });
    try {
      const res: AxiosResponse<Support[] | null> = await axios.get(url);
      setSupportsData(prevState => ({ ...prevState, response: res }));
      return Promise.resolve();
    } catch (err) {
      setSupportsData(prevState => ({ ...prevState, error: err }));
      return Promise.reject();
    } finally {
      setSupportsData(prevState => ({ ...prevState, isLoading: false }));
    }
  }, []);

  // 単語による絞り込み(検索バー or カテゴリ選択)
  useEffect(() => {
    const supports = supportsData?.response?.data;
    if (!supports || !word) return;
    if (target) {
      const filterSupportsFromTarget = targetSupports.filter(
        support =>
          support.サービス名称.includes(word) ||
          support.詳細.includes(word) ||
          support.分野.includes(word),
      );
      setFilteredSupports(filterSupportsFromTarget);
    } else {
      const filteredSupports = supports.filter(
        support =>
          support.サービス名称.includes(word) ||
          support.詳細.includes(word) ||
          support.分野.includes(word),
      );
      setFilteredSupports(filteredSupports);
    }
  }, [word]);

  // 対象者の絞り込み(チェックボックス)
  useEffect(() => {
    const supports = supportsData?.response?.data;
    if (!supports || !target) return;
    const targetArray: string[] | string = target.split(',');
    const filteredSupports = supports.filter(support => {
      if (targetArray?.length > 1) {
        return (targetArray as string[])
          .map(t => support['対象者'].includes(t))
          .some(result => result);
      }
      return support['対象者'].includes(targetArray as string);
    });
    setTargetSupports(filteredSupports);
    setFilteredSupports(filteredSupports);
  }, [target]);

  return {
    word,
    supportsData,
    filteredSupports,
    target,
    handleSetWord,
    handleSetTarget,
    handleSetSupports,
    fetchSupports,
  };
};

export const AppContainer = createContainer(useAppContainer);
