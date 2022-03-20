import { Link } from "react-router-dom"

import styles from "./styles.module.scss"

import Chip from "../ui/Chip"
import RatingIcon from "../ui/RatingIcon"

import { ENUMS, ANIME_CONSTANTS } from "../../utils/constants"

const AnimeCardHorizontal = ({ anime }) => {
  const { STATUS, SEASON, FORMATS } = ANIME_CONSTANTS

  const genres = []

  const linkTo = `/anime/${anime.id}`

  //   get 5 genres
  for (let i = 0; i < 5; i++) {
    if (anime.genres[i]) genres.push(anime.genres[i])
  }

  return (
    <div className={styles.card}>
      <div className={styles.coverImageContainer}>
        <Link to={linkTo}>
          <img
            className={styles.coverImage}
            src={anime.cover_image}
            alt={anime.titles.en || anime.titles.rj}
          />
        </Link>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.titleGenresContainer}>
          <div>
            <Link to={linkTo} className={styles.title}>
              {anime.titles.en || anime.titles.rj}
            </Link>
            {genres.map((genre) => (
              <Chip key={genre} className={styles.chip}>
                {genre}
              </Chip>
            ))}
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.ratingContainer}>
            <RatingIcon score={anime.score} />
            <span className={styles.score}>{anime.score}%</span>
          </div>
          <div className={styles.subInfoContainer}>
            <span className={styles.textBold}>
              {FORMATS[ENUMS.FORMATS[anime.format]]}
            </span>
            <span className={styles.textLight}>
              {anime.episodes_count} episodes
            </span>
          </div>
          <div className={styles.subInfoContainer}>
            <span className={styles.textBold}>
              {SEASON[ENUMS.SEASON[anime.season_period]]} {anime.season_year}{" "}
            </span>
            <span className={styles.textLight}>
              {STATUS[ENUMS.STATUS[anime.status]]}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimeCardHorizontal
