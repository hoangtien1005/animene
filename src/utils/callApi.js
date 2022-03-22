import { ANIME_BASE_URL, SERVER_BASE_URL } from "./constants"
import { getCurrentYear, getCurrentSeason, getNextSeason } from "./utils"

import axios from "axios"

export const callAnimeApi = async ({
  endpoint,
  method = "GET",
  payload = {}
}) => {
  return await axios({
    method,
    url: ANIME_BASE_URL + "/" + endpoint,
    data: payload,
    headers: {}
  })
}

export const callServerApi = async ({
  endpoint,
  method = "GET",
  payload = {},
  accessToken = null
}) => {
  return await axios({
    method,
    url: SERVER_BASE_URL + "/" + endpoint,
    data: payload,
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
}

// POPULARITY_DESC
// TRENDING_DESC
// SCORE_DESC
// FAVOURITES_DESC

const getTopAnilistAnimesSortBy = (sortBy = "TRENDING_DESC") => {
  // the number of animes to be fetched
  const perPage = 10

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
  var url = "https://graphql.anilist.co",
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

const getAnimeByAnilistId = async (id) => {
  return await callAnimeApi({ endpoint: `anime?anilist_id=${id}` })
}

const getTopAnimesSortBy = async (sortBy) => {
  const { data } = await getTopAnilistAnimesSortBy(sortBy)
  const ids = await data.Page.media.map((anime) => anime.id)
  const trendingAnimesResponses = await Promise.all(
    ids.map(getAnimeByAnilistId)
  )
  const trendingAnimesDocuments = await trendingAnimesResponses.map(
    (res) => res.data.data.documents
  )
  const trendingAnimes = await trendingAnimesDocuments
    .filter((doc) => doc && doc[0])
    .map((doc) => doc[0])
  return await { data: trendingAnimes, title: "Trending Now" }
}

const getTopAnimes = async () => {
  const { data } = await callAnimeApi({ endpoint: "anime?page=1&per_page=10" })
  return { data: data.data.documents, title: "Top 100 Animes" }
}

const getTopAnimesThisSeason = async () => {
  const { value: currentSeason } = getCurrentSeason()
  const currentYear = getCurrentYear()
  const { data } = await callAnimeApi({
    endpoint: `anime?season=${currentSeason}&year=${currentYear}&per_page=5`
  })
  return { data: data.data.documents, title: "Top Animes This Season" }
}

const getUpcomingAnimes = async () => {
  const { value: nextSeason } = getNextSeason()
  let currentYear = getCurrentYear()
  if (nextSeason === "SPRING") ++currentYear

  const { data } = await callAnimeApi({
    endpoint: `anime?season=${nextSeason}&year=${currentYear}&per_page=5`
  })
  return { data: data.data.documents, title: "Upcoming Next Season" }
}

export const getHomeAnimes = async () => {
  const data = await Promise.all([
    getTopAnimesSortBy("TRENDING_DESC"),
    getTopAnimesThisSeason(),
    getUpcomingAnimes(),
    getTopAnimes()
  ])
  return await data
}
