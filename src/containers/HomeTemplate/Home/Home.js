import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"

import styles from "./styles.module.scss"
import AnimeCardList from "../../../components/AnimeCardList"
import { selectAnime, fetchAllAnimes } from "../../../features/anime/animeSlice"
import Pagination from "../../../components/Pagination"
import Loading from "../../../components/Loading"

const Home = ({}) => {
  const { loading, data, error, searchConfig } = useSelector(selectAnime)
  console.log(loading, data, error, searchConfig)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllAnimes())
  }, [dispatch])

  return (
    <>
      {loading && <Loading />}
      {data && data.status_code === 200 && (
        <>
          <AnimeCardList animes={data.data.documents} />
          <Pagination total={data.data.count} />
        </>
      )}
      {error && <p>Error</p>}
    </>
  )
}
export default Home
