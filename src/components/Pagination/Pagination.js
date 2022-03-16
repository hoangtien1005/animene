import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import Stack from "@mui/material/Stack"

import { Link, useLocation } from "react-router-dom"

import styles from "./styles.module.scss"

export default function CustomPagination({ total }) {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const page = parseInt(query.get("page") || "1", 10)
  const pages = Math.ceil(total / 100)
  let newSearch = ""
  if (page !== "1") {
    newSearch = location.search.split("&page")[0]
  }

  console.log(query.toString(), location.search)

  // const linkTo = `${newSearch}${item.page > 1 ? '&page=' + item.page : ''}`

  return (
    <Stack className={styles.paginationContainer} spacing={2}>
      <Pagination
        className={styles.pagination}
        page={page}
        count={pages}
        renderItem={(item) => {
          if (item.page !== page) {
            return (
              <PaginationItem
                component={Link}
                to={`${newSearch}${item.page > 1 ? "&page=" + item.page : ""}`}
                {...item}
              />
            )
          } else {
            return <PaginationItem {...item} />
          }
        }}
      />
    </Stack>
  )
}
