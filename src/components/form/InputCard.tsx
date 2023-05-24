import React from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';

interface InputCardProps {
    title: string;
    children?: React.ReactNode;
}

const InputCard: React.FC<InputCardProps> = ({ title, children }) => {
    return <Container>
    <div>{title}</div>
    <InputContainer>
    {children}
    </InputContainer>
    </Container>;
  };

  const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(4)};
  background-color: #FFF;
border-radius: ${px2rem(8)};
padding: ${px2rem(12)};
`;

  const InputContainer = styled.div`
    display: flex;
    gap: ${px2rem(16)};
  align-items: center;
  `;

export default InputCard;