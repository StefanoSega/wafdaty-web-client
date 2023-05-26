import React, { useState } from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';
import StepAmount from './StepAmount';
import SuccessScreen from './SuccessScreen';
import MerchantLabel from './MerchantLabel';
import { Merchant } from '~/types/merchant';

enum PaymentStep {
  Payment = 1,
  Success = 2,
}

interface PaymentStepsProps {
  merchant: Merchant;
}

export interface PaymentDetails {
  amount: number;
  phoneNumber?: string;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ merchant }) => {
  const [step, setStep] = useState(PaymentStep.Payment);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>();

  const handlePay = (amount: number, phoneNumber?: string) => {
    setPaymentDetails({ amount, phoneNumber });
    setStep(PaymentStep.Success);
  };

  return (
    <>
      {step === PaymentStep.Payment && (
        <Container>
          <MerchantLabel merchant={merchant} />
          <StepAmount onPay={handlePay} />
        </Container>
      )}
      {step === PaymentStep.Success && paymentDetails && (
        <SuccessScreen merchant={merchant} paymentDetails={paymentDetails} />
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
  margin: 0 ${px2rem(16)} ${px2rem(16)} ${px2rem(16)};
`;

export default PaymentSteps;
