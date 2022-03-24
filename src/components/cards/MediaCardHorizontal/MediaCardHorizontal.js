import { Link } from "react-router-dom"
import styles from "./styles.module.scss"

import Chip from "../../ui/Chip"
import RatingIcon from "../../ui/RatingIcon"
import { ANIME_CONSTANTS, PATHS } from "../../../utils/constants"

const MediaCardHorizontal = ({ data }) => {
  const { STATUS, SEASON, FORMATS } = ANIME_CONSTANTS

  const linkTo = `${PATHS[data.type].DETAILS}/${data.id}`

  return (
    <div className={styles.card}>
      <div className={styles.coverImageContainer}>
        <Link to={linkTo}>
          <img
            className={styles.coverImage}
            src={data.coverImage?.large || data.image?.large}
            alt={data.title.romaji || data.title.english || data.title.native}
          />
        </Link>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.titleGenresContainer}>
          <div>
            <Link to={linkTo} className={styles.title}>
              {data.title
                ? data.title.romaji || data.title.english || data.title.native
                : data.name.full}
            </Link>
            <div className={styles.genresContainer}>
              {data.genres.map((genre) => (
                <Chip key={genre} className={styles.chip} type={data.type}>
                  {genre}
                </Chip>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.ratingContainer}>
            <RatingIcon score={data.averageScore} />
            <span className={styles.score}>{data.averageScore}%</span>
          </div>
          <div className={styles.subInfoContainer}>
            <span className={styles.textBold}>
              {FORMATS[data.format] || "Manga"}
            </span>
            {data.episodes && (
              <span className={styles.textLight}>{data.episodes} episodes</span>
            )}
            {data.chapters && (
              <span className={styles.textLight}>{data.episodes} chapters</span>
            )}
          </div>
          <div className={styles.subInfoContainer}>
            {data.season && (
              <span className={styles.textBold}>
                {SEASON[data.season]} {data.seasonYear}
              </span>
            )}
            {!data.season && (
              <span className={styles.textBold}>
                {data.startDate?.year}{" "}
                {data.endDate?.year && `- ${data.endDate?.year}`}
              </span>
            )}
            <span className={styles.textLight}>{STATUS[data.status]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MediaCardHorizontal
