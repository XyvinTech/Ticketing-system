import React, { useEffect, useState } from "react";
import Select from "react-select";

const StyledSearch = ({ options, initialValue, onChange = () => {} }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#9333EA" : "transparent",
      cursor: "pointer",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
    }),
  };
  const [selectedOption, setSelectedOption] = useState(initialValue);

  useEffect(() => {
    setSelectedOption(initialValue);
  }, [initialValue]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(selectedOption ? selectedOption.value : null);
  };
  const customOptionLabel = ({ label, userType }) => (
    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
      <div>{label}</div>
      <span className="rounded-full px-2 py-px text-sm bg-red-100 text-red-800">{userType}</span>
    </div>
  );
  return (
    <>
      <Select
        className="basic-single"
        styles={customStyles}
        isClearable
        isSearchable
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "#9333EA",
          },
        })}
        name="search"
        options={options}
        value={selectedOption}
        onChange={handleChange}
        getOptionLabel={customOptionLabel}
      />
    </>
  );
};

export default StyledSearch;
