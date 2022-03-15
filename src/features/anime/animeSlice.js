import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callAnimeApi } from "../../utils/callApi"
import { generateApiParameters } from "../../utils/utils"

const initialState = {
  loading: null,
  error: null,
  data: null,
  searchConfig: {
    title: {
      value: null,
      multiple: false
    },
    formats: {
      value: null,
      multiple: true
    },
    status: {
      value: null,
      multiple: false
    },
    year: {
      value: null,
      multiple: false
    },
    season: {
      value: null,
      multiple: false
    },
    genres: {
      value: null,
      multiple: true
    },
    page: 1
  }
}

export const fetchAllAnimes = createAsyncThunk(
  "anime-list",
  async (searchConfig) => {
    const paramsString = generateApiParameters(searchConfig)
    const { data } = await callAnimeApi({
      endpoint: `anime?${paramsString}`
    })
    return { data, searchConfig }
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
      .addCase(fetchAllAnimes.rejected, (state) => {
        state.loading = null
        state.data = null
        state.error = "Fetch failed"
      })
  }
})

export const animeActions = animeSlice.actions
export const selectAnime = (state) => state.anime
export default animeSlice.reducer
