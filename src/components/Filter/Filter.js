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
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#18c1f0" : "black",
    backgroundColor: "white"
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1
    const transition = "opacity 300ms"
    return { ...provided, opacity, transition, color: "#18c1f0" }
  }
}

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
]

const Component = () => {
  const handleChange = (selectedOptions) => {
    console.log(selectedOptions)
  }
  return (
    <Select
      isClearable
      isSearchable
      onChange={handleChange}
      hideSelectedOptions={false}
      placeholder="any"
      isMulti
      styles={customStyles}
      options={options}
    />
  )
}

export default Component
