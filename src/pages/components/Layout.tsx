import { useState } from 'react';

import { AppShell, Container, Navbar } from '@mantine/core';

import { HeaderAction } from './HeaderAction';

const Layout = (props: any) => {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding='md'
      navbar={
        <Navbar width={{ base: '100%', sm: 0 }} hidden={!opened}>
          {/* Navbar content */}
        </Navbar>
      }
      header={<HeaderAction setOpened={setOpened}></HeaderAction>}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Container>{props.children}</Container>
    </AppShell>
  );
};

export default Layout;
