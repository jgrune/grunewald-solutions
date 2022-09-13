import Link from 'next/link';

import {
    Burger, Button, Center, Container, createStyles, Group, Header, Menu
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import { NextLink } from '@mantine/next';
import { IconChevronDown } from '@tabler/icons';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderActionProps {
  setOpened: any;
  links?: {
    link: string;
    label: string;
    links: { link: string; label: string }[];
  }[];
}

const links = [
  {
    link: '/inside-grunewald-solutions',
    label: 'Inside GrunewaldSolutions',
  },
  {
    link: '#1',
    label: 'Prior Solutions and Clients',
    links: [
      {
        link: '/coaching-and-culture',
        label: 'Coaching & Culture',
      },
      {
        link: '/governance-and-staff',
        label: 'Governance & Staff',
      },
      {
        link: '/financial-resources',
        label: 'Financial Resources',
      },
      {
        link: '/government-international',
        label: 'Government/International',
      },
      {
        link: '/human-resources',
        label: 'Human Resources',
      },
      {
        link: '/personnel-policies',
        label: 'Personnel Policies',
      },
      {
        link: '/communications-and-internet',
        label: 'Communications & Internet',
      },
      {
        link: '/programs-and-events',
        label: 'Programs & Events',
      },
    ],
  },
  {
    link: '/recommendations',
    label: 'Recommendations',
  },
  {
    link: '/professional-experience',
    label: 'Professional Experience',
  },
  {
    link: '/volunteer-experience',
    label: 'Volunteer Experience',
  },
];

const HeaderAction = ({ setOpened }: HeaderActionProps) => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false, {
    onOpen: () => setOpened(true),
    onClose: () => setOpened(false),
  });
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component={NextLink} href={item.link}>
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger='hover' exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link}>
        <a className={classes.link}>{link.label}</a>
      </Link>
    );
  });

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size='sm'
          />
          <MantineLogo size={28} />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <Button radius='xl' sx={{ height: 30 }}>
          Contact Us
        </Button>
      </Container>
    </Header>
  );
};

export default HeaderAction;
