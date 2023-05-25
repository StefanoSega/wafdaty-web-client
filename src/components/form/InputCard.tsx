import React from 'react';
import styled from 'styled-components';

import { px2rem } from '~/helpers/styles';

interface InputCardProps {
  title: string;
  children?: React.ReactNode;
}

const InputCard: React.FC<InputCardProps> = ({ title, children }) => {
  return (
    <Container>
      <div>{title}</div>
      {children}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${px2rem(8)};
  background-color: #fff;
  border-radius: ${px2rem(8)};
  padding: ${px2rem(12)};
`;

export default InputCard;
