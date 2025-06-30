import { UserDTO } from '@lfgamers/shared-types';
import { Flex } from '@mantine/core';

type ApplicationNavbarProps = {
    user?: UserDTO;
}

function ApplicationNavbar(props: ApplicationNavbarProps) {
    const { user } = props;

    return (
        <Flex>
            Navbar {user ? `${user.username}` : 'unknown'}
        </Flex>
    );
}

export default ApplicationNavbar;