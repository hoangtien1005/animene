import { configureStore } from "@reduxjs/toolkit"
import animeReducer from "./anime/animeSlice"
import animeListReducer from "./animeList/animeListSlice"
import homeReducer from "./home/homeSlice"
import mangaListReducer from "./mangaList/mangaListSlice"

const store = configureStore({
  reducer: {
    anime: animeReducer,
    animeList: animeListReducer,
    home: homeReducer,
    mangaList: mangaListReducer
  }
})

export default store
