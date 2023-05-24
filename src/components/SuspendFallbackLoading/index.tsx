import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { px2rem } from '~/helpers/styles';

const SuspendFallbackLoading: React.FC = () => {
  return <StyledSpinner indicator={<SpinnerIcon spin rev />} />;
};

const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpinnerIcon = styled(LoadingOutlined)`
  font-size: ${px2rem(24)};
`;

export default SuspendFallbackLoading;
