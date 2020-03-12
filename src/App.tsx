import { h, render, FunctionalComponent } from 'preact';
import { useFetch, useFormat } from './hooks';
import { SHEET_KEY, getCSVUrl, PROXY_HOST } from './constants';
import { Card, SearchBox } from './components';
const App: FunctionalComponent = () => {
  const { response, error, isLoading } = useFetch(
    PROXY_HOST + '/?url=' + encodeURIComponent(getCSVUrl(SHEET_KEY)),
  );
  const { data } = useFormat(response?.data);
  return (
    <div>
      <SearchBox />
      {isLoading && <p>読込中</p>}
      {!isLoading && data && data.map((item, i) => <Card key={i} {...item} />)}
      {!isLoading && error && <p>{error.name + ':' + error.message}</p>}
    </div>
  );
};

render(<App />, document.getElementById('root'));
