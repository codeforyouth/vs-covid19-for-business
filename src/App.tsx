import { h, render, FunctionalComponent } from 'preact';
import Router, { Route } from 'preact-router';
import { AppContainer } from './containers';
import { Top, About } from './pages';

const App: FunctionalComponent = () => {
  const { Provider } = AppContainer;
  return (
    <Provider>
      <Router>
        <Route path="/" component={Top} />
        <Route path="/about" component={About} />
      </Router>
    </Provider>
  );
};

render(<App />, document.getElementById('root'));
