import Select from "react-select"

const customStyles = {
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
    let color = state.isSelected ? "#18c1f0" : "#748899"
    let backgroundColor = provided.backgroundColor
    backgroundColor = state.isSelected ? "#EDF1F5" : "white"
    if (state.isFocused) color = "#18c1f0"
    return { ...provided, color, backgroundColor }
  },
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = "opacity 300ms"
    return { ...provided, opacity, transition, color: "#18c1f0" }
  }
}

const Component = ({ title, options, type, multiple }) => {
  const handleChange = (selectedOptions) => {
    console.log(selectedOptions)
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
    />
  )
}

export default Component
