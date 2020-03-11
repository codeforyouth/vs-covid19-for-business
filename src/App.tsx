import { h, render, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { useFetch, useFormat } from './hooks';
import { SHEET_KEY, getCSVUrl, PROXY_HOST } from './constants';

const App: FunctionalComponent = () => {
  const { response, error, isLoading } = useFetch(
    PROXY_HOST + '/?url=' + encodeURIComponent(getCSVUrl(SHEET_KEY)),
  );
  const { data } = useFormat(response?.data);

  return (
    <div>
      {isLoading && <p>読込中</p>}
      {!isLoading &&
        data &&
        data.map(item => (
          <div>
            <h3>サービス名称: {item.サービス名称}</h3>
            <p>分野: {item.分野}</p>
            <p>詳細: {item.詳細}</p>
          </div>
        ))}
      {!isLoading && error && <p>{error.name + ':' + error.message}</p>}
    </div>
  );
};

render(<App />, document.getElementById('root'));
