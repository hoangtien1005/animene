import Stack from "@mui/material/Stack"

import { Link } from "react-router-dom"

import styles from "./styles.module.scss"

import Chip from "../ui/Chip"
import RatingIcon from "../ui/RatingIcon"

import { ANIME_CONSTANTS } from "../../utils/constants"

const AnimeCardSquare = ({ anime }) => {
  const { SEASON, FORMATS } = ANIME_CONSTANTS

  const linkTo = `/anime/${anime.id}`

  return (
    <Stack className={styles.card} direction="row">
      <div className={styles.coverImageContainer}>
        <Link to={linkTo}>
          <img
            className={styles.coverImage}
            src={anime.coverImage.large}
            alt={
              anime.title.romaji || anime.title.english || anime.title.native
            }
          />
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>
              {anime.title.romaji || anime.title.english || anime.title.native}
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
              {SEASON[anime.season]} {anime.seasonYear}{" "}
            </span>
            <div>
              <span className={styles.format}>{FORMATS[anime.format]}</span>
              <span className={styles.divider}>•</span>
              <span className={styles.episode}>{anime.episodes} episodes</span>
            </div>
          </div>
          <div className={styles.ratingContainer}>
            <RatingIcon score={anime.meanScore} />
            <span className={styles.score}>{anime.meanScore}%</span>
          </div>
        </Stack>
        <div
          className={styles.descriptionContainer}
          dangerouslySetInnerHTML={{
            __html: anime.description || anime.description || "No Description"
          }}
        ></div>
        <Stack
          className={styles.chipContainer}
          direction="row"
          alignItems="center"
        >
          <div className={styles.genresContainer}>
            {anime.genres.map((genre) => (
              <Chip key={genre} className={styles.chip}>
                {genre}
              </Chip>
            ))}
          </div>
        </Stack>
      </Stack>
    </Stack>
  )
}
export default AnimeCardSquare
