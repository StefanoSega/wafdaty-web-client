import { Input } from 'antd';
import React from 'react';
import styled from 'styled-components';
import CreditCardInput from 'react-credit-card-input';

import { px2rem } from '~/helpers/styles';

interface NewCardFormProps {
    
}

const NewCardForm: React.FC<NewCardFormProps> = () => {
    return <div>
        <div><CreditCardInput
  // cardNumberInputProps={{ value: cardNumber, onChange: this.handleCardNumberChange }}
  // cardExpiryInputProps={{ value: expiry, onChange: this.handleCardExpiryChange }}
  // cardCVCInputProps={{ value: cvc, onChange: this.handleCardCVCChange }}
  fieldClassName="input"
/></div>
    </div>;
  };

export default NewCardForm;