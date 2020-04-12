import { h, FunctionalComponent, ComponentChild } from 'preact';
import { useEffect } from 'preact/hooks';
import { AppContainer } from '../containers';
import { SearchBox, Content } from '../components';
import GlobalStyle from '../styles';
import { Params } from '../typings';

export type RouteProps = {
  matches: { [key in keyof Params]: string };
  url: string;
  path: string;
};

const Top: FunctionalComponent<RouteProps & ComponentChild> = props => {
  const {
    params,
    fetchSupports,
    setParams,
    isInitial,
    setIsInitial,
  } = AppContainer.useContainer();

  useEffect(() => {
    const { q, industry_category, purpose_category } = props.matches;
    const params = {
      q: q ?? null,
      industry_category: industry_category ? Number(industry_category) : null,
      purpose_category: purpose_category ? Number(purpose_category) : null,
      'prefecture.name': props.matches?.['prefecture.name'] ?? null,
    };
    setParams(params);
    setIsInitial(false);
  }, []);

  useEffect(() => {
    if (!isInitial) {
      fetchSupports(params);
    }
  }, [params]);

  return (
    <div>
      <GlobalStyle />
      <SearchBox {...props} />
      <Content />
    </div>
  );
};

export default Top;
