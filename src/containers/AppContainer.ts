import { useState, useCallback, useEffect } from 'preact/hooks';
import { createContainer } from 'unstated-next';
import { Support } from '../typings';
import axios, { AxiosResponse, AxiosError } from 'axios';

export type AppContainerType = {
  word?: string | null;
  target?: string | null;
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
  const [word, setWord] = useState(null); // 単語
  const [target, setTarget] = useState(null); // 対象者チェックボックス
  const [supportsData, setSupportsData] = useState<SupportsData>(
    initialSupportState,
  ); // 元となるデータ本体
  const [filteredSupports, setFilteredSupports] = useState<Support[] | null>(
    null,
  ); // 絞られた支援情報

  // setState用
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

  // 文字検索
  const filterByWord = useCallback((supports: Support[], word: string) => {
    const filteredByWordSupports = supports.filter(
      support =>
        support['サービス名称'].includes(word) ||
        support['詳細'].includes(word) ||
        support['企業等'].includes(word),
    );
    setFilteredSupports(filteredByWordSupports);
  }, []);

  // 対象者検索
  const filterByTarget = useCallback((supports: Support[], target: string) => {
    const targetArray: string[] | string = target.split(',');
    const filteredByTargetSupports = supports.filter(support => {
      if (targetArray?.length > 1) {
        return (targetArray as string[])
          .map(t => support['対象者'].includes(t))
          .some(result => result);
      }
      return support['対象者'].includes(targetArray.toString());
    });
    setFilteredSupports(filteredByTargetSupports);
  }, []);

  // 絞り込み処理
  useEffect(() => {
    const supports = supportsData?.response?.data;
    if (!supports || (!word && !target)) return;
    if (target && !word) {
      filterByTarget(supports, target);
      return;
    }
    if (word && !target) {
      filterByWord(supports, word);
      return;
    }
    if (target && word) {
      filterByTarget(supports, target);
      filterByWord(supports, word);
      return;
    }
  }, [word, target]);

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
