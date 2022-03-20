import styles from "./styles.module.scss"
import clsx from "clsx"
import Chip from "../ui/Chip"
import RatingIcon from "../ui/RatingIcon"
import { ANIME_CONSTANTS } from "../../utils/constants"

const AnimeCardHorizontal = ({ anime }) => {
  const { STATUS, SEASON, FORMATS } = ANIME_CONSTANTS

  const genres = []

  //   get 5 genres
  for (let i = 0; i < 5; i++) {
    if (anime.genres[i]) genres.push(anime.genres[i])
  }

  return (
    <div className={styles.card}>
      <div className={styles.coverImageContainer}>
        <img
          className={styles.coverImage}
          src={anime.cover_image}
          alt={anime.titles.en || anime.titles.rj}
        />
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.titleGenresContainer}>
          <div>
            <h5 className={styles.title}>
              {anime.titles.en || anime.titles.rj}
            </h5>
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
            <span className={styles.textBold}>{FORMATS[anime.format]}</span>
            <span className={styles.textLight}>
              {anime.episodes_count} episodes
            </span>
          </div>
          <div className={styles.subInfoContainer}>
            <span className={styles.textBold}>
              {SEASON[anime.season_period]} {anime.season_year}{" "}
            </span>
            <span className={styles.textLight}>{STATUS[anime.status]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AnimeCardHorizontal
