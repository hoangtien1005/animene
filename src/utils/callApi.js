import { ANIME_BASE_URL, SERVER_BASE_URL } from "./constants"

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
