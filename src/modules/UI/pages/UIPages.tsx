import React, { useState } from 'react'
import { Action } from 'redux';
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../redux/reducer'
import Header from '../components/Header'
import { setAuthorization, setUserInfo } from '../../auth/redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { push } from 'connected-react-router';
import { AuthToken, IUser } from '../../../models/user';
import SideBar from '../components/SideBar';

interface Props {
    children: any;
}
const UIPages = (props: Props) => {
    const  {children} = props;

    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

    const [showSidebar, setShowSidebar] = useState<boolean>(true)
    
    const handleShowSidebar = () => {
        setShowSidebar(prev => !prev)
    }

    const handleLogout = () => {
        Cookies.remove(ACCESS_TOKEN_KEY);
        dispatch(setAuthorization({} as AuthToken));
        dispatch(setUserInfo({} as IUser));
        dispatch(push(ROUTES.login));
    }

    return (
        <div>
      <Header 
        handleShowSidebar={handleShowSidebar}
        handleLogout = {handleLogout}
      />
      <SideBar 
        isOpen={showSidebar}
      />
      <div
        style={{
          marginLeft: showSidebar ? '260px' : 0,
          transition: '0.225s',
          backgroundColor: '#191836',
          color: '#fff',
          padding: '110px 36px 36px 36px',
          flex: 1
        }}
      >
        {children}
      </div>
    </div>
    )
}
export default UIPages
