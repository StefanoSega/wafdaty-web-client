import React from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';
import StepAmount from './StepAmount';

const PaymentSteps: React.FC = () => {
  return (
    <Container>
      <StepAmount />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(16)};
`;

export default PaymentSteps;
