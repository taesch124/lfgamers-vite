import { MantineProvider, } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router';

import '@mantine/core/styles.css';
import './App.css';
import AppRoutes from './Routes';

function App() {
  return (
    <MantineProvider>
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </QueryClientProvider>
    </MantineProvider>
  );
}

export default App
