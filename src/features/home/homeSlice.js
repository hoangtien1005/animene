import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getHomeAnimes } from "../../utils/callApi"
import { dateInPast } from "../../utils/utils"

const initialState = {
  loading: null,
  error: null,
  data: null
}

// TODO: store home data in personal server instead of local storage
export const fetchHomeAnimes = createAsyncThunk("home", async () => {
  let data
  const homeStorage = JSON.parse(localStorage.getItem("homeStorage"))
  const isExpired = homeStorage?.expired <= new Date()
  if (!homeStorage || isExpired) {
    let tomorrow = new Date()
    tomorrow.setHours(7)
    tomorrow.setMinutes(0)
    tomorrow.setDate(tomorrow.getDate() + 1)
    data = await getHomeAnimes()
    const newHomeStorage = await { expired: tomorrow, data: data }
    localStorage.setItem("homeStorage", JSON.stringify(newHomeStorage))
  } else {
    data = homeStorage.data
    console.log(new Date(homeStorage.expired))
  }

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
