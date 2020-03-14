import { h, render, FunctionalComponent, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { SHEET_URL } from './constants';
import { AppContainer } from './containers';
import { SearchBox, Content } from './components';
import GlobalStyle from './styles';

const AppComponent: FunctionComponent = () => {
  const { fetchSupports } = AppContainer.useContainer();

  useEffect(() => {
    fetchSupports(SHEET_URL);
  }, []);
  return (
    <div>
      <GlobalStyle />
      <SearchBox />
      <Content />
    </div>
  );
};

const App: FunctionalComponent = () => {
  const { Provider } = AppContainer;
  return (
    <Provider>
      <AppComponent />
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
