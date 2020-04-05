/* eslint-disable @typescript-eslint/camelcase */
import { h, render, FunctionalComponent, ComponentChild } from 'preact';
import { useEffect } from 'preact/hooks';
import Router, { Route } from 'preact-router';
import { AppContainer } from './containers';
import { SearchBox, Content } from './components';
import GlobalStyle from './styles';

type MatchKeys = 'q' | 'industry_category' | 'purpose_category';
export type RouteProps = {
  matches: { [key in MatchKeys]: string };
  url: string;
  path: string;
};

const AppComponent: FunctionalComponent<RouteProps &
  ComponentChild> = props => {
  const {
    fetchSupports,
    handleSetWord,
    handleSetIndustryId,
  } = AppContainer.useContainer();

  useEffect(() => {
    const { q, industry_category } = props.matches;
    if (q) handleSetWord(q);
    if (industry_category) handleSetIndustryId(industry_category);
    fetchSupports(props.matches);
  }, []);

  return (
    <div>
      <GlobalStyle />
      <SearchBox {...props} />
      <Content />
    </div>
  );
};

const App: FunctionalComponent = () => {
  const { Provider } = AppContainer;
  return (
    <Provider>
      <Router>
        <Route path="/" component={AppComponent} />
      </Router>
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
