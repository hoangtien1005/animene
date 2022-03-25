import styles from "./styles.module.scss"

const ResultNotFound = ({ message }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.animeNotFound}>{message}</h3>
    </div>
  )
}
export default ResultNotFound
