import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callAnimeApi, callAnilistApi } from "../../utils/callApi"
// import { GET_HOME_DATA } from '../../utils/queries'

const initialState = {
  loading: null,
  error: null,
  data: null
}

export const fetchAnimeById = createAsyncThunk("anime", async (anime_id) => {
  // const { data } = await callAnilistApi(GET_HOME_DATA)
  // return { data }
  // const { data } = await callAnimeApi({
  //   endpoint: `anime/${anime_id}`
  // })
})

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeById.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload.data
        state.error = null
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
  }
})

export const animeActions = animeSlice.actions
export const selectAnime = (state) => state.anime
export default animeSlice.reducer
