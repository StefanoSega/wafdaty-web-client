import React from 'react';
import { css, styled } from 'styled-components';
import { QRCode } from 'react-qrcode-logo';

import { px2rem } from '~/helpers/styles';
import { MERCHANTS_MOCK } from '~/mocks/merchants';
import { Merchant } from '~/types/merchant';
import LogoImage from '~/assets/logo.png';

interface QrCodeScreenProps {
  merchantId: string | undefined;
}

const QrCodeScreen: React.FC<QrCodeScreenProps> = ({ merchantId }) => {
  const merchant = MERCHANTS_MOCK.find((item) => item.id === merchantId);

  if (!merchant) {
    return null;
  }

  const url = `http://localhost:3000/payments/${merchantId}`;

  return (
    <Container>
      <Background merchant={merchant} />
      <Slanted />
      <LogoWrapper>
        <QRCode
          value={url}
          logoImage={merchant.logoUrl}
          logoPadding={1}
          logoWidth={48}
        />
      </LogoWrapper>
      <TextWrapper>
        <Paragraph>
          Scan the QR Code above to pay and collect points to redeem offers!
        </Paragraph>
        <ParagraphBelow>
          <PoweredSpan>Powered by</PoweredSpan>
          <span>
            <Logo src={LogoImage} /> <b>Wafdaty</b>
          </span>
        </ParagraphBelow>
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
  top: ${px2rem(128)};
  transform: translate(-50%, -50%);
`;

const Background = styled.div<{ merchant: Merchant }>`
  height: ${px2rem(128)};
  background: ${({ merchant }) => merchant.color1};
  ${({ merchant }) =>
    merchant.color2 &&
    css`
      background: linear-gradient(
        135deg,
        ${merchant.color1} 0%,
        ${merchant.color2} 100%
      );
    `}
`;

const Slanted = styled.div`
  position: relative;
  top: ${px2rem(-31)};
  height: ${px2rem(32)};
  clip-path: polygon(0 0, 0 0, 100% 100%, 0 100%);
  background: #fff;
`;

const TextWrapper = styled.div`
  margin-top: ${px2rem(40)};
  padding: ${px2rem(16)};
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: ${px2rem(8)};
`;

const ParagraphBelow = styled(Paragraph)`
  font-size: ${px2rem(12)};
`;

const Logo = styled.img`
  height: ${px2rem(24)};
  position: relative;
  top: ${px2rem(6)};
  margin-right: ${px2rem(3)};
`;

const PoweredSpan = styled.span`
  margin-right: ${px2rem(6)};
`;

export default QrCodeScreen;
