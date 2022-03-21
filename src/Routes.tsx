import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';
import UIPages from './modules/UI/pages/UIPages';

const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const ProductListPage = lazy(() => import('./modules/product/pages/ProductListPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <Route exact path="/" component={LoginPage} />

        <UIPages>
          <ProtectedRoute path={ROUTES.product} component={ProductListPage} />
        </UIPages>

      </Switch>
    </Suspense>
  );
};
