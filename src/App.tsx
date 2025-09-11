import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout } from './shared/components/layout/layout';
import { routes } from './routes';
import { useScrollToTop } from './shared/hooks/useScrollToTop';
import { ProtectedRoute } from './shared/components/ui/protected-route';

const App: React.FC = () => {
  // Use the scroll to top hook for all pages
  useScrollToTop();

  return (
    <Layout>
      <Switch>
        {routes.map(({ path, exact, component: Component, protected: isProtected }) => 
          isProtected ? (
            <ProtectedRoute key={path} path={path} exact={exact} component={Component} />
          ) : (
            <Route key={path} path={path} exact={exact}>
              <Component />
            </Route>
          )
        )}
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;