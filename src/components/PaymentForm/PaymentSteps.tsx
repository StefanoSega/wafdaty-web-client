import React from 'react';
import styled from 'styled-components';

import { Merchant } from '~/types/merchant';
import { px2rem } from '~/helpers/styles';
import StepAmount from './StepAmount';

interface PaymentStepsProps {
    merchant: Merchant;
}

const PaymentSteps: React.FC<PaymentStepsProps> = ({ merchant }) => {
const { name, logoUrl } = merchant;

    return <Container>
        <StepAmount />
    </Container>;
  };

  const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${px2rem(16)};
  `;

export default PaymentSteps;