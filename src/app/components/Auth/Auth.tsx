import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useGoogleLogin } from 'react-google-login';
import React from 'react';
import { Api } from '../../../services/api';

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
  const client_Id: any =
    process.env.GOOGLE_CLIENT ||
    '631449527453-ms6ep6ghv7ct2iu0o6qbk70lks8qo153.apps.googleusercontent.com';

  const onSuccess = async (res: any) => {
    if (res) {
      let response = await Api.post('/v1/auth/google/', {
        token: res?.tokenId,
      });
      // todo Toast Message and redirect
    }
  };

  const onFailure = res => {
    //Todo addition of Toast Message
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: client_Id,
    accessType: 'offline',
  });
  return (
    <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>
      <span className="buttonText">Sign in with Google</span>
    </button>
  );
};

export default AuthPage;
