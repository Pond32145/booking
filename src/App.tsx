import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from './components/layout';
import { routes } from './routes';
import { useForceNavigation } from './hooks/useForceNavigation';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeInOut',
  duration: 0.3,
};

const App: React.FC = () => {
  const location = useLocation();
  const navigationKey = useForceNavigation();
  
  // Create a unique key that combines location and navigation state
  const routeKey = `${location.pathname}${location.search}?nav=${navigationKey}`;

  return (
    <Layout>
      <AnimatePresence mode="wait" onExitComplete={() => {
        // Ensure cleanup after exit animation
        window.scrollTo(0, 0);
      }}>
        <Switch location={location} key={routeKey}>
          {routes.map(({ path, exact, component: Component }) => (
            <Route key={path} path={path} exact={exact}>
              <motion.div
                key={routeKey}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={pageTransition}
                style={{ willChange: 'transform, opacity' }}
              >
                <Component />
              </motion.div>
            </Route>
          ))}
          <Redirect to="/" />
        </Switch>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
