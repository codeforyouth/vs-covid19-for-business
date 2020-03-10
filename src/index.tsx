import { h, render, FunctionalComponent } from 'preact';
import useFetch from './hooks/useFetch';
import { SHEET_KEY, getCSVUrl, PROXY_HOST } from './constants';
type Props = {
  message?: string;
};

const App: FunctionalComponent<Props> = ({ message = 'JP' }) => {
  const { res, loading } = useFetch(
    PROXY_HOST + '/?url=' + encodeURIComponent(getCSVUrl(SHEET_KEY)),
  );
  console.debug(res?.data);
  console.debug(loading);
  return <p>Hello, {message}</p>;
};

render(<App message={'Tokyo'} />, document.getElementById('root'));
