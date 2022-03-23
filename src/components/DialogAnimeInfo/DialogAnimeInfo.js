import Card from "@mui/material/Card"

import { useLayoutEffect, useRef } from "react"

import Chip from "../ui/Chip"
import RatingIcon from "../ui/RatingIcon"

import styles from "./styles.module.scss"

import { ANIME_CONSTANTS } from "../../utils/constants"

const DialogAnimeInfo = ({ anime }) => {
  const { STATUS, SEASON, FORMATS } = ANIME_CONSTANTS

  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  const ref = useRef(null)
  // check the current position and popup on the left side if current width > window width
  useLayoutEffect(() => {
    if (ref && ref.current.getBoundingClientRect().x + 300 > windowWidth) {
      ref.current.className += ` ${styles.left}`
    }
  }, [windowWidth])

  return (
    <Card className={styles.dialogInfo} ref={ref}>
      <div className={`${styles.infoContainer} ${styles.first}`}>
        <span>
          {SEASON[anime.season]} {anime.seasonYear}{" "}
        </span>
        <div className={styles.ratingContainer}>
          <RatingIcon score={anime.meanScore} />
          <span>
            {anime.meanScore}
            {anime.meanScore && "%"}
          </span>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.status}>{STATUS[anime.status]}</span>
      </div>
      <div className={styles.formatEpisodeContainer}>
        <span className={styles.format}>{FORMATS[anime.format]}</span>
        <span className={styles.episode}>{anime.episodes} episodes</span>
      </div>
      <div className={styles.chipContainer}>
        {anime.genres.map((genre) => (
          <Chip className={styles.chip} key={genre}>
            {genre}
          </Chip>
        ))}
      </div>
    </Card>
  )
}
export default DialogAnimeInfo
