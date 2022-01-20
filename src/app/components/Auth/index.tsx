import React from 'react';
import './index.css';

import AuthPage from './Auth';

const AuthLayout = () => {
  return (
    <React.Fragment>
      <div className="heading-layout">CHECK IF LEGAL</div>
      <AuthPage />
    </React.Fragment>
  );
};

export default AuthLayout;
