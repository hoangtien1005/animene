import { animeApi, serverApi } from "./constants"

import axios from "axios"

export const callAnimeApi = async ({
  endpoint,
  method = "GET",
  payload = {}
}) => {
  return await axios({
    method,
    url: animeApi + "/" + endpoint,
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
    url: serverApi + "/" + endpoint,
    data: payload,
    headers: {
      Authorization: "Bearer " + accessToken
    }
  })
}
