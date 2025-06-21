import { Flex, Button, Burger, Image } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import AppLogo from '@assets/LFGamersLogo.png';
import appClient from '@api/apiClient';
import sessionAtom from '@atoms/sessionAtom';

type ApplicationHeaderProps = {
    opened: boolean;
    toggle: () => void;
}

function ApplicationHeader(props: ApplicationHeaderProps) {
    const { opened, toggle } = props;
    const navigate = useNavigate();
    const [ session ] = useAtom(sessionAtom);

    const { refetch } = useQuery<{ message: string}>({
        enabled: false,
        queryKey: ['auth', 'logout'],
        queryFn: async () => {
            const response = await appClient.post<{ message: string }>('/auth/logout');
            if (response.status === HttpStatusCode.Ok) {
                navigate('/login');
            }
            return response.data;
        },
    });

    return (
        <Flex
            align='center'
            h={60}
            justify='space-between'
            pl={16}
            pr={16}
        >
            <Image
                alt='LFGamers Logo'
                h={40}
                src={AppLogo}
                w={40}
            />
            <Flex justify='flex-end'>
                {session.authenticated && (
                    <Button
                        onClick={() => refetch()}
                    >
                        Logout
                    </Button>
                )}
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                />
            </Flex>
        </Flex>
    );
};

export default ApplicationHeader;