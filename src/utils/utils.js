import { ANIME_CONSTANTS, ENUMS } from "./constants"

const { GENRES, SEASON, FORMATS, STATUS } = ANIME_CONSTANTS

// get the current season
export const getCurrentSeason = (d = new Date()) => {
  const seasonArray = [
    {
      value: "WINTER",
      label: "Winter",
      date: new Date(
        d.getFullYear(),
        11,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      value: "SPRING",
      label: "Spring",
      date: new Date(
        d.getFullYear(),
        2,
        d.getFullYear() % 4 === 0 ? 19 : 20
      ).getTime()
    },
    {
      value: "SUMMER",
      label: "Summer",
      date: new Date(
        d.getFullYear(),
        5,
        d.getFullYear() % 4 === 0 ? 20 : 21
      ).getTime()
    },
    {
      value: "FALL",
      label: "Fall",
      date: new Date(
        d.getFullYear(),
        8,
        d.getFullYear() % 4 === 0 ? 22 : 23
      ).getTime()
    }
  ]

  const season = seasonArray.filter(({ date }) => date <= d).slice(-1)[0] || {
    value: "WINTER",
    label: "Winter"
  }
  return season
}
