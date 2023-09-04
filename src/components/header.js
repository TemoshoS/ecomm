import React, { useState } from 'react';
import logo from '../images/mathulas.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { HiOutlineBars3 } from 'react-icons/hi2'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import Face6SharpIcon from '@mui/icons-material/Face6Sharp';

export const Header = ({ cartItems }) => {
  const location = useLocation();

  const isRegisterRoute = location.pathname === '/register';
  const isLoginRoute = location.pathname === '/login';

  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
         text: 'Home',
         icon: <HomeIcon/>,
         to: '/'
    },
    {
      text: 'Sign In',
      icon: <Face6SharpIcon />,
      to: '/login'
    },
    {
      text: `Cart `,
      icon: <div className='cart-icon'>
        <ShoppingCartIcon />
        {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
      </div>,
    },

    {
      text: 'Logout',
      icon: <LogoutIcon />,
      to: '/logout'
    },
  ];
  return (
    <nav className='nav-bar'>
    <div >
      <a href='/'><img src={logo}  alt='No logo' className='nav-logo'/></a>
    </div>
      <div className='navbar-links-container'>

        <a href='/signin'>Sign In  <FontAwesomeIcon icon={faUser} /></a>
        <a href='/cart' className="cart-icon">
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </a>

        <a href='/logout'><FontAwesomeIcon icon={faRightFromBracket} /></a>
      </div>

    <div className='navbar-menu-container'>
      <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
    </div>
    <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='right'>
      <Box
        sx={{ width: 250 }}
        role='presentation'
        onClick={() => setOpenMenu(false)}
        onKeyDown={() => setOpenMenu(false)}
      >
        <List>
          {menuOptions.map((item) => (
            <ListItem key={item.text} disablePadding>

             <a href={item.to} className='side-navigation'>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                </ListItemButton>
              </a>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  </nav>
  );
};
