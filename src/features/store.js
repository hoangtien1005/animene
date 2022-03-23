import { configureStore } from "@reduxjs/toolkit"
import animeReducer from "./anime/animeSlice"
import animeListReducer from "./animeList/animeListSlice"
import homeReducer from "./home/homeSlice"

const store = configureStore({
  reducer: {
    anime: animeReducer,
    animeList: animeListReducer,
    home: homeReducer
  }
})

export default store
