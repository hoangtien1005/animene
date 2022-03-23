import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { callAnimeApi } from "../../utils/callApi"
import { ANILIST_BASE_URL } from "../../utils/constants"
import {
  getCurrentSeason,
  getCurrentYear,
  getNextSeason
} from "../../utils/utils"

// get the top sorted animes from Anilist API
const getTopAnilistAnimesSortBy = (sortBy = "TRENDING_DESC") => {
  // POPULARITY_DESC
  // TRENDING_DESC
  // SCORE_DESC
  // FAVOURITES_DESC

  // the number of animes to be fetched
  const perPage = 8

  var query = `
    query ($sortBy: [MediaSort]) {
      Page(page: 1, perPage: ${perPage}){
        media(sort: $sortBy, type: ANIME) {
          id
          averageScore
          popularity
        }
      }
    }
  `
  var variables = {
    sortBy
  }
  // Define the config we'll need for our Api request
  var url = ANILIST_BASE_URL,
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }

  // Make the HTTP Api request
  return fetch(url, options)
    .then(handleResponse)
    .then(handleData)
    .catch(handleError)

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData(data) {
    return data
  }

  function handleError(error) {
    console.error(error)
  }
}

// get the AniAPI anime in accordance with the Anilist id
const getAnimeByAnilistId = async (id) => {
  return await callAnimeApi({ endpoint: `anime?anilist_id=${id}` })
}

// transform the Anilist animes to AniAPI animes (not optimal)
const getTopAnimesSortBy = async (sortBy) => {
  const { data } = await getTopAnilistAnimesSortBy(sortBy)
  const ids = await data.Page.media.map((anime) => anime.id)
  const trendingAnimesResponses = await Promise.all(
    ids.map(getAnimeByAnilistId)
  )
  const trendingAnimes = await trendingAnimesResponses
    .map((res) => res.data.data.documents)
    .filter((doc) => doc && doc[0])
    .map((doc) => doc[0])
  return await { data: trendingAnimes, title: "Trending Now" }
}

// get top high score AniAPI animes
const getTopAnimes = async () => {
  const { data } = await callAnimeApi({ endpoint: "anime?page=1&per_page=10" })
  return { data: data.data.documents, title: "Top 100 Animes" }
}

// get top high score AniAPI animes from this season
const getTopAnimesThisSeason = async () => {
  const { value: currentSeason } = getCurrentSeason()
  const currentYear = getCurrentYear()
  const { data } = await callAnimeApi({
    endpoint: `anime?season=${currentSeason}&year=${currentYear}&per_page=5`
  })
  return { data: data.data.documents, title: "Top Animes This Season" }
}

// get AniAPI animes upcoming next season
const getUpcomingAnimes = async () => {
  const { value: nextSeason } = getNextSeason()
  let currentYear = getCurrentYear()
  if (nextSeason === "SPRING") ++currentYear

  const { data } = await callAnimeApi({
    endpoint: `anime?season=${nextSeason}&year=${currentYear}&per_page=5`
  })
  return { data: data.data.documents, title: "Upcoming Next Season" }
}

// fetch all required data for homepage
export const getHomeAnimes = async () => {
  const data = await Promise.all([
    getTopAnimesSortBy("TRENDING_DESC"),
    getTopAnimesThisSeason(),
    getUpcomingAnimes(),
    getTopAnimes()
  ])
  return await data
}

const initialState = {
  loading: null,
  error: null,
  data: null
}

// fetch and cache homepage data until 7:00AM in the next day
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
