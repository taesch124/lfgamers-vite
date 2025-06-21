import '@mantine/core/styles.css';
import './App.css';

import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { HttpStatusCode } from 'axios';
import { Loader } from '@mantine/core';
import ApplicationShell from '@layouts/ApplicationShell';
import sessionAtom from '@atoms/sessionAtom';
import appClient from '@api/apiClient';
import AppRoutes from './Routes';

function App() {
    const navigate = useNavigate();
    const [ session, setSession ] = useAtom(sessionAtom);
    const { isPending } = useQuery<boolean>({
        queryKey: ['auth', 'check-token'],
        queryFn: async () => {
            const response = await appClient.get('/auth/check-token');
            if (response.status === HttpStatusCode.Ok) {
                setSession({ authenticated: true });
                return true;
            }
            setSession({ authenticated: false });
            return false;
        },
    });

    useEffect(() => {
        if (session.authenticated) {
            navigate('/games');
        }
    }, [session, navigate]);

    if (isPending) {
        return (
            <ApplicationShell>
                <Loader />
            </ApplicationShell>
        );
    }

    return (
        <ApplicationShell>
            <AppRoutes />
        </ApplicationShell>
    );
};

export default App;