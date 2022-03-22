import Stack from "@mui/material/Stack"

import { Link } from "react-router-dom"

import styles from "./styles.module.scss"

import Chip from "../ui/Chip"
import RatingIcon from "../ui/RatingIcon"

import { ENUMS, ANIME_CONSTANTS } from "../../utils/constants"

const AnimeCardSquare = ({ anime }) => {
  const { SEASON, FORMATS } = ANIME_CONSTANTS
  const genres = []
  const linkTo = `/anime/${anime.id}`
  //   get 3 genres
  for (let i = 0; i < 3; i++) {
    if (anime.genres[i]) genres.push(anime.genres[i])
  }
  return (
    <Stack className={styles.card} direction="row">
      <div className={styles.coverImageContainer}>
        <Link to={linkTo}>
          <img
            className={styles.coverImage}
            src={anime.cover_image}
            alt={anime.titles.en || anime.titles.rj}
          />
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>
              {anime.titles.en || anime.titles.rj}
            </h5>
          </div>
        </Link>
      </div>
      <Stack className={styles.cardContainer} justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={{ padding: "16px" }}
        >
          <div>
            <span className={styles.season}>
              {SEASON[ENUMS.SEASON[anime.season_period]]} {anime.season_year}{" "}
            </span>
            <div>
              <span className={styles.format}>
                {FORMATS[ENUMS.FORMATS[anime.format]]}
              </span>
              <span className={styles.divider}>•</span>
              <span className={styles.episode}>
                {anime.episodes_count} episodes
              </span>
            </div>
          </div>
          <div className={styles.ratingContainer}>
            <RatingIcon score={anime.score} />
            <span className={styles.score}>{anime.score}%</span>
          </div>
        </Stack>
        <div
          className={styles.descriptionContainer}
          dangerouslySetInnerHTML={{
            __html:
              anime.descriptions.en || anime.descriptions.jp || "No Description"
          }}
        ></div>
        <Stack
          className={styles.chipContainer}
          direction="row"
          alignItems="center"
        >
          {genres.map((genre) => (
            <Chip key={genre} className={styles.chip}>
              {genre}
            </Chip>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
export default AnimeCardSquare
