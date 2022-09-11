import '../styles/globals.css';

import { MantineProvider } from '@mantine/core';

import { theme } from '../styles/mantime.theme';
import Layout from './components/Layout';

import type { AppProps } from 'next/app';
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        ={' '}
      </MantineProvider>
    </>
  );
}
