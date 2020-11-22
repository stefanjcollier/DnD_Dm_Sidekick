import '../styles/globals.css'
import 'assets/CreativeTim/css/nextjs-material-dashboard.css';
import React from 'react';
import Head from 'next/head';
import Admin from 'layouts/CreativeTim/Admin';


function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <title>D&D DM Sidekick</title>
      </Head>
      <Admin>
        <Component {...pageProps} />
      </Admin>
    </React.Fragment>
  )
}

export default MyApp
