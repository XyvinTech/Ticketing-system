import React from "react";
import Select from "react-select";

const StyledSearch = ({ options }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#9333EA' : 'transparent',
      cursor: 'pointer',
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: '0.375rem', // Rounded-md
    }),
  };

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
            primary: '#9333EA',   
          },
        })}
        name="search"
        options={options}
      />
    </>
  );
};

export default StyledSearch;
