import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import { useLocation } from "react-router-dom"

import styles from "./styles.module.scss"

import AnimeCardList from "../../../components/AnimeCardList"
import Filters from "../../../components/Filters"
import SubFilters from "../../../components/SubFilters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"

import { CARD_TYPES } from "../../../utils/constants"

import {
  selectAnimeList,
  fetchAllAnimes
} from "../../../features/animeList/animeListSlice"

const AnimeList = () => {
  const { loading, data, error } = useSelector(selectAnimeList)

  const [view, setView] = useState(CARD_TYPES.DEFAULT)
  const [page, setPage] = useState(1)
  console.log("view", view)
  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    setView(localStorage.getItem("view") || CARD_TYPES.DEFAULT)
    dispatch(fetchAllAnimes({ searchString: location.search, page: 1 }))
    window.scrollTo(0, 0)
  }, [dispatch, location.search])

  const handleViewChange = useCallback((option) => {
    setView(option)
    localStorage.setItem("view", option)
  }, [])

  console.log("anime list render")

  return (
    <>
      <div style={{ marginTop: "80px", width: "100%" }}></div>
      <Filters />
      <SubFilters view={view} handleViewChange={handleViewChange} />
      {loading && <Loading type={view} />}
      {data && data.length > 0 && (
        <>
          <AnimeCardList animes={data} type={view} />
        </>
      )}
      {console.log("data", data)}
      {data && data.length === 0 && <AnimeNotFound message="No Results" />}
      {error && <AnimeNotFound message={error.message} />}
    </>
  )
}
export default AnimeList
