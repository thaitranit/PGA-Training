import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { IUser } from "../../../models/user";
import {AppBar, Toolbar, IconButton, Typography} from '@mui/material'
import { Menu as IconMenu } from '@mui/icons-material'
import '../scss/components/header.scss'


interface Props {
    user?: IUser,
    handleLogout(): void,
    handleShowSidebar(): void,
    
}

const Header = (props: Props) => {

    const { user,handleLogout, handleShowSidebar } = props;
    
    return (
        <AppBar className='app-bar' sx={{zIndex: 1000000}}>
      <Toolbar>
        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleShowSidebar}
        >
          <IconMenu />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ flexGrow: 1 }}>
          Gear Focus Admin
        </Typography>
        <div className='app-bar__user'>
          <IconButton
            size="large"
            color='inherit'
          >
            <PersonIcon />
          </IconButton>
          <div className='popover-account'>
            <div>
              <Typography variant="subtitle1" component="p">
                My profile
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                component="p"
                sx={{
                  color: '#999'
                }}
              >
                {user?.login}
              </Typography>
            </div>
            <div>
              <a onClick={handleLogout}>
                Log out
              </a>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
    )

}
export default Header;