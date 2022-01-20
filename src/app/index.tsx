import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { useTranslation } from 'react-i18next';
import PublicRouter from './routes/Public';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Check-If-Legal"
        defaultTitle="Check-If-Legal"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A React Check-if-legal application" />
      </Helmet>
      <PublicRouter />
      <GlobalStyle />
    </BrowserRouter>
  );
}
