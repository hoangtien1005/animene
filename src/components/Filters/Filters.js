import Grid from "@mui/material/Grid"
import { useMemo } from "react"

import styles from "./styles.module.scss"

import Filter from "../Filter"

import { ANIME_CONSTANTS } from "../../utils/constants"

const Filters = ({}) => {
  const [genres, formats, ...filters] = useMemo(() => {
    const { SEASON, FORMATS, STATUS, GENRES, LATEST_YEAR } = ANIME_CONSTANTS
    const seasons = Object.values(SEASON).map((item, index) => ({
      label: item,
      value: index
    }))
    const formats = Object.values(FORMATS).map((item, index) => ({
      label: item,
      value: index
    }))
    const statuses = Object.values(STATUS).map((item, index) => ({
      label: item,
      value: index
    }))
    const years = [...Array(LATEST_YEAR - 1940 + 1).keys()]
      .reverse()
      .map((x) => ({ label: x + 1940 + "", value: x + 1940 + "" }))

    const genres = GENRES.map((genre) => ({ label: genre, value: genre }))

    const filters = [
      { title: "Genres", type: "genres", options: genres, multiple: true },
      { title: "Format", type: "formats", options: formats, multiple: true },
      { title: "Year", type: "year", options: years, multiple: false },
      { title: "Season", type: "season", options: seasons, multiple: false },
      { title: "Status", type: "status", options: statuses, multiple: false }
    ]
    return filters
  }, [])

  return (
    <>
      {[genres, formats].map((filter) => (
        <Grid item xs={12} sm={6} key={filter.type}>
          <h5 className={styles.filterTitle}>{filter.title}</h5>
          <Filter {...filter} />
        </Grid>
      ))}

      {filters.map((filter) => (
        <Grid item xs={12} sm={4} key={filter.type}>
          <h5 className={styles.filterTitle}>{filter.title}</h5>
          <Filter {...filter} />
        </Grid>
      ))}
      <div className={styles.separator}></div>
    </>
  )
}
export default Filters
