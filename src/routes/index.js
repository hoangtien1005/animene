import Home from "../containers/HomeTemplate/Home"
import AnimeList from "../containers/HomeTemplate/AnimeList"
import Anime from "../containers/HomeTemplate/Anime"

const routeHome = [
  {
    exact: true,
    path: "/",
    component: Home
  },
  {
    exact: false,
    path: "/anime-list",
    component: AnimeList
  },
  {
    exact: false,
    path: "/anime/:anime_id",
    component: Anime
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
