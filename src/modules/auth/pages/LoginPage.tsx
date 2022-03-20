import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { ILoginParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { fetchThunk } from '../../common/redux/thunk';
import LoginForm from '../components/LoginForm';
import {Spinner} from 'react-bootstrap'
import Swal from 'sweetalert2'

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      // setErrorMessage('');
      // setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.success === true) {
        // dispatch(setUserInfo(json.data));
        setLoading(false)
        Cookies.set(ACCESS_TOKEN_KEY, json.user_cookie, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
         
      }
      if(json?.success === false){
        Swal.fire({
          title: 'Email or password is incorrect',
          text: json.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }

      // setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div
      className="container"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {loading === true ? <div style={{ display: 'block',backgroundColor:'#888',opacity:'0.5' }} className="modal fade show" id="modelId2" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-modal="true">
          <div className="modal-dialog" role="document" style={{ marginTop: "50vh", display: "flex", justifyContent: "space-around" }}>
            <Spinner animation="border"/>
          </div>
        </div> : ''}
      <div> <h1>Login</h1></div>

      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
