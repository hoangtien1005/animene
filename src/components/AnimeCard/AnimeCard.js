import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"

import { useState } from "react"
import { Link } from "react-router-dom"

import DialogAnimeInfo from "../DialogAnimeInfo"

import styles from "./styles.module.scss"

const AnimeCard = ({ anime }) => {
  const [showDialog, setShowDialog] = useState(false)

  const windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

  const linkTo = `/anime/${anime.id}`

  const handleMouseEnter = (e) => {
    setShowDialog(true)
  }

  const handleMouseLeave = () => {
    setShowDialog(false)
  }

  return (
    <div className={styles.cardContainer}>
      <Card
        className={styles.card}
        sx={{ maxWidth: 345 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={linkTo}>
          <CardMedia
            className={styles.cardImage}
            component="img"
            image={anime.cover_image}
            alt={anime.titles.en || anime.titles.rj}
          />
        </Link>
        <Typography
          className={styles.title}
          gutterBottom
          variant="h5"
          component={Link}
          to={linkTo}
        >
          {anime.titles.en || anime.titles.rj}
        </Typography>
      </Card>
      {windowWidth > 890 && showDialog && <DialogAnimeInfo anime={anime} />}
    </div>
  )
}

export default AnimeCard
