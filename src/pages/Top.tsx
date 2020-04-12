import { h, FunctionalComponent, ComponentChild } from 'preact';
import { useEffect } from 'preact/hooks';
import { AppContainer } from '../containers';
import { SearchBox, Content, Header } from '../components';
import GlobalStyle from '../styles';
import { Params, RouteProps } from '../typings';

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
      <Header path={props.path} />
      <Content />
    </div>
  );
};

export default Top;
