import React, { useState } from "react";
import Select from "react-select";

const StyledSearch = () => {
    const emailOptions = [
        { value: 'email1@example.com', label: 'email1@example.com' },
        { value: 'email2@example.com', label: 'email2@example.com' },
        { value: 'email3@example.com', label: 'email3@example.com' },
        { value: 'email4@example.com', label: 'email4@example.com' },
      ];
      const customStyles = {
        option: (provided, state) => ({
          ...provided,
          color: state.isSelected ? 'white' : 'black', // Default text color
          backgroundColor: state.isSelected ? '#9333EA' : 'transparent', // Example background color for selected option
          cursor: 'pointer',
        }),
      };
  return (
    <>
      <Select
        className="basic-single"
        placeholder="Search" 
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
        options={emailOptions}
      />
    </>
  );
};

export default StyledSearch;
