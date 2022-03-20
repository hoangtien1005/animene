import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import { useLocation } from "react-router-dom"

import styles from "./styles.module.scss"

import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import SubFilters from "../../../components/SubFilters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"
import Pagination from "../../../components/Pagination"

import { selectAnime, fetchAllAnimes } from "../../../features/anime/animeSlice"

const Home = ({}) => {
  const { loading, data, error } = useSelector(selectAnime)

  const [view, setView] = useState("default")

  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    setView(localStorage.getItem("view") || "default")
    dispatch(fetchAllAnimes(location.search))
    window.scrollTo(0, 0)
  }, [dispatch, location.search])

  const handleSortChange = useCallback((option) => {
    console.log(option)
  }, [])

  const handleViewChange = useCallback((option) => {
    setView(option)
    localStorage.setItem("view", option)
  }, [])

  console.log("home render")

  return (
    <>
      <Filters />
      <SubFilters
        view={view}
        handleSortChange={handleSortChange}
        handleViewChange={handleViewChange}
      />
      {loading && <Loading type={view} />}
      {data && data.status_code === 200 && (
        <>
          <AnimeCardList animes={data.data.documents} type={view} />
          <Pagination total={data.data.count} />
        </>
      )}
      {data && data.status_code === 404 && (
        <AnimeNotFound message="No Results" />
      )}
      {error && <AnimeNotFound message={error.message} />}
    </>
  )
}
export default Home
