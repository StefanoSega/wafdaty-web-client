import React from 'react';
import { Input } from 'antd';
import {
  Number,
  Expiration,
  Cvc,
  NumberChangeEvent,
  ExpirationChangeEvent,
  CvcChangeEvent,
} from 'react-credit-card-primitives';

import VisaImage from '~/assets/cc-visa.png';
import MastercardImage from '~/assets/cc-mastercard.png';
import { styled } from 'styled-components';
import { px2rem } from '~/helpers/styles';

export interface CardDetails {
  number: string;
  cardType: string;
  month: number;
  year: number;
  cvc: number;
  name: string;
  isNumberValid: boolean;
  isExpValid: boolean;
  isCvcValid: boolean;
}

interface NewCardFormProps {
  value: CardDetails | undefined;
  onChange: (value: Partial<CardDetails>) => void;
}

const getCardImage = (type: string) => {
  switch (type) {
    case 'Visa':
      return VisaImage;
    case 'Mastercard':
      return MastercardImage;
    default:
      return;
  }
};

const NewCardForm: React.FC<NewCardFormProps> = ({ value, onChange }) => {
  const handleNumberChange = (changeValue: NumberChangeEvent) => {
    onChange({
      number: changeValue.value,
      cardType: changeValue.type,
      isNumberValid: changeValue.valid,
    });
  };

  const handleExpirationChange = (changeValue: ExpirationChangeEvent) => {
    onChange({
      month: changeValue.month,
      year: changeValue.year,
      isExpValid: changeValue.valid,
    });
  };

  const handleCvcChange = (changeValue: CvcChangeEvent) => {
    onChange({
      cvc: changeValue.value,
      isCvcValid: changeValue.valid,
    });
  };

  return (
    <>
      <div>
        <Number
          masked
          onChange={handleNumberChange}
          render={({ type, getInputProps }) => {
            const cardImage = getCardImage(type);

            return (
              <div>
                <FieldLabel>Number</FieldLabel>
                <InputNoBorder
                  {...getInputProps()}
                  maxLength={19}
                  name="cardnumber"
                  autoComplete="cc-number"
                  addonBefore={
                    <CardImageWrapper>
                      {cardImage && <CardImage src={cardImage} alt={type} />}
                    </CardImageWrapper>
                  }
                />
              </div>
            );
          }}
        />
      </div>
      <ExpCvcRow>
        <Expiration
          onChange={handleExpirationChange}
          render={({ getInputProps }) => (
            <div>
              <FieldLabel>Expiry Date</FieldLabel>
              <InputNoBorder
                {...getInputProps()}
                maxLength={7}
                name="exp-date"
                autoComplete="cc-exp"
              />
            </div>
          )}
        />
        <Cvc
          masked
          onChange={handleCvcChange}
          render={({ getInputProps }) => (
            <div>
              <FieldLabel>CVC</FieldLabel>
              <InputNoBorder
                {...getInputProps()}
                maxLength={3}
                name="cvc"
                autoComplete="cc-csc"
              />
            </div>
          )}
        />
      </ExpCvcRow>
      <div>
        <FieldLabel>Owner Name</FieldLabel>
        <InputNoBorder
          placeholder="Owner name"
          maxLength={22}
          name="cc-name"
          autoComplete="cc-name"
          value={value?.name}
          onChange={(e) =>
            onChange({
              name: e.target.value,
            })
          }
        />
      </div>
    </>
  );
};

const InputNoBorder = styled(Input)`
  border: 0;

  .ant-input-group-addon,
  .ant-input {
    border: 0;
    background: none;
  }
`;

const CardImage = styled.img`
  height: ${px2rem(16)};
`;

const CardImageWrapper = styled.div`
  width: ${px2rem(25)};
`;

const FieldLabel = styled.p`
  font-size: ${px2rem(12)};
  margin-top: 0;
  margin-bottom: ${px2rem(4)};
`;

const ExpCvcRow = styled.div`
  display: flex;
  gap: ${px2rem(12)};
`;

export default NewCardForm;
