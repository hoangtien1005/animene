import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import { selectAnime } from "../../features/anime/animeSlice"

// import styles from "./style.module.scss"
import PaginationItem from "@mui/material/PaginationItem"

export default function CustomPagination({ total }) {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const { searchConfig } = useSelector(selectAnime)
  const page = parseInt(query.get("page") || "1", 10)
  const pages = Math.ceil(total / 100)

  // TODO: fetch by search when get url from new browser
  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        page={page}
        count={pages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/anime-list/?page=${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  )
}
