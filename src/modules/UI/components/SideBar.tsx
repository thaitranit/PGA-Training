import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../../redux/reducer'
import { Action } from 'typesafe-actions'
import { Drawer } from '@mui/material'
import { push } from 'connected-react-router';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import { ROUTES } from '../../../configs/routes';



interface Props {
  isOpen: boolean
}

interface MainMenu {
  [key: string]: boolean
}

const SideBar = (props: Props) => {
  
  const {isOpen} = props
  
  const [mainMenu, setMainMenu] = useState<MainMenu>({
    'catalog': true,
    'user': true
  })

  const location = useLocation()
  const dispatch = useDispatch<ThunkDispatch<AppState,null,Action<string>>>()
  
  const handleChangePage = (router: string) => {
    dispatch(push(router))
  }

  const handleClickMainMenu = (key: string) => {
    setMainMenu({
      ...mainMenu,
      [key]: !mainMenu[key]
    })
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      className='sidebar'
      PaperProps={{
        sx: {
          backgroundColor: '#323259',
          color: 'white'
        }
      }}
    >
      <List
        sx={{ width: '260px', marginTop: '80px' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={() => handleClickMainMenu('catalog')}
          sx={location.pathname.includes('product/') ? {color: '#a16eff'} : {}}
        >
          <ListItemIcon>
            <SellOutlinedIcon sx={location.pathname.includes('product/manage-product') ? {color: '#a16eff'} : {color: 'white'}} />
          </ListItemIcon>

          <ListItemText primary="Catalog"/>

          {!mainMenu.catalog ? <ChevronLeftOutlinedIcon /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={mainMenu.catalog}
          timeout="auto"
          unmountOnExit>
          <List component="div" disablePadding style={{
            paddingLeft: "57px",
            paddingRight: '16px'
          }}>

            <ListItemButton
              onClick={() => handleChangePage(ROUTES.product)}
              sx={location.pathname.includes('product/manage-product') ? {color: '#a16eff'} : {}}
            >
              <ListItemText primary="Product" />
            </ListItemButton>

          </List>
        </Collapse>

        <ListItemButton
          onClick={() => handleClickMainMenu('user')}
          sx={location.pathname.includes('user/') ? {color: '#a16eff'} : {}}
        >
          <ListItemIcon>
            <GroupOutlinedIcon sx={location.pathname.includes('user/manage-user') ? {color: '#a16eff'} : {color: 'white'}} />
          </ListItemIcon>
          <ListItemText primary="User" />
          {!mainMenu.user ? <ChevronLeftOutlinedIcon /> : <ExpandMore />}
        </ListItemButton>
        <Collapse
          in={mainMenu.user}
          timeout="auto"
          unmountOnExit>
          <List component="div" disablePadding style={{
            paddingLeft: "57px",
            paddingRight: '16px'
          }}>
            <ListItemButton
              // onClick={() => handleChangePage(ROUTES.userList)}
              sx={location.pathname.includes('user/manage-user') ? {color: '#a16eff'} : {}}
            >
              <ListItemText primary="User List" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}

export default SideBar