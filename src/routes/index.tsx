import React from 'react';
import { Route, RouteObject } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '~/layouts/MainLayout';
import { withFallback } from './withFallback';
import { lazyRetry } from '~/helpers/codeSplitting';

const NotFound = withFallback(
  React.lazy(() => lazyRetry(() => import('~/pages/404'), '404'))
);

const RfpDetails = withFallback(
  React.lazy(() =>
    lazyRetry(() => import('~/pages/RFP/RfpDetails'), 'rfp-details')
  )
);

export const routeList: RouteObject[] = [
  {
    path: '',
    element: <Route element={<LayoutPage />} />,
    children: [
      {
        path: ':merchantId',
        element: <Route element={<RfpDetails />} />,
      },
    ],
  },
  {
    path: '*',
    element: <Route element={<NotFound />} />,
  },
];

const RenderRouter: React.FC = () => {
  const element = useRoutes(routeList);
  return element;
};

export default RenderRouter;
