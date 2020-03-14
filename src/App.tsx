import { h, render, FunctionalComponent, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { SHEET_URL } from './constants';
import { AppContainer } from './containers';
import { Card, SearchBox } from './components';
import GlobalStyle from './styles';

const AppComponent: FunctionComponent = () => {
  const {
    fetchSupports,
    supportsData: { isLoading, response, error },
  } = AppContainer.useContainer();

  useEffect(() => {
    fetchSupports(SHEET_URL);
  }, []);

  return (
    <div>
      <GlobalStyle />
      <SearchBox />
      {isLoading && <p>読込中</p>}
      {!isLoading &&
        response?.data?.map((item, i) => <Card key={i} {...item} />)}
      {!isLoading && error && <p>{error.name + ':' + error.message}</p>}
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
