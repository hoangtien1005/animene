import React from "react"
import { Route } from "react-router"
import { Redirect } from "react-router-dom"

import Header from "../../components/Header"
import ScrollToTop from "../../components/ScrollToTop"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Container from "@mui/material/Container"

const LayoutHome = (props) => {
  //   let isLogin = false;
  //   if (localStorage.getItem("User")) {
  //     isLogin = true;
  //   }
  let isLogin = true
  return (
    <>
      <Header />
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {props.children}
          </Grid>
        </Box>
      </Container>
      {/* <Footer /> */}
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
