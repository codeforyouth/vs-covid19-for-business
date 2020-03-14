import { h, render, FunctionalComponent, FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { SHEET_URL } from './constants';
import { AppContainer } from './containers';
import { Card, SearchBox, CheckLoadStatus } from './components';
import GlobalStyle from './styles';

const AppComponent: FunctionComponent = () => {
  const {
    fetchSupports,
    supportsData,
    filteredSupports,
  } = AppContainer.useContainer();

  useEffect(() => {
    fetchSupports(SHEET_URL);
  }, []);

  return (
    <div>
      <GlobalStyle />
      <SearchBox />
      <CheckLoadStatus
        supportsData={supportsData}
        filteredSupports={filteredSupports}
      />
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
