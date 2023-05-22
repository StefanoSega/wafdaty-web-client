import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import RenderRouter from './routes';
import { theme } from './styles/theme';

const App: React.FC = () => {
  return (
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <RenderRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
