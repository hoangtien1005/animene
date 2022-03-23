import { Link } from "react-router-dom"
import styles from "./styles.module.scss"

import Chip from "../ui/Chip"
import RatingIcon from "../ui/RatingIcon"

import { ANIME_CONSTANTS } from "../../utils/constants"

const AnimeCardHorizontal = ({ anime }) => {
  const { STATUS, SEASON, FORMATS } = ANIME_CONSTANTS

  const linkTo = `/anime/${anime.id}`

  return (
    <div className={styles.card}>
      <div className={styles.coverImageContainer}>
        <Link to={linkTo}>
          <img
            className={styles.coverImage}
            src={anime.coverImage.large}
            alt={
              anime.title.romaji || anime.title.english || anime.title.native
            }
          />
        </Link>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.titleGenresContainer}>
          <div>
            <Link to={linkTo} className={styles.title}>
              {anime.title.romaji || anime.title.english || anime.title.native}
            </Link>
            <div className={styles.genresContainer}>
              {anime.genres.map((genre) => (
                <Chip key={genre} className={styles.chip}>
                  {genre}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.ratingContainer}>
            <RatingIcon score={anime.meanScore} />
            <span className={styles.score}>{anime.meanScore}%</span>
          </div>
          <div className={styles.subInfoContainer}>
            <span className={styles.textBold}>{FORMATS[anime.format]}</span>
            <span className={styles.textLight}>{anime.episodes} episodes</span>
          </div>
          <div className={styles.subInfoContainer}>
            <span className={styles.textBold}>
              {SEASON[anime.season]} {anime.seasonYear}{" "}
            </span>
            <span className={styles.textLight}>{STATUS[anime.status]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimeCardHorizontal
