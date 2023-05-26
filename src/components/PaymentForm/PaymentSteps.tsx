import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import useLocalStorage from 'use-local-storage';

import { px2rem } from '~/helpers/styles';
import StepAmount from './StepAmount';
import SuccessScreen from './SuccessScreen';
import MerchantLabel from './MerchantLabel';
import { Merchant } from '~/types/merchant';
import { CardDetails } from './NewCardForm';

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

interface LsConfig {
  cards?: Array<Omit<CardDetails, 'cvc'>>;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ merchant }) => {
  const [step, setStep] = useState(PaymentStep.Payment);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>();
  const [lsConfig, setLsConfig] = useLocalStorage<LsConfig>('wafdaty', {});

  const handlePay = useCallback(
    (amount: number, phoneNumber?: string, card?: CardDetails) => {
      if (card) {
        const isAlreadySaved = lsConfig.cards?.some(
          (storedCard) => storedCard.number === card.number
        );
        if (!isAlreadySaved) {
          setLsConfig((prevLsConfig) => ({
            ...prevLsConfig,
            cards: [
              ...(prevLsConfig?.cards ?? []),
              {
                number: card.number,
                month: card.month,
                year: card.year,
                cardType: card.cardType,
                name: card.name,
              },
            ],
          }));
        }
      }

      setPaymentDetails({ amount, phoneNumber });
      setStep(PaymentStep.Success);
    },
    [lsConfig.cards, setLsConfig]
  );

  return (
    <>
      {step === PaymentStep.Payment && (
        <Container>
          <MerchantLabel merchant={merchant} />
          <StepAmount onPay={handlePay} storedCards={lsConfig.cards} />
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
  margin: ${px2rem(16)};
`;

export default PaymentSteps;
