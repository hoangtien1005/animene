import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState, useCallback } from "react"
import { useLocation, useParams } from "react-router-dom"

import styles from "./styles.module.scss"

import Loading from "../../../components/Loading"

import { selectAnime, fetchAnimeById } from "../../../features/anime/animeSlice"

const Component = ({}) => {
  const { loading, data, error } = useSelector(selectAnime)

  const location = useLocation()
  const { anime_id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAnimeById(anime_id))
    window.scrollTo(0, 0)
  }, [dispatch, anime_id])

  return (
    <>
      {loading && <Loading single />}
      <div className={styles.bannerSpacer}></div>
      {data && data.status_code === 200 && (
        <div
          className={styles.banner}
          style={{ backgroundImage: `url(${data.data.banner_image})` }}
        ></div>
      )}
      {console.log(data)}
    </>
  )
}
export default Component
