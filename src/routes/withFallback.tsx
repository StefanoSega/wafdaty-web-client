import React from 'react';

import SuspendFallbackLoading from '~/components/SuspendFallbackLoading';

export const withFallback =
  <T,>(Component: React.FC<T>) =>
  (props: T & {}) =>
    (
      <React.Suspense fallback={<SuspendFallbackLoading />}>
        <Component {...props} />
      </React.Suspense>
    );
