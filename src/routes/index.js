import Home from "../containers/HomeTemplate/Home/Home.js"

const routeHome = [
  {
    exact: true,
    path: "/",
    component: Home
  }
  // {
  //     exact: false,
  //     path: "/calendar",
  //     component: Calendar
  // },
  // {
  //     exact: false,
  //     path: "/todo-list",
  //     component: TodoList
  // },
  // {
  //     exact: false,
  //     path: "/user-account",
  //     component: UserAccount
  // },
]

export { routeHome }
