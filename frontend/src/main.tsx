import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import queryClient from '@api/queryClient';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { BrowserRouter } from 'react-router';
import appStore from '@atoms/store';
import mantineTheme from '@utils/mantineTheme';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={mantineTheme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={appStore}>
          <StrictMode>
            <App />
          </StrictMode>
        </Provider>
      </BrowserRouter>
    </QueryClientProvider>
  </MantineProvider>,
);