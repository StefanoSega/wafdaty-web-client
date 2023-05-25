import React from 'react';
import { useParams } from 'react-router-dom';

import PaymentForm from '~/components/PaymentForm';

const PaymentsPage: React.FC = () => {
  const { merchantId } = useParams();

  return <PaymentForm merchantId={merchantId} />;
};

export default PaymentsPage;
