import React from 'react';
import { styled } from 'styled-components';

import { px2rem } from '~/helpers/styles';
import { Merchant } from '~/types/merchant';

interface MerchantLabelProps {
  merchant: Merchant;
}

const MerchantLabel: React.FC<MerchantLabelProps> = React.memo(
  ({ merchant }) => {
    const { name, logoUrl } = merchant;

    return (
      <Container>
        <Logo src={logoUrl} alt={name} />
        <Title>{name}</Title>
      </Container>
    );
  }
);

const Logo = styled.img`
  height: ${px2rem(32)};
`;

const Title = styled.span`
  font-size: ${px2rem(20)};
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
  background-color: #fff;
  margin: ${px2rem(16)} 0;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(12)};
`;

export default MerchantLabel;
