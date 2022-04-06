import React from "react"
import { Route } from "react-router"

import Header from "../../components/Header"
import LandingSlider from "../../components/LandingSlider"
import Footer from "../../components/Footer"
import ScrollToTop from "../../components/ScrollToTop"
import ProtectedRoutes from "../../components/ProtectedRoutes"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"

const LayoutHome = (props) => {
  return (
    <>
      <Header />
      {/* <LandingSlider /> */}
      <Container>
        <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
      </Container>
      <Footer />
      <ScrollToTop />
    </>
  )
}

const HomeTemplate = ({ Component, allow, ...props }) => {
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
    // <ProtectedRoutes allow={allow} {...props}>
    //   <LayoutHome>
    //     <Component />
    //   </LayoutHome>
    // </ProtectedRoutes>
  )
}

export default HomeTemplate
