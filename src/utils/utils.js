import { ANIME_CONSTANTS } from "./constants"

const { GENRES, SEASON, FORMATS, STATUS } = ANIME_CONSTANTS

export const generateApiParameters = (searchConfig) => {
  if (!searchConfig) {
    return ""
  }

  let paramsString = ""
  Object.keys(searchConfig).forEach((key) => {
    const param = searchConfig[key]

    if (param.content) {
      // genres, formats
      if (param.multiple) {
        paramsString += `${key}=${param.content.join(",")}`
        // status, season, year, title
      } else {
        paramsString += `${key}=${param.content}`
      }
      // page
    } else if (key === "page") {
      if (param > 1) paramsString += `page=${param}`
    }
  })
  return paramsString
}

export const getAnimeConstantsValue = (type, key) => {
  switch (type) {
    case "genres":
      return GENRES.find((genre) => genre === key)
    case "season":
      return SEASON[parseInt(key)]
    case "formats":
      return FORMATS[parseInt(key)]
    case "status":
      return STATUS[parseInt(key)]
    default:
      return null
  }
}

export const getAnimeConstantsKey = (type, value) => {
  const getKeyByValue = (obj, value) => {
    return Object.keys(obj).find((key) => obj[key] === value)
  }

  switch (type) {
    case "genres":
      return GENRES.find((genre) => genre === value)
    case "season":
      return getKeyByValue(SEASON, value)
    case "formats":
      return getKeyByValue(FORMATS, value)
    case "status":
      return getKeyByValue(STATUS, value)
    default:
      return null
  }
}
