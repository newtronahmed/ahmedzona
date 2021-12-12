import React,{useContext} from "react";
import Head from "next/head";
import {
  Container,
  Typography,
  AppBar,
  Toolbar,
  CssBaseline,
  Link,
  Switch,
  Badge,
  Button,
  Menu,
  MenuItem,
  InputBase,
  IconButton
} from '@material-ui/core'
import Cookies from "js-cookie";
import {createTheme , ThemeProvider} from '@material-ui/core/styles';
import { useStyles } from "../utils/style";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useThemeContext } from "../context/themeContext";
import { useCartContext } from "../context/cartContext";
import { useUserContext } from "../context/userContext";
import SearchBox from './searchBox'
import { FaCartArrowDown, FaSearch, FaUser} from "react-icons/fa";
// import { ThemeContext } from "../context/themeContext";
export default function Layout({ children , title , description}) {
  const classes = useStyles();
  const router = useRouter()
  // const [state,dispatch] = useContext(ThemeContext)
  const [state,dispatch] = useThemeContext()
  const [userContext,userDispatch] = useUserContext()
  const [cart,cartDispatch] = useCartContext()
  const {darkMode} = state
  // console.log(darkMode)
  const [anchorEl,setAnchorEl] = React.useState(null)
  const handleNavbarMenuClick = (e) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () =>{
    setAnchorEl(null)
  }
  const AppbarMenu = () =>{
   return (
      <>
      <Button
      id="navbar-menu"
      aria-controls="navbar-menu"
      aria-haspopup="true"
      aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
      onClick={handleNavbarMenuClick}
      className={classes.navbarButton}
      >
        {userContext.user.name}
      </Button>
      <Menu
      id="navbar-menu"
      aria-labelledby="navbar-button"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      // onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      </>
    )
  }
  const handleLogout = () => {
    handleClose()
    Cookies.remove('user')
    Cookies.remove('cartItems')
    userDispatch({type:"Logout"})
    cartDispatch({type:"RESET"})
    router.push('/')
  }
  const theme = createTheme({
    typography:{
      h1:{
        fontSize:'1.6rem',
        fontWeight:400,
        margin:'1rem 0',
      },
      h2:{
        fontSize:'1.4rem',
        fontWeight:400,
        margin:'1rem 0',
      },
      body1:{
        fontWeight:"normal",
      }
    },
    palette:{
      type: darkMode ? "dark" : "light",
      primary:{
        main: "#f0c000",
      },
      secondary:{
        main:"#208080",
      }
    }
  })
  const handleModeSwitch = () => {
    dispatch({type: darkMode ? "DARKMODE_OFF" : "DARKMODE_ON"})
    // console.log("dark mode value after dispatch" , darkMode)
    // darkmode is still true , therefore !darkmode is the new dark mode
    let newDarkMode = !darkMode;
    // if new darkmode is true , save as on else off
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF")
  }
  return (
    <>
      <Head>
        <title>{`${title ? title : "AHMEDZONA"}`}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography>Shopin</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}>
          </div>
          <div>
            <Switch size="small" checked={darkMode} onChange={handleModeSwitch} ></Switch>
            <NextLink href="/search" passHref>
            <IconButton >
              <FaSearch size={18} />
            </IconButton>
            </NextLink>
              <NextLink href="/cart" passHref>
                  <Link>
                    {
                      cart.cartItems.length > 0 ? <Badge color="secondary" badgeContent={cart.cartItems.length} ><FaCartArrowDown /> </Badge> : <IconButton><FaCartArrowDown  size={18}/></IconButton>
                    }
                  </Link>
              </NextLink>
              <NextLink href="/login" passHref>
                {
                  userContext.user ? <IconButton><FaUser size={18} /></IconButton>: <Link>
                Login
                  </Link>
                }
                  
              </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>
        <CssBaseline/>
        {children}
      </Container>
      <footer className={classes.footer}>
        <Typography>All rights reserved 2021</Typography>
      </footer>
      </ThemeProvider>
    </>
  );
}
// #131921;
