import { h, render, FunctionalComponent } from 'preact';

type Props = {
  message?: string;
};

const App: FunctionalComponent<Props> = ({ message = 'JP' }) => (
  <p>Hello, {message}</p>
);

render(<App message={'Tokyo'} />, document.getElementById('root'));
