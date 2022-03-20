import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
import Select from "react-select"
import Grid from "@mui/material/Grid"
import ViewComfyIcon from "@mui/icons-material/ViewComfy"
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp"
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit"

import { memo } from "react"

import styles from "./styles.module.scss"
import clsx from "clsx"

import { ANIME_CONSTANTS } from "../../utils/constants"

const customTextStyles = {
  fontSize: "14px",
  fontWeight: "500"
}

const colorPrimary = "#18c1f0"

const customStyles = {
  control: (provided) => ({
    ...provided,
    height: "32px",
    overflow: "hidden",
    border: "none",
    outline: "none",
    backgroundColor: "transparent"
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "32px",
    minWidth: "80px",
    overflow: "hidden",
    outline: "none",
    textAlign: "right"
  }),
  indicatorSeparator: (provided) => ({
    display: "none"
  }),

  option: (provided, state) => {
    let color = state.isSelected ? colorPrimary : "#748899"
    let backgroundColor = provided.backgroundColor
    backgroundColor = state.isSelected ? "#EDF1F5" : "white"
    if (state.isFocused) color = colorPrimary
    return { ...provided, color, backgroundColor, ...customTextStyles }
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = "opacity 300ms"
    return {
      ...provided,
      opacity,
      transition,
      color: "#748899",
      ...customTextStyles
    }
  },
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: colorPrimary,
    borderRadius: "6px",
    color: "#fff"
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#fff"
  })
}

const SubFilters = ({ view, handleViewChange, handleSortChange }) => {
  const { SORTS } = ANIME_CONSTANTS

  console.log("sub-filter render")

  return (
    <Grid item xs={12}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        style={{ padding: "4px" }}
      >
        <Select
          isSearchable={false}
          onChange={handleSortChange}
          hideSelectedOptions={false}
          styles={customStyles}
          options={SORTS}
          defaultValue={SORTS[1]}
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <Stack direction="row" spacing={1} alignItems="center">
          <ViewComfyIcon
            onClick={() => handleViewChange("default")}
            className={clsx(styles.icon, {
              [styles.active]: view === "default"
            })}
          />
          <GridViewSharpIcon
            onClick={() => handleViewChange("square")}
            className={clsx(styles.icon, {
              [styles.active]: view === "square"
            })}
          />
          <VerticalSplitIcon
            onClick={() => handleViewChange("horizontal")}
            className={clsx(styles.icon, {
              [styles.active]: view === "horizontal"
            })}
          />
        </Stack>
      </Stack>
    </Grid>
  )
}
export default memo(SubFilters)
