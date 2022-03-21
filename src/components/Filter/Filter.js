import { useMemo, memo } from "react"
import Select from "react-select"

import { useHistory, useLocation } from "react-router-dom"
const customTextStyles = {
  fontSize: "15px",
  fontWeight: "500"
}

const colorPrimary = "#18c1f0"

const customStyles = {
  placeholder: (provided) => ({
    ...provided,
    color: "#8ba0b2",
    ...customTextStyles
  }),
  control: (provided) => ({
    ...provided,
    height: "32px",
    overflow: "hidden",
    border: "none"
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "32px",
    overflow: "hidden"
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
      color: colorPrimary,
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

const Component = ({ title, options, type, multiple }) => {
  const location = useLocation()
  const history = useHistory()
  const params = useMemo(() => {
    return new URLSearchParams(location.search)
  }, [location.search])

  // calculate the default value for the filters
  const defaultValue = useMemo(() => {
    const paramsValue = params.get(type)
    // multiple value filters
    if (multiple && paramsValue) {
      const res = []
      for (const value of paramsValue.split(",")) {
        res.push(options.find((option) => option.value === value))
      }
      return res
      // single value filters
    } else if (paramsValue) {
      return options.find((option) => option.value === paramsValue)
    }
  }, [multiple, options, params, type])

  const handleChange = (selectedOptions) => {
    let value = ""
    if (multiple) {
      value = selectedOptions.map((option) => option.value).join(",")
    } else {
      value = selectedOptions ? selectedOptions.value : ""
    }
    const params = new URLSearchParams(location.search)
    value === "" ? params.delete(type) : params.set(type, value)
    params.delete("page")
    history.replace({ pathname: location.pathname, search: params.toString() })
  }
  return (
    <Select
      isClearable
      isSearchable
      closeMenuOnSelect={!multiple}
      onChange={handleChange}
      hideSelectedOptions={false}
      placeholder="Any"
      isMulti={multiple}
      styles={customStyles}
      options={options}
      defaultValue={defaultValue}
    />
  )
}

export default memo(Component)
