// import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import type { Page } from '../types/types';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import { SWRConfig } from 'swr';
import { SessionProvider } from 'next-auth/react';

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return (
      <SWRConfig value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
        <SessionProvider session={pageProps.session}>

        <LayoutProvider>
          {Component.getLayout(<Component {...pageProps} />)}
        </LayoutProvider>
        </SessionProvider>
      </SWRConfig>
      )
  } else {
    return (
      <SWRConfig value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
        <SessionProvider session={pageProps.session}>

        <LayoutProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
        </SessionProvider>
      </SWRConfig>
    );
  }
}