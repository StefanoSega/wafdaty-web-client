import React from 'react';
import { styled } from 'styled-components';

import { MERCHANTS_MOCK } from '~/mocks/merchants';
import MerchantLabel from './MerchantLabel';
import PaymentSteps from './PaymentSteps';
import { px2rem } from '~/helpers/styles';

interface PaymentFormProps {
  merchantId: string | undefined;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ merchantId }) => {
  const merchant = MERCHANTS_MOCK.find((item) => item.id === merchantId);

  if (!merchant) {
    return null;
  }

  return (
    <Container>
      <MerchantLabel merchant={merchant} />
      <PaymentSteps merchant={merchant} />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 ${px2rem(16)} ${px2rem(16)} ${px2rem(16)};
`;

export default PaymentForm;
