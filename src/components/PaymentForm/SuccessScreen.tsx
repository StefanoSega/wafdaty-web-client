import React from 'react';
import { styled } from 'styled-components';

import { px2rem } from '~/helpers/styles';
import { Merchant } from '~/types/merchant';
import { PaymentDetails } from './PaymentSteps';

interface SuccessScreenProps {
  merchant: Merchant;
  paymentDetails: PaymentDetails;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  merchant,
  paymentDetails,
}) => {
  return (
    <Container>
      <Background />
      <Slanted />
      <LogoWrapper>
        <Logo src={merchant.logoUrl} />
      </LogoWrapper>
      <TextWrapper>
        <Paragraph>
          Payment of <Marked>{paymentDetails.amount} AED</Marked> was
          successful!
        </Paragraph>
        {paymentDetails.phoneNumber && (
          <Paragraph>
            We sent the invoice to the phone number{' '}
            <b>{paymentDetails.phoneNumber}</b>.
          </Paragraph>
        )}
      </TextWrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #fff;
`;

const LogoWrapper = styled.div`
  background: #fff;
  border-radius: ${px2rem(8)};
  box-shadow: 0px 1px 6px 1px #f9f9f9;
  position: absolute;
  left: 50%;
  top: ${px2rem(178)};
  transform: translate(-50%, -50%);
`;

const Logo = styled.img`
  height: ${px2rem(64)};
`;

const Background = styled.div`
  height: ${px2rem(128)};
  background: rgb(2, 241, 166);
  background: linear-gradient(
    135deg,
    rgba(2, 241, 166, 1) 0%,
    rgba(0, 222, 255, 1) 100%
  );
`;

const Slanted = styled.div`
  position: relative;
  top: ${px2rem(-31)};
  height: ${px2rem(32)};
  clip-path: polygon(0 0, 0 0, 100% 100%, 0 100%);
  background: #fff;
`;

const TextWrapper = styled.div`
  padding: ${px2rem(16)};
`;

const Paragraph = styled.p`
  margin-bottom: ${px2rem(8)};
`;

const Marked = styled.mark`
  font-weight: 700;
  background: -webkit-linear-gradient(
    135deg,
    rgba(2, 241, 166, 1) 0%,
    rgba(0, 222, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default SuccessScreen;
