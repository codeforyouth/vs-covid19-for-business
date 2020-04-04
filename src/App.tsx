import { h, render, FunctionalComponent, ComponentChild } from 'preact';
import { useEffect } from 'preact/hooks';
import Router, { Route } from 'preact-router';
import { SHEET_URL } from './constants';
import { AppContainer } from './containers';
import { SearchBox, Content } from './components';
import GlobalStyle from './styles';

type MatchKeys = 'q' | 'target' | 'category';
type RouteProps = {
  matches: { [key in MatchKeys]: string };
  url: string;
  path: string;
};

const AppComponent: FunctionalComponent<RouteProps &
  ComponentChild> = props => {
  const {
    fetchSupports,
    handleSetWord,
    handleSetTarget,
    handleSetCategory,
    supportsData,
  } = AppContainer.useContainer();

  useEffect(() => {
    fetchSupports(SHEET_URL);
  }, []);

  useEffect(() => {
    const { q, target, category } = props.matches;
    if (supportsData.response) {
      if (q) handleSetWord(q);
      if (target) handleSetTarget(target);
      if (category) handleSetCategory(category);
    }
  }, [props.matches]);

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
