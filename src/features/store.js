import { configureStore } from "@reduxjs/toolkit"
import animeReducer from "./anime/animeSlice"
import homeReducer from "./home/homeSlice"

const store = configureStore({
  reducer: {
    anime: animeReducer,
    home: homeReducer
  }
})

export default store
