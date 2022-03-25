import { PATHS } from "../utils/constants"
import Home from "../containers/HomeTemplate/Home"
import AnimeList from "../containers/HomeTemplate/AnimeList"
import Anime from "../containers/HomeTemplate/Anime"
import MangaList from "../containers/HomeTemplate/MangaList"

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
    component: Anime
  },
  {
    exact: false,
    path: PATHS.MANGA.SEARCH,
    component: MangaList
  },
  {
    exact: false,
    path: `${PATHS.MANGA.DETAILS}/:id`,
    component: Anime
  },
  {
    exact: false,
    path: PATHS.STAFF.SEARCH,
    component: AnimeList
  },
  {
    exact: false,
    path: `${PATHS.STAFF.DETAILS}/:id`,
    component: Anime
  },
  {
    exact: false,
    path: PATHS.CHARACTER.SEARCH,
    component: AnimeList
  },
  {
    exact: false,
    path: `${PATHS.CHARACTER.DETAILS}/:id`,
    component: Anime
  }
]

export { routeHome }
