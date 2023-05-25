import React from 'react';
import { RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '../layouts/MainLayout';
import { withFallback } from './withFallback';
import { lazyRetry } from '~/helpers/codeSplitting';

const NotFound = withFallback(
  React.lazy(() => lazyRetry(() => import('~/pages/404'), '404'))
);

const Payments = withFallback(
  React.lazy(() => lazyRetry(() => import('~/pages/PaymentsPage'), 'payment'))
);

export const routeList: RouteObject[] = [
  {
    path: '',
    element: <LayoutPage />,
    children: [
      {
        path: 'payments/:merchantId',
        element: <Payments />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const RenderRouter: React.FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
