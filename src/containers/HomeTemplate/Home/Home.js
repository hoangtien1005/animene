import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo } from "react"
import { useLocation } from "react-router-dom"

import styles from "./styles.module.scss"
import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import { selectAnime, fetchAllAnimes } from "../../../features/anime/animeSlice"
import Pagination from "../../../components/Pagination"
import Loading from "../../../components/Loading"
import { generateApiParameters } from "../../../utils/utils"

const Home = ({}) => {
  const { loading, data, error } = useSelector(selectAnime)

  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log(generateApiParameters(location.search))

    dispatch(fetchAllAnimes(location.search))
  }, [dispatch, location.search])

  return (
    <>
      {loading && <Loading />}
      <Filters />
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
