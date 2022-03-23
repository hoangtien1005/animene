import { ANIME_BASE_URL, SERVER_BASE_URL } from "./constants"

import axios from "axios"

const callApi = (base_url) => {
  return async ({
    endpoint,
    method = "GET",
    payload = {},
    accessToken = null
  }) =>
    await axios({
      method,
      url: base_url + "/" + endpoint,
      data: payload,
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
}

export const callAnimeApi = callApi(ANIME_BASE_URL)
export const callServerApi = callApi(SERVER_BASE_URL)
