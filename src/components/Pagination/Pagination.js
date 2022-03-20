import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import Stack from "@mui/material/Stack"

import { useLocation, useHistory } from "react-router-dom"

import styles from "./styles.module.scss"

export default function CustomPagination({ total: totalPages }) {
  const location = useLocation()
  const history = useHistory()
  const params = new URLSearchParams(location.search)
  const page = parseInt(params.get("page") || "1", 10)
  const pages = Math.ceil(totalPages / 100)

  const handleChange = (e, value) => {
    if (value === 1 || value === "1") {
      params.delete("page")
    } else params.set("page", value)
    history.replace({ pathname: location.pathname, search: params.toString() })
  }

  return (
    <Stack className={styles.paginationContainer} spacing={2}>
      <Pagination
        className={styles.pagination}
        page={page}
        count={pages}
        onChange={handleChange}
        renderItem={(item) => <PaginationItem {...item} />}
      />
    </Stack>
  )
}
