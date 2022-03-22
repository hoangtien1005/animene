import React from "react"
import { Route } from "react-router"
import { Redirect } from "react-router-dom"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"
import useMediaQuery from "@mui/material/useMediaQuery"

const LayoutHome = (props) => {
  //   let isLogin = false;
  //   if (localStorage.getItem("User")) {
  //     isLogin = true;
  //   }

  const isLarge = useMediaQuery("(min-width:1200px)")
  const isMedium = useMediaQuery("(min-width:950px)")
  const isSmall = useMediaQuery("(min-width:600px)")
  const spacing = isLarge ? 4.5 : isMedium ? 3 : isSmall ? 2 : 1.5
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={spacing}>
            {props.children}
          </Grid>
        </Box>
      </Container>
      <Footer />
      <ScrollToTop />
    </>
  )
}

const HomeTemplate = ({ Component, ...props }) => {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        return (
          <LayoutHome>
            <Component {...propsComponent} />
          </LayoutHome>
        )
      }}
    />
  )
}

export default HomeTemplate
