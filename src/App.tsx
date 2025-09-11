import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from './components/layout';
import { routes } from './routes';
import { useScrollToTop } from './hooks/useScrollToTop';

const App: React.FC = () => {
  // Use the scroll to top hook for all pages
  useScrollToTop();

  return (
    <Layout>
      <Switch>
        {routes.map(({ path, exact, component: Component }) => (
          <Route key={path} path={path} exact={exact}>
            <Component />
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;