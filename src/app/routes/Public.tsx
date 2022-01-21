import React from 'react';
import { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './PublicConfig';

const PublicRouter = () => {
  //@ts-ignore
  const routeComponents: any = routes.map(({ path, component }, key: any) => (
    <Route exact={true} path={path} component={component} key={key} />
  ));
  return (
    <Suspense fallback={null}>
      <Switch>{routeComponents}</Switch>
    </Suspense>
  );
};

export default PublicRouter;
