import React, { Children, useState } from 'react';

import { Anchor, AppShell, Burger, createStyles, Header, MediaQuery, Navbar } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

const useStyles = createStyles((theme) => ({
  navbar: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Layout = (props: Props) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <AppShell
      fixed
      navbarOffsetBreakpoint='sm'
      header={
        <Header height={50}>
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size='sm'
              mr='xl'
            />
          </MediaQuery>
          <div className={classes.links}>
            <Anchor>Home</Anchor>
            <Anchor>Features</Anchor>
            <Anchor>Pricing</Anchor>
          </div>
        </Header>
      }
      navbar={
        <Navbar
          className={classes.navbar}
          width={{ base: '100%', sm: 0 }}
          hidden={!opened}
        >
          <Anchor>Home</Anchor>
          <Anchor>Features</Anchor>
          <Anchor>Pricing</Anchor>
        </Navbar>
      }
    >
      {props.children}
    </AppShell>
  );
};

export default Layout;
