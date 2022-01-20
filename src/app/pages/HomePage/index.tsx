import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="Check-If-Legal application homepage"
        />
      </Helmet>
      <span>HomePage contasiner</span>
    </>
  );
}
