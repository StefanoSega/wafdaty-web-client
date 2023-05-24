import React from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';
import LogoImage from '~/assets/logo.png';

const Header: React.FC = () => {

  return (
    <Container>
<Logo src={LogoImage} alt="Wafdaty" />
<Title>Wafdaty</Title>
    </Container>
  );
};

const Container = styled.div`
  padding: ${px2rem(16)};
  display: flex;
    align-items: center;
    background-color: #FFF;
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

export default Header;

/*
width: 128px;
  height: 128px;
  background: rgb(2,241,166);
background: linear-gradient(135deg, rgba(2,241,166,1) 0%, rgba(0,222,255,1) 100%);
  border-radius: 16px;
*/