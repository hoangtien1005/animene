import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callAnilistApi } from "../../utils/callApi"
import { SEARCH_ANIMES_QUERY } from "../../utils/queries"
import { ANIME_CONSTANTS } from "../../utils/constants"

const initialState = {
  loading: null,
  error: null,
  data: null
}

const generateVariables = (searchString, page) => {
  const variables = { sort: "SCORE_DESC", page: page || 1 }
  const { PARAMETERS } = ANIME_CONSTANTS
  const rawParams = searchString.slice(1).split("&")
  rawParams.forEach((rawParam) => {
    const [rawType, rawValue] = rawParam.split("=")
    let value
    let type = PARAMETERS[rawType]
    switch (rawType) {
      case "genres":
      case "formats":
        value = rawValue.split("%2C")
        variables[type] = value
        break
      case "year":
        value = parseInt(rawValue)
        break
      default:
        value = rawValue
        break
    }
    variables[type] = value
  })
  return variables
}

const getAllAnimes = async (searchString, page) => {
  const variables = generateVariables(searchString, page)
  const { data } = await callAnilistApi(SEARCH_ANIMES_QUERY, variables)
  return { data }
}

export const fetchAllAnimes = createAsyncThunk(
  "anime-list",
  async ({ searchString, page }) => {
    const { data } = await getAllAnimes(searchString, page)
    return { data: data.data.media }
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
        const prevData = state.data || []
        const newData = [...prevData, ...action.payload.data]
        state.loading = null
        state.data = newData
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
