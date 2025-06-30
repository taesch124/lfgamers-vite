import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { JSX } from 'react';
import { useLocation } from 'react-router';
import ApplicationHeader from '@layouts/ApplicationHeader';
import ApplicationNavbar from './ApplicationNavbar';

function ApplicationShell({ children }: { children: JSX.Element }) {
  const location = useLocation();
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
        <ApplicationHeader
          opened={opened}
          toggle={toggle}
        />
      </AppShell.Header>

      {!['/login', '/register'].includes(location.pathname) && (
        <AppShell.Navbar
          p='md'
        >
          <ApplicationNavbar />
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}

export default ApplicationShell;