import styles from "./styles.module.scss"
import * as React from "react"
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Chip from "../ui/Chip"

const AnimeCard = ({ anime }) => {
  return (
    <Card className={styles.card} sx={{ maxWidth: 345 }}>
      <CardMedia
        className={styles.cardImage}
        component="img"
        image={anime.cover_image}
        alt="cover image"
      />
      <Typography
        className={styles.title}
        gutterBottom
        variant="h5"
        component="div"
      >
        {anime.titles.en || anime.titles.rj}
      </Typography>
    </Card>
  )
}

export default AnimeCard
