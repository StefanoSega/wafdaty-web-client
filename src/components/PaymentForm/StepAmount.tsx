import { Button, Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';
import InputCard from '../form/InputCard';
import ApplePayImage from "~/assets/apple-pay.png";
import CreditCardImage from "~/assets/credit-card.png";
import NewCardForm, { CardDetails } from './NewCardForm';

const StepAmount: React.FC = () => {
const [paymentType, setPaymentType] = useState();
const [newCardDetails, setNewCardDetails] = useState<Partial<CardDetails>>();
const [amount, setAmount] = useState<number>();

    const canPay = amount && newCardDetails?.isNumberValid 
    && newCardDetails.isExpValid && newCardDetails.isCvcValid
    && newCardDetails.name;

    return <>
    <InputCard title='Type the amount to pay'>
    <InputAmountContainer>
    <LabelAmount>AED</LabelAmount>
        <InputAmount placeholder='0.00' type='number' value={amount}
        onChange={e => setAmount(e.target.value ? Number(e.target.value) : undefined)}
        />
    </InputAmountContainer>
    </InputCard>
    <InputCard title='Do you want to receive an invoice? Type here your phone number'>
    <Input addonBefore={<span>Cod</span>} type='tel' />
    </InputCard>
    <InputCard title='Payment method'>
    <Radio.Group buttonStyle="solid" onChange={(e) => setPaymentType(e.target.value)} value={paymentType}>
      <Space direction="vertical">
        <RadioPaymentType value={1}>
          <PaymentTypeWrapper>
          <PaymentTypeIconWrapper>
          <PaymentTypeIcon src={ApplePayImage} />
          </PaymentTypeIconWrapper>
          Apple Pay
          </PaymentTypeWrapper>
        </RadioPaymentType>
        <RadioPaymentType value="new-card">
        <PaymentTypeWrapper>
        <PaymentTypeIconWrapper>
          <PaymentTypeIcon src={CreditCardImage} />
          </PaymentTypeIconWrapper>
          New Card
          </PaymentTypeWrapper>
        </RadioPaymentType>
      </Space>
    </Radio.Group>
    {paymentType === "new-card" && <NewCardForm
    value={newCardDetails as CardDetails | undefined}
    onChange={(newValue) => setNewCardDetails((prevValue) => ({
      ...prevValue,
      ...newValue
    }))}
    />}
    </InputCard>
        <ButtonContainer>
            <PayButton shape="round" size='large' type="primary"
            disabled={!canPay}
            >Pay</PayButton>
        </ButtonContainer>
        </>;
  };

  const RadioPaymentType = styled(Radio)`
  &.ant-radio-wrapper .ant-radio.ant-radio-checked .ant-radio-inner {
    border-color: rgb(2,241,166);
    background: rgb(2,241,166);
background: linear-gradient(135deg, rgba(2,241,166,1) 0%, rgba(0,222,255,1) 100%);
  }
  `;

  const PaymentTypeIcon = styled.img`
  height: ${px2rem(24)};
  `;

  const PaymentTypeIconWrapper = styled.span`
  width: ${px2rem(45)};
  height: ${px2rem(24)};
  `;

  const PaymentTypeWrapper = styled.div`
  display: flex;
  height: ${px2rem(30)};
  align-items: center;
  gap: ${px2rem(12)};
  `;

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
transition: 0.3s ease-in opacity;

&:disabled {
  opacity: 0.5;
}
`;

export default StepAmount;