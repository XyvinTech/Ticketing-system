import React from 'react';
import Select from 'react-select';

const StyledMultipleSelection = ({options,onChange = () => {}}) => {
  const handleChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map(option => option.value);
    // Call the onChange prop with the selected values
    onChange(selectedValues);
  };
  return (
    <div>
      <Select
        isMulti
        name="emails"
        options={options}
        theme={(theme) => ({
            ...theme,
            borderRadius: '0.375rem',
            colors: {
              ...theme.colors,
              primary25: '#9333EA', 
              primary: '#9333EA',   
            },
          })}
          onChange={handleChange}
        classNamePrefix="select"
      />
    </div>
  );
};

export default StyledMultipleSelection;
