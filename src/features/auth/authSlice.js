import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callServerApi } from "../../utils/callApi"

const initialState = {
  loading: null,
  error: null,
  data: JSON.parse(localStorage.getItem("profile")) || null
}

export const SignUp = createAsyncThunk("signup", async (formData) => {
  const config = {
    endpoint: "auth/signup",
    method: "POST",
    payload: formData
  }
  const { data } = await callServerApi(config)
  if (data.error) throw new Error(data.error.message)

  return data
})

export const Login = createAsyncThunk("login", async (formData) => {
  const config = {
    endpoint: "auth/login",
    method: "POST",
    payload: formData
  }
  const { data } = await callServerApi(config)
  if (data.error) throw new Error(data.error.message)
  localStorage.setItem("profile", JSON.stringify(data.data))
  return data
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Reset: (state) => {
      state.loading = null
      state.error = null
      state.data = null
    },
    Logout: (state) => {
      state.loading = null
      state.error = null
      state.data = null
      localStorage.removeItem("profile")
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(SignUp.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload.data
        state.error = null
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
      .addCase(Login.pending, (state) => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = null
        state.data = action.payload.data
        state.error = null
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = null
        state.data = null
        state.error = action.error
      })
  }
})

export const authActions = authSlice.actions
export const selectAuth = (state) => state.auth
export default authSlice.reducer
