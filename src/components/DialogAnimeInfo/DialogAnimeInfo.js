import Card from "@mui/material/Card"
import Chip from "../ui/Chip"
import styles from "./styles.module.scss"
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined"
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral"
import RatingIcon from "../ui/RatingIcon"
import { ANIME_CONSTANTS } from "../../utils/constants"
import { useLayoutEffect, useRef } from "react"
const DialogAnimeInfo = ({ anime }) => {
  const { STATUS, SEASON, FORMATS } = ANIME_CONSTANTS

  const genres = []
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

  //   get 3 genres
  for (let i = 0; i < 3; i++) {
    if (anime.genres[i]) genres.push(anime.genres[i])
  }

  return (
    <Card className={`${styles.dialogInfo}`} ref={ref}>
      <div className={`${styles.infoContainer} ${styles.first}`}>
        <span>
          {SEASON[anime.season_period]} {anime.season_year}{" "}
        </span>
        <div className={styles.ratingContainer}>
          <RatingIcon score={anime.score} />
          <span>{anime.score}%</span>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.status}>{STATUS[anime.status]}</span>
      </div>
      <div className={styles.infoContainer}>
        <span>{FORMATS[anime.format]}</span>
        <span>{anime.episodes_count} episodes</span>
      </div>
      <div className={styles.chipContainer}>
        {genres.map((genre) => (
          <Chip className={styles.chip} key={genre}>
            {genre}
          </Chip>
        ))}
      </div>
    </Card>
  )
}
export default DialogAnimeInfo
