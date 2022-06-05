import * as React from 'react';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AuthService from "../services/auth-service"
import { Link, Routes, BrowserRouter } from 'react-router-dom'


const pages = [''];
const settings = ['Profile', 'Logout'];


export default function Navbar() {

  const isLoggedIn = AuthService.isLoggedIn()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [user, setUser] = React.useState("");

  React.useEffect(() => {
    AuthService.getLoggedUser().then((response) => {
      setUser(response.data.principal.email);
    });
  })


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logout() {

    handleCloseUserMenu();
    AuthService.logout();
    window.location.href = '/';
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              OMEGA
            </Typography>
          </Link>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              ALPHA
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>


          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn === true ?
              <div>
                <p style={{ color: 'white', display: "inline-block", marginRight: "10px" }}>{user}</p>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
              </div> : <></>}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >


              <MenuItem onClick={handleCloseUserMenu}>
                <Link to='/profile' style={{ textDecoration: 'none', color: 'black' }}>
                  <Typography textAlign="center">
                    Profile
                  </Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={() => logout()}>

                <Typography textAlign="center">
                  Logout
                </Typography>

              </MenuItem>

            </Menu>
          </Box>


        </Toolbar>
      </Container>
    </AppBar >

  );
};

