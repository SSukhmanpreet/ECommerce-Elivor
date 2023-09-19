import './style.scss';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ElevationScroll from './ElevateScrollBar';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const NavBar = () => {
    // const numb = 2;
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link style={{ color:'#2355ab', textDecoration: "none" }} to="/orderHistory">
                <MenuItem
                // onClick={() => window.location.href = '/orderHistory'}
                >
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                        sx={{'&:hover': { background:'none'}}}
                        >
                        <FactCheckIcon />
                    </IconButton>
                    <p>All Orders</p>
                </MenuItem>
            </Link>
            <Link style={{ color:'#2355ab', textDecoration: "none" }} to="/cart">
                <MenuItem
                // onClick={() => window.location.href = '/cart'}
                >
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        sx={{'&:hover': { background:'none'}}}
                    >
                        {/* <Badge badgeContent={17} color="error"> */}
                        <ShoppingCartIcon />
                        {/* </Badge> */}
                    </IconButton>
                    <p>Shopping Cart</p>
                </MenuItem>
            </Link>
            <Link style={{ color:'#2355ab', textDecoration: "none" }} to="/signIn">
                <MenuItem
                // onClick={() => window.location.href = '/signIn'}
                >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{'&:hover': { background:'none'}}}
                    >
                        <AccountBoxIcon />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Link>
            <Link style={{ color:'#2355ab', textDecoration: "none" }} to="/about">
                <MenuItem
                // onClick={() => window.location.href = '/about'}
                >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{'&:hover': { background:'none'}}}
                    >
                        <InfoIcon />
                    </IconButton>
                    <p>About</p>
                </MenuItem>
            </Link>
            <Link style={{ color:'#2355ab', textDecoration: "none" }} to="/contactUs">
                <MenuItem
                // onClick={() => window.location.href = '/contactUs'}
                >
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{'&:hover': { background:'none'}}}
                    >
                        <ConnectWithoutContactIcon />
                    </IconButton>
                    <p>Contact Us</p>
                </MenuItem>
            </Link>
        </Menu>
    );

    return (
        <ElevationScroll>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar style={{ background: '#2355ab' }}>
                    <Toolbar>
                        {/* <div className="toolbarSub"> */}
                        <Tooltip title='Homepage'>
                            <Link className='link' to="/" >
                                <Typography
                                    // onClick={() => window.location.href = '/'}
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ padding: '5px 10px', borderRadius: '10px', display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                                >
                                    {/* <LockIcon /> <span>Brand</span> */}
                                    <img className='brandLogo' src="ElivorBrandLogo5_2.jpg" alt="Brand-Logo" />
                                </Typography>
                            </Link>
                        </Tooltip>
                        <Box sx={{ flexGrow: 0.05 }} />
                        <Tooltip title='All Products'>
                            <Link className='link' to="/productsList">
                                <Typography
                                    // onClick={() => window.location.href = '/productsList'}
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ padding: '5px 10px', borderRadius: '10px', display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                                >
                                    <span>Products</span>
                                </Typography>
                            </Link>
                        </Tooltip>
                        <Box sx={{ flexGrow: 0.05 }} />
                        <Tooltip title='All Categories'>
                            <Link className='link' to="/allCategories">
                                <Typography
                                    // onClick={() => window.location.href = '/allCategories'}
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ padding: '5px 10px', borderRadius: '10px', display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
                                >
                                    <span>Categories</span>
                                </Typography>
                            </Link>
                        </Tooltip>
                        <Box sx={{ flexGrow: 1 }} />
                        <Link to="/search">
                            <Tooltip title='Search Products or Categories'>
                                <IconButton
                                    className='iconbuttons'
                                    // onClick={() => window.location.href = '/search'}
                                    size="large"
                                    aria-label="show 4 new mails"
                                    color="inherit"
                                    sx={{ '&:hover': { backgroundColor: '#2355ab', color: 'rgb(255, 213, 0)' }, backgroundColor: '#2355ab', margin: '0px 5px', borderRadius: '100%', }}
                                >
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Box sx={{ flexGrow: 0 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Link to="/orderHistory">
                                <Tooltip title='Order History'>
                                    <IconButton
                                        className='iconbuttons'
                                        // onClick={() => window.location.href = '/orderHistory'}
                                        size="large"
                                        aria-label="show 4 new mails"
                                        color="inherit"
                                        sx={{ '&:hover': { backgroundColor: '#2355ab', color: 'rgb(255, 213, 0)' }, backgroundColor: '#2355ab', margin: '0px 5px', borderRadius: '100%', }}
                                    >
                                        <FactCheckIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            <Link to="/cart">
                                <Tooltip title='Cart'>
                                    <IconButton
                                        className='iconbuttons'
                                        // onClick={() => window.location.href = '/cart'}
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        sx={{ '&:hover': { backgroundColor: '#2355ab', color: 'rgb(255, 213, 0)' }, backgroundColor: '#2355ab', margin: '0px 5px', borderRadius: '100%', }}
                                    >
                                        {/* <Badge badgeContent={17} color="error"> */}
                                        <ShoppingCartIcon />
                                        {/* </Badge> */}
                                    </IconButton>
                                </Tooltip>
                            </Link>
                            {/* 
                            {
                                (numb === 1) ?
                                    <IconButton
                                    className='iconbuttons'
                                        onClick={() => window.location.href = '/signIn'}
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountBoxIcon />
                                    </IconButton>
                                    :
                                    <IconButton
                                    className='iconbuttons'
                                        onClick={() => window.location.href = '/profile'}
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                    >
                                        <AccountBoxIcon />
                                    </IconButton>
                            } */}
                            <Link to="/signIn">
                                <Tooltip title='Sign In to your account'>
                                    <IconButton
                                        className='iconbuttons'
                                        onClick={() => window.location.href = '/signIn'}
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                        sx={{ '&:hover': { backgroundColor: '#2355ab', color: 'rgb(255, 213, 0)' }, backgroundColor: '#2355ab', marginLeft: '5px', borderRadius: '100%', }}
                                    >
                                        <AccountBoxIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                        {/* </div> */}
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </Box>
        </ElevationScroll >
    );
}
export default NavBar;