import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getHomeAnimes } from "../../utils/callApi"

const initialState = {
  loading: null,
  error: null,
  data: null
}

export const fetchHomeAnimes = createAsyncThunk("home", async () => {
  const data = await getHomeAnimes()
  return { data }
})

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeAnimes.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchHomeAnimes.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload.data
        state.error = null
      })
      .addCase(fetchHomeAnimes.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
  }
})

export const homeActions = homeSlice.actions
export const selectHome = (state) => state.home
export default homeSlice.reducer
