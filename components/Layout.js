import Head from 'next/head';

export default ({ children, title = 'Flatris' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <style>{`
        html,
        body {
          margin: 0;
          padding: 0;
          font-family: Helvetica, Arial, sans-serif;
        }
      `}</style>
    </Head>
    {children}
  </div>
);
