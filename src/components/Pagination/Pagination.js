import * as React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { Link, useLocation } from "react-router-dom"

import styles from "./styles.module.scss"
import PaginationItem from "@mui/material/PaginationItem"

export default function CustomPagination({ total }) {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get("page") || "1", 10)
  const pages = Math.ceil(total / 100)
  if (page !== "1") {
    query.delete("page")
  }
  return (
    <Stack className={styles.paginationContainer} spacing={2}>
      <Pagination
        className={styles.pagination}
        page={page}
        count={pages}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/anime-list?${query.toString()}&page=${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  )
}
