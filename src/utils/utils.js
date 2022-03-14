import { ANIME_CONSTANTS } from "./constants"

const { GENRES, SEASON, FORMAT, STATUS } = ANIME_CONSTANTS

export const getAnimeConstantsValue = (type, key) => {
  switch (type) {
    case "genres":
      return GENRES.find((genre) => genre === key)
    case "season":
      return SEASON[parseInt(key)]
    case "formats":
      return FORMAT[parseInt(key)]
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
      return getKeyByValue(FORMAT, value)
    case "status":
      return getKeyByValue(STATUS, value)
    default:
      return null
  }
}
