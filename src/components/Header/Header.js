import styles from "./styles.module.scss"
import clsx from "clsx"

import Button from "../ui/Button"
import Logo from "../../assets/img/logo3x.png"

import * as React from "react"
import { Link } from "react-router-dom"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import MenuItem from "@mui/material/MenuItem"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import NavBar from "../NavBar"

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <NavBar isMobile />
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AutoStoriesIcon />
        </IconButton>
        <p>Profile</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button
          href="/signup"
          className={clsx(styles.btnSignUp, styles.btnMobile, "btn-outline")}
        >
          Sign Up
        </Button>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Button
          href="/login"
          className={clsx(styles.btnLogin, styles.btnMobile)}
        >
          Login
        </Button>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          <Link to="/">
            <img style={{ width: "112px" }} src={Logo} alt="Logo" />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              minWidth: "70%",
              justifyContent: "space-between"
            }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <NavBar />
            </Box>
            {/* <IconButton
              size="large"
              aria-label="Anime"
              color="inherit"
            >
                <PlayArrowRoundedIcon />
                <p>Anime</p>
            </IconButton>
            <IconButton
              size="large"
              aria-label="Manga"
              color="inherit"
            >
                <AutoStoriesIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="Staff"
              color="inherit"
            >
                <AccountBoxIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="characters"
              color="inherit"
            >
              <PersonIcon />
            </IconButton> */}
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <PlayArrowRoundedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AutoStoriesIcon />
            </IconButton> */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                href="/signup"
                className={clsx(styles.btnSignUp, "btn-outline")}
              >
                Sign Up
              </Button>
              <Button href="/login" className={styles.btnLogin}>
                Login
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}
