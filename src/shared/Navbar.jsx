import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MITLOGO from '../assets/mitLogo.png'
import Tooltip from '@mui/material/Tooltip';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { NavbarStyled } from './Navbar.styles';
import { styled } from '@mui/material/styles';
import { AccountBalance, AccountCircle, AssignmentInd, Login, Logout, Person, Storage, SwapHoriz } from '@mui/icons-material';
import { useAuth0 } from '@auth0/auth0-react';
import { useBankContext } from '../context/context';

const drawerWidth = 240;

function Navbar(props) {
  const { window: windowProps, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { isAuthenticated, logout } = useAuth0()
  const { state } = useBankContext()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    {
      title: 'Home',
      route: '/',
      tooltip: 'Home Page',
      icon: <AccountBalance />,
      public: true,
      isEmployee: false
    },
    {
      title: 'Profile',
      route: '/profile',
      tooltip: 'Profile',
      icon: <Person />,
      public: false,
      isEmployee: false
    },
    {
      title: 'Operations',
      route: '/operations',
      tooltip: 'Operations',
      icon: <SwapHoriz />,
      public: false,
      isEmployee: false
    },
  ]

  const loginItem = {
    title: 'Login',
    route: '/login',
    tooltip: 'Login',
    icon: <Login />
  }

  const allDataItem = {
    title: 'All Data',
    route: '/all-data',
    tooltip: 'All Data',
    icon: <Storage />
  }

  const handleLogout = () => {
    window.localStorage.removeItem('userType')
    window.localStorage.removeItem('token')
    logout()
  }
  const logoutItem = {
    title: 'Logout',
    route: '/logout',
    tooltip: 'Logout',
    icon: <Logout />,
    callback: handleLogout
  }


  const NavItem = ({ item, index }) => {
    let resolved = useResolvedPath(item.route);
    let match = useMatch({ path: resolved.pathname, end: true });
    return (
      <Tooltip title={item.tooltip} placement="right">
        <Link to={item.route} className={match ? 'nav-link-active' : 'nav-link'}>
          <ListItem button key={item} onClick={item.callback}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      </Tooltip>
    )
  }
  const drawer = (
    <div>
      <Toolbar>
        <img src={MITLOGO} alt='mit-logo' className='mit-logo'></img>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <div key={index}>
            {
              (item.public || isAuthenticated) &&
              <NavItem item={item} index={index} key={index} />
            }
          </div>
        ))}
      </List>
      {
        state.currentUser?.userType === 'employee' &&
        <NavItem item={allDataItem} />
      }
      <Divider />
      {
        !isAuthenticated
          ? <NavItem item={loginItem} />
          : <NavItem item={logoutItem} />
      }
    </div>
  );

  const container = windowProps !== undefined ? () => windowProps().document.body : undefined;
  const CustomAppBar = styled(AppBar)(({ theme }) => ({
    color: '#fff',
    backgroundColor: theme.primary
  }));
  return (
    <NavbarStyled>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <CustomAppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              MIT Bank Application
            </Typography>
            <Toolbar>
              {
                state.currentUser &&
                <Typography variant="h6" noWrap component="div">
                  {
                    state.currentUser?.userType === 'customer'
                      ? <>{state.currentUser?.fullName} <AccountCircle /></>
                      : <>{state.currentUser?.fullName} <AssignmentInd /></>
                  }
                </Typography>
              }
            </Toolbar>
          </Toolbar>
        </CustomAppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <br />
          {children}
        </Box>
      </Box>
    </NavbarStyled>
  );
}

export default Navbar;