import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callAnimeApi } from "../../utils/callApi"
import { generateApiParameters } from "../../utils/utils"

const initialState = {
  loading: null,
  error: null,
  data: null
}

export const fetchAllAnimes = createAsyncThunk(
  "anime-list",
  async (searchString) => {
    const paramsString = generateApiParameters(searchString)
    const { data } = await callAnimeApi({
      endpoint: `anime?${paramsString}`
    })
    return { data }
  }
)

const animeSlice = createSlice({
  name: "anime",
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

export const animeActions = animeSlice.actions
export const selectAnime = (state) => state.anime
export default animeSlice.reducer
