import React, { useState } from 'react';
import logo from '../images/mathulas.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
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

// Define the Header component
export const Header = ({ cartItems, authUser, userSignOut }) => {
  const location = useLocation();

  // Determine the current route
  const isRegisterRoute = location.pathname === '/register';
  const isLoginRoute = location.pathname === '/login';

  // State for controlling the menu drawer
  const [openMenu, setOpenMenu] = useState(false);

  // Menu options for the drawer
  const menuOptions = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      to: '/'
    },
    {
      text: 'Sign In',
      icon: <Face6SharpIcon />,
      to: '/login'
    },
    {
      text: `Cart `,
      icon: (
        <div className='cart-icon'>
          <ShoppingCartIcon />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </div>
      ),
      to: '/cart'
    },
    {
      text: 'Logout',
      icon: <LogoutIcon />,
      to: '/logout'
    },
  ];

  return (
    <nav className='nav-bar'>
      <div className='header'>
        <h3>Spares</h3>
        <a href='/'><img src={logo} alt='No logo' className='nav-logo' /></a>
      </div>

      <div className='navbar-links-container'>
        {authUser ? (
          <>
            {/* Display user information and dropdown menu */}
            <label><a>{`Hi, ${authUser.displayName}`}</a></label>
            <select className='select' onChange={(event) => {
              if (event.target.value === 'logout') {
                userSignOut();
              }
            }}>
              <option></option>
              <option>Profile</option>
              <option value='logout'>Logout</option>
            </select>
          </>
        ) : (
          <>
            {!isLoginRoute && (
              <a href='/login'>
                Sign In <FontAwesomeIcon icon={faUser} />
              </a>
            )}
          </>
        )}

        {/* Display shopping cart icon */}
        <a href='/cart' className="cart-icon">
          <AiOutlineShoppingCart style={{ fontSize: '30px', color: '' }} />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </a>
      </div>

      <div className='navbar-menu-container'>
        {/* Open the menu drawer */}
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>

      {/* Menu Drawer */}
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
                {/* Menu item links */}
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
