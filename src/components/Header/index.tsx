import React from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';
import LogoImage from '~/assets/logo.png';

const Header: React.FC = () => {
  return (
    <>
      <Container>
        <Logo src={LogoImage} alt="Wafdaty" />
        <Title>Wafdaty</Title>
      </Container>
      <Filler />
    </>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  max-height: ${px2rem(72.5)};
  padding: ${px2rem(16)};
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 1px 25px 1px rgba(238, 238, 238, 1);
`;

const Logo = styled.img`
  width: ${px2rem(32)};
  height: ${px2rem(32)};
`;

const Title = styled.h1`
  margin: 0;
  padding-left: ${px2rem(16)};
`;

const Filler = styled.div`
  height: ${px2rem(72.5)};
`;

export default Header;
