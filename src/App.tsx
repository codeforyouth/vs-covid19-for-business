import { h, render, FunctionalComponent, ComponentChild } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import Router, { Route, route } from 'preact-router';
import { SHEET_URL } from './constants';
import { AppContainer } from './containers';
import { SearchBox, Content } from './components';
import GlobalStyle from './styles';

type MatchKeys = 'q' | 'targets' | 'categories';
export type RouteProps = {
  matches: { [key in MatchKeys]: string };
  url: string;
  path: string;
};

const AppComponent: FunctionalComponent<RouteProps &
  ComponentChild> = props => {
  const [updatedParams, toggleUpdatedParams] = useState(false);
  const {
    fetchSupports,
    handleSetWord,
    handleSetTarget,
    handleSetCategory,
    supportsData,
    word,
    target,
    category,
  } = AppContainer.useContainer();

  const setStateFromParams = useCallback(() => {
    const { q, targets, categories } = props.matches;
    if (supportsData.status === 'success') {
      if (!updatedParams) {
        if (q) handleSetWord(q);
        if (targets) handleSetTarget(targets);
        if (categories) handleSetCategory(categories);
        toggleUpdatedParams(true);
        return;
      }
      if (!word && !target && !category) {
        route('/');
        return;
      }
    }
  }, [props.matches, supportsData.status]);

  useEffect(() => {
    fetchSupports(SHEET_URL);
  }, []);

  useEffect(() => {
    setStateFromParams();
  }, [setStateFromParams]);

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
