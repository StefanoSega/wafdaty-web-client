import React from 'react';
import { useParams } from 'react-router-dom';

import QrCodeScreen from '~/components/QrCodeScreen';

const QrCodePage: React.FC = () => {
  const { merchantId } = useParams();

  return <QrCodeScreen merchantId={merchantId} />;
};

export default QrCodePage;
