import Grid from "@mui/material/Grid"
import { useMemo, useState, useCallback } from "react"

import styles from "./styles.module.scss"
import clsx from "clsx"

import Filter from "../Filter"
import SearchBar from "../SearchBar"
import FilterAltIcon from "@mui/icons-material/FilterAlt"

import { ANIME_CONSTANTS } from "../../utils/constants"

const Filters = () => {
  const [showFilters, setShowFilters] = useState(true)

  console.log("filters render")

  const handleShowFilters = useCallback(() => {
    setShowFilters((prevState) => !prevState)
  }, [])

  const [genres, formats, ...filters] = useMemo(() => {
    const { SEASON, FORMATS, STATUS, GENRES, LATEST_YEAR } = ANIME_CONSTANTS

    const seasons = Object.keys(SEASON).map((key) => ({
      label: SEASON[key],
      value: key
    }))
    const formats = Object.keys(FORMATS).map((key) => ({
      label: FORMATS[key],
      value: key
    }))
    const statuses = Object.keys(STATUS).map((key) => ({
      label: STATUS[key],
      value: key
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
      <Grid item xs={10} sm={11}>
        <h5 className={styles.filterTitle}>Search</h5>
        <SearchBar />
      </Grid>
      <Grid item xs={2} sm={1}>
        <div className={styles.filterIconContainer}>
          <FilterAltIcon
            onClick={handleShowFilters}
            className={clsx(styles.filterIcon, {
              [styles.active]: showFilters
            })}
          />
        </div>
      </Grid>
      {showFilters &&
        [genres, formats].map((filter) => (
          <Grid item xs={12} sm={6} key={filter.type}>
            <h5 className={styles.filterTitle}>{filter.title}</h5>
            <Filter {...filter} />
          </Grid>
        ))}

      {showFilters &&
        filters.map((filter) => (
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
