import styles from "./styles.module.scss"
import Button from "../ui/Button"

const AnimeNotFound = ({ message }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.animeNotFound}>{message}</h3>
    </div>
  )
}
export default AnimeNotFound
