import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callAnimeApi } from "../../utils/callApi"

const initialState = {
  loading: null,
  error: null,
  data: null
}

export const fetchAllAnimes = createAsyncThunk(
  "anime-list",
  async (searchString) => {
    const paramsString = searchString
    const { data } = await callAnimeApi({
      endpoint: `anime${paramsString}`
    })
    return { data }
  }
)

const animeListSlice = createSlice({
  name: "animeList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAnimes.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchAllAnimes.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload.data
        state.error = null
      })
      .addCase(fetchAllAnimes.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
  }
})

export const animeListActions = animeListSlice.actions
export const selectAnimeList = (state) => state.animeList
export default animeListSlice.reducer
