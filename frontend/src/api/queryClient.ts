import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
       onError: (error) => {
            if (error instanceof AxiosError && error.response?.status === 401) {
                console.log('401 Unauthorized: Stopping polling and redirecting...');
            }
        },
    }),
});

export default queryClient;