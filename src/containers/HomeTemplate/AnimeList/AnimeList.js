import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import { useLocation } from "react-router-dom"

import styles from "./styles.module.scss"

import InfiniteCardList from "../../../components/InfiniteCardList"
import Filters from "../../../components/Filters"
import SubFilters from "../../../components/SubFilters"
import AnimeNotFound from "../../../components/AnimeNotFound"
import Loading from "../../../components/Loading"
import LoadingCardSkeleton from "../../../components/LoadingCardSkeleton"
import GridContainer from "../../../components/ui/GridContainer"
import { CARD_TYPES } from "../../../utils/constants"

import {
  selectAnimeList,
  fetchAllAnimes,
  fetchMoreAnimes
} from "../../../features/animeList/animeListSlice"

const AnimeList = () => {
  const { loading, data, error, page, allLoaded } = useSelector(selectAnimeList)

  const [view, setView] = useState(CARD_TYPES.DEFAULT)
  const location = useLocation()

  const dispatch = useDispatch()

  useEffect(() => {
    setView(localStorage.getItem("view") || CARD_TYPES.DEFAULT)
    dispatch(fetchAllAnimes({ searchString: location.search }))
    window.scrollTo(0, 0)
  }, [dispatch, location.search])

  const handleViewChange = useCallback((option) => {
    setView(option)
    localStorage.setItem("view", option)
  }, [])

  const fetchMoreData = () => {
    dispatch(fetchMoreAnimes({ searchString: location.search, page: page }))
  }

  return (
    <>
      <div style={{ marginTop: "80px", width: "100%" }}></div>
      <GridContainer>
        <Filters />
        <SubFilters view={view} handleViewChange={handleViewChange} />
        {loading && (
          <>
            <Loading type={view} />
            <LoadingCardSkeleton type={view} />
          </>
        )}
      </GridContainer>
      <div style={{ marginTop: "28px", width: "100%" }}></div>
      {data && data.length > 0 && (
        <>
          <InfiniteCardList
            animes={data}
            allLoaded={allLoaded}
            type={view}
            fetchMoreData={fetchMoreData}
          />
        </>
      )}
      {data && data.length === 0 && <AnimeNotFound message="No Results" />}
      {error && <AnimeNotFound message={error.message} />}
    </>
  )
}
export default AnimeList
