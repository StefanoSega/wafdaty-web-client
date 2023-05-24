import { Button, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';
import InputCard from '../form/InputCard';

const StepAmount: React.FC = () => {
    return <>
    <InputCard title='Type the amount to pay'>
    <InputAmountContainer>
    <LabelAmount>AED</LabelAmount>
        <InputAmount placeholder='0.00' type='number' />
    </InputAmountContainer>
    </InputCard>
    <InputCard title='Do you want to receive an invoice? Type here your phone number'>
    <Input addonBefore={<span>Cod</span>} />
    </InputCard>
        <ButtonContainer>
            <PayButton shape="round" size='large' type="primary">Pay</PayButton>
        </ButtonContainer>
        </>;
  };

  const InputAmount = styled(Input)`
  font-size: ${px2rem(32)};
  border: 0;
  padding: 0;
  `;

  const LabelAmount = styled.span`
  font-size: ${px2rem(32)};
  font-weight: 500;
  `;

  const InputAmountContainer = styled.div`
    display: flex;
    gap: ${px2rem(16)};
  align-items: center;
  `;

const ButtonContainer = styled.div`
text-align: center;
`;

const PayButton = styled(Button)`
width: ${px2rem(128)};
background: rgb(2,241,166);
background: linear-gradient(135deg, rgba(2,241,166,1) 0%, rgba(0,222,255,1) 100%);
`;

export default StepAmount;