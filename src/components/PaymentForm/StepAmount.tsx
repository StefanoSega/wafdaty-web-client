import { Button, Input, Radio, Space } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import DeviceDetector from 'device-detector-js';
import { Cvc, CvcChangeEvent } from 'react-credit-card-primitives';

import { px2rem } from '~/helpers/styles';
import InputCard from '../form/InputCard';
import UaeFlagImage from '~/assets/uae-flag.png';
import ApplePayImage from '~/assets/apple-pay.png';
import GooglePayImage from '~/assets/google-pay.png';
import CreditCardImage from '~/assets/credit-card.png';
import NewCardForm, {
  CardDetails,
  CardForm,
  getCardImage,
} from './NewCardForm';

interface StepAmountProps {
  onPay: (amount: number, phoneNumber?: string, card?: CardDetails) => void;
  storedCards?: Array<Omit<CardDetails, 'cvc'>>;
}

interface StoredCardCvc {
  cvc: number;
  isValid: boolean;
}

const isSelectedStoredCardValid = (
  paymentType: string,
  storedCardsCvc: Record<string, StoredCardCvc>
) => {
  const number = paymentType.substring(3);
  const cvc = storedCardsCvc[number];
  if (!cvc) {
    return false;
  }

  return cvc.isValid;
};

const StepAmount: React.FC<StepAmountProps> = ({ onPay, storedCards }) => {
  const [paymentType, setPaymentType] = useState<string>();
  const [newCardDetails, setNewCardDetails] = useState<Partial<CardForm>>();
  const [amount, setAmount] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [storedCardsCvc, setStoredCardsCvc] = useState<
    Record<string, StoredCardCvc>
  >({});
  const deviceDetector = React.useRef(new DeviceDetector());

  const isNewCardValid =
    newCardDetails?.isNumberValid &&
    newCardDetails.isExpValid &&
    newCardDetails.isCvcValid &&
    newCardDetails.name;
  const isAmountNumber = amount && !isNaN(Number(amount));
  const canPay =
    isAmountNumber &&
    Number(amount) > 0 &&
    (paymentType === 'new-card' ? isNewCardValid : true) &&
    (paymentType?.startsWith('cc-')
      ? isSelectedStoredCardValid(paymentType, storedCardsCvc)
      : true);

  const deviceDetails = deviceDetector.current.parse(
    window.navigator.userAgent
  );
  const isIos = deviceDetails.os?.name === 'iOS';
  const isAndroid = deviceDetails.os?.name === 'Android';

  const handlePay = useCallback(() => {
    onPay(
      Number(amount),
      phoneNumber ? `+971${phoneNumber}` : undefined,
      newCardDetails
        ? {
            number: newCardDetails.number!,
            month: newCardDetails.month!,
            year: newCardDetails.year!,
            name: newCardDetails.name!,
            cardType: newCardDetails.cardType!,
            cvc: newCardDetails.cvc!,
          }
        : undefined
    );
  }, [amount, newCardDetails, onPay, phoneNumber]);

  const handleCvcChange = useCallback(
    (cardNumber: string, changeValue: CvcChangeEvent) => {
      setStoredCardsCvc((prevValue) => ({
        ...prevValue,
        [cardNumber]: {
          cvc: changeValue.value,
          isValid: changeValue.valid,
        },
      }));
    },
    []
  );

  return (
    <>
      <InputCard title="Type the amount to pay">
        <InputAmountContainer>
          <LabelAmount>AED</LabelAmount>
          <InputAmount
            placeholder="0.00"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </InputAmountContainer>
      </InputCard>
      <InputCard title="Do you want to receive an invoice? Type here your phone number">
        <InputPhone
          addonBefore={
            <InputPhonePre>
              <InputPhoneIcon src={UaeFlagImage} />
              <span>+971</span>
            </InputPhonePre>
          }
          placeholder="550001111"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </InputCard>
      <InputCard title="Payment method">
        <Radio.Group
          buttonStyle="solid"
          onChange={(e) => setPaymentType(e.target.value)}
          value={paymentType}
        >
          <Space direction="vertical">
            {isIos && (
              <RadioPaymentType value="apple-pay">
                <PaymentTypeWrapper>
                  <PaymentTypeIconWrapper>
                    <PaymentTypeIcon src={ApplePayImage} />
                  </PaymentTypeIconWrapper>
                  Apple Pay
                </PaymentTypeWrapper>
              </RadioPaymentType>
            )}
            {isAndroid && (
              <RadioPaymentType value="google-pay">
                <PaymentTypeWrapper>
                  <PaymentTypeIconWrapper>
                    <PaymentTypeIcon src={GooglePayImage} />
                  </PaymentTypeIconWrapper>
                  Google Pay
                </PaymentTypeWrapper>
              </RadioPaymentType>
            )}
            {storedCards?.map((storedCard) => (
              <RadioPaymentType
                key={storedCard.number}
                value={`cc-${storedCard.number}`}
              >
                <PaymentTypeWrapper>
                  <PaymentTypeIconWrapper>
                    <PaymentTypeIcon src={getCardImage(storedCard.cardType)} />
                  </PaymentTypeIconWrapper>
                  <PaymentTypeStoredCardLabel>
                    <span>•••• {storedCard.number.slice(-4)}</span>
                    <Cvc
                      masked
                      onChange={(changeValue: CvcChangeEvent) =>
                        handleCvcChange(storedCard.number, changeValue)
                      }
                      render={({ getInputProps }) => (
                        <InputCvc
                          {...getInputProps()}
                          maxLength={3}
                          name="cvc"
                          autoComplete="cc-csc"
                        />
                      )}
                    />
                  </PaymentTypeStoredCardLabel>
                </PaymentTypeWrapper>
              </RadioPaymentType>
            ))}
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
        {paymentType === 'new-card' && (
          <NewCardForm
            value={newCardDetails as CardForm | undefined}
            onChange={(newValue) =>
              setNewCardDetails((prevValue) => ({
                ...prevValue,
                ...newValue,
              }))
            }
          />
        )}
      </InputCard>
      <ButtonContainer>
        <PayButton
          shape="round"
          size="large"
          type="primary"
          disabled={!canPay}
          onClick={handlePay}
        >
          Pay
        </PayButton>
      </ButtonContainer>
    </>
  );
};

const RadioPaymentType = styled(Radio)`
  &.ant-radio-wrapper .ant-radio.ant-radio-checked .ant-radio-inner {
    border-color: rgb(2, 241, 166);
    background: rgb(2, 241, 166);
    background: linear-gradient(
      135deg,
      rgba(2, 241, 166, 1) 0%,
      rgba(0, 222, 255, 1) 100%
    );
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

const PaymentTypeStoredCardLabel = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${px2rem(12)};
`;

const InputCvc = styled(Input)`
  width: ${px2rem(64)};
  border: 0;
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
  background: rgb(2, 241, 166);
  background: linear-gradient(
    135deg,
    rgba(2, 241, 166, 1) 0%,
    rgba(0, 222, 255, 1) 100%
  );
  transition: 0.3s ease-in opacity;

  &:disabled {
    opacity: 0.5;
  }
`;

const InputPhone = styled(Input)`
  .ant-input-group-addon,
  .ant-input {
    border: 0;
    background: none;
  }
`;

const InputPhoneIcon = styled.img`
  height: ${px2rem(24)};
`;

const InputPhonePre = styled.span`
  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
`;

export default StepAmount;
