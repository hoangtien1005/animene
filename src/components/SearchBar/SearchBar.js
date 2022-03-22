import CloseIcon from "@mui/icons-material/Close"

import { useHistory, useLocation } from "react-router-dom"
import { useState, useRef, useMemo, useEffect, memo } from "react"

import styles from "./styles.module.scss"

const Component = () => {
  const location = useLocation()
  const history = useHistory()
  const params = useMemo(() => {
    return new URLSearchParams(location.search)
  }, [location.search])

  const [value, setValue] = useState(params.get("title") || "")
  const inputRef = useRef()

  useEffect(() => {
    if (value.trim() !== "") {
      const timer = setTimeout(() => {
        params.set("title", value)
        params.delete("page")
        history.replace({
          pathname: "/anime-list",
          search: params.toString()
        })
      }, 500)
      return () => clearTimeout(timer)
    } else {
      params.delete("title")
      history.replace({
        pathname: location.pathname,
        search: params.toString()
      })
    }
  }, [history, location.pathname, params, value])

  const handleInput = (inputValue) => {
    setValue(inputRef.current.value)
  }

  const handleClearInput = () => {
    setValue("")
  }

  return (
    <div className={styles.control}>
      <input
        onInput={handleInput}
        value={value}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        className={styles.input}
      />
      {value !== "" && (
        <CloseIcon onClick={handleClearInput} className={styles.closeIcon} />
      )}
    </div>
  )
}
export default memo(Component)
