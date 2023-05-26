import React from 'react';

import { MERCHANTS_MOCK } from '~/mocks/merchants';
import PaymentSteps from './PaymentSteps';

interface PaymentFormProps {
  merchantId: string | undefined;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ merchantId }) => {
  const merchant = MERCHANTS_MOCK.find((item) => item.id === merchantId);

  if (!merchant) {
    return null;
  }

  return <PaymentSteps merchant={merchant} />;
};

export default PaymentForm;
