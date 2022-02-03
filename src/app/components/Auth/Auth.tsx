import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { useGoogleLogin } from 'react-google-login';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from 'redux/actions/userAction';

const AuthPage = () => {
  const [user, Setuser] = useState<any>(true);
  const dispatch = useDispatch();
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
              <Switch
                id="user-login"
                colorScheme="teal"
                size="lg"
                onChange={() => Setuser(!user)}
              />
              <FormLabel htmlFor="user-login" mb="1" ml="3">
                Lawyer
              </FormLabel>
            </FormControl>
          </div>
          <span className="button-group-google">
            <GoogleContent user={user} dispatch={dispatch} />
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

const GoogleContent = (props: any) => {
  const client_Id: any =
    process.env.GOOGLE_CLIENT ||
    '631449527453-ms6ep6ghv7ct2iu0o6qbk70lks8qo153.apps.googleusercontent.com';

  const onSuccess = async (res: any) => {
    if (res) {
      let Payload = {
        idToken: res?.tokenId,
        isLawyer: !props?.user,
      };
      props.dispatch(setUserData(Payload));
    }
  };

  const onFailure = res => {
    // Toast
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
