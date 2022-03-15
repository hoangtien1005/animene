import { configureStore } from "@reduxjs/toolkit"
import animeReducer from "./anime/animeSlice"

const store = configureStore({
  reducer: {
    anime: animeReducer
  }
})

export default store
