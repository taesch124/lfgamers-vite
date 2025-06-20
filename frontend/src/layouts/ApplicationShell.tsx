import { AppShell, Burger, Flex, Image, px } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { JSX } from 'react';

import AppLogo from '@assets/LFGamersLogo.png';

function ApplicationShell({ children }: { children: JSX.Element }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
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
            <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
            />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default ApplicationShell;