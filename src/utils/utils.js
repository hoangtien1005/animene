import { ANIME_CONSTANTS } from "./constants"

const { GENRES, SEASON, FORMATS, STATUS } = ANIME_CONSTANTS

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const generateApiParameters = (searchString) => {
  if (!searchString) {
    return ""
  }

  const res = []
  const rawParamsStrings = searchString.slice(1).split("&")
  rawParamsStrings.forEach((string) => {
    const [type, value] = string.split("=")
    if (type === "year" || type === "page") {
      res.push(string)
    } else if (type === "genres") {
      const standardValue = value
        .split(",")
        .map((genre) => capitalizeFirstLetter(genre))
        .join(",")
      res.push([type, standardValue].join("="))
    } else {
      const standardValue = getAnimeConstantsKey(
        type,
        capitalizeFirstLetter(value)
      )
      res.push([type, standardValue].join("="))
    }
  })
  if (res.length > 0) return res.join("&")
  return ""
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
    return Object.keys(obj).find((key) => {
      return (
        obj[key] === value ||
        obj[key] === capitalizeFirstLetter(value) ||
        obj[key] === value.toUpperCase()
      )
    })
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

// get the current season
export const getCurrentSeason = (d = new Date()) => {
  const seasonArray = [
    {
      value: 0,
      label: "Winter",
      date: new Date(
        d.getFullYear(),
        11,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      value: 1,
      label: "Spring",
      date: new Date(
        d.getFullYear(),
        2,
        d.getFullYear() % 4 === 0 ? 19 : 20
      ).getTime()
    },
    {
      value: 2,
      label: "Summer",
      date: new Date(
        d.getFullYear(),
        5,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      value: 3,
      label: "Fall",
      date: new Date(
        d.getFullYear(),
        8,
        d.getFullYear() % 4 === 0 ? 22 : 23
      ).getTime()
    }
  ]

  const season = seasonArray.filter(({ date }) => date <= d).slice(-1)[0] || {
    value: 0,
    label: "Winter"
  }
  return season
}
