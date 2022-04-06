import { BrowserRouter, Route, Switch } from "react-router-dom"

import "./App.scss"
import PageNotFound from "./components/PageNotFound"
import HomeTemplate from "./containers/HomeTemplate"
import { routeHome, ALLOWS } from "./routes"

function App() {
  const showLayoutHome = (routes, allow) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            allow={allow}
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        )
      })
    }
  }

  const { normalRoutes, userRoutes, authRoutes } = routeHome

  return (
    <BrowserRouter>
      <Switch>
        {showLayoutHome(normalRoutes, ALLOWS.ALL)}
        {showLayoutHome(userRoutes, ALLOWS.USER)}
        {showLayoutHome(authRoutes, ALLOWS.NONE_USER)}
        <Route path="" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
