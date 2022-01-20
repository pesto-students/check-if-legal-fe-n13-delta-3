import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';
import { useGoogleLogin } from 'react-google-login';
import React from 'react';

const AuthPage = () => {
  return (
    <React.Fragment>
      <div className="auth-layout">
        <div className="auth-content">Sign in to your Account</div>
        <div className="buttons-layout">
          <span className="text-count">Continue as</span>
          <div className="select-type">
            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="user-login" mb="0">
                User
              </FormLabel>
              <Switch id="user-login" colorScheme="teal" size="lg" />
              <FormLabel htmlFor="user-login" mb="1" ml="3">
                Lawyer
              </FormLabel>
            </FormControl>
          </div>
          <span className="button-group-google">
            <GoogleContent />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

const GoogleContent = () => {
  return (
    <button className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
};

export default AuthPage;
