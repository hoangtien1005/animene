import { PATHS } from "../utils/constants"
import Home from "../containers/HomeTemplate/Home"
import SignUp from "../containers/HomeTemplate/SignUp"
import Login from "../containers/HomeTemplate/Login"
import ForgotPassword from "../containers/HomeTemplate/ForgotPassword"
import AnimeList from "../containers/HomeTemplate/AnimeList"
import Anime from "../containers/HomeTemplate/Anime"
import MangaList from "../containers/HomeTemplate/MangaList"
import StaffList from "../containers/HomeTemplate/StaffList"
import CharacterList from "../containers/HomeTemplate/CharacterList"
import ComingSoon from "../containers/HomeTemplate/ComingSoon"

const routeHome = [
  {
    exact: true,
    path: "/",
    component: Home
  },
  {
    exact: false,
    path: PATHS.ANIME.SEARCH,
    component: AnimeList
  },
  {
    exact: false,
    path: `${PATHS.ANIME.DETAILS}/:id`,
    component: ComingSoon
  },
  {
    exact: false,
    path: PATHS.MANGA.SEARCH,
    component: MangaList
  },
  {
    exact: false,
    path: `${PATHS.MANGA.DETAILS}/:id`,
    component: ComingSoon
  },
  {
    exact: false,
    path: PATHS.STAFF.SEARCH,
    component: StaffList
  },
  {
    exact: false,
    path: `${PATHS.STAFF.DETAILS}/:id`,
    component: ComingSoon
  },
  {
    exact: false,
    path: PATHS.CHARACTER.SEARCH,
    component: CharacterList
  },
  {
    exact: false,
    path: `${PATHS.CHARACTER.DETAILS}/:id`,
    component: ComingSoon
  },
  {
    exact: true,
    path: "/signup",
    component: SignUp
  },
  {
    exact: true,
    path: "/login",
    component: Login
  },
  {
    exact: true,
    path: "/forgot-password",
    component: ForgotPassword
  }
]

export { routeHome }
