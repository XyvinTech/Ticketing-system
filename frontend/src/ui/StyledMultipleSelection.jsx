import React from 'react';
import Select from 'react-select';

const StyledMultipleSelection = () => {
  const emailOptions = [
    { value: 'email1@example.com', label: 'email1@example.com' },
    { value: 'email2@example.com', label: 'email2@example.com' },
    { value: 'email3@example.com', label: 'email3@example.com' },
    { value: 'email4@example.com', label: 'email4@example.com' },
  ];

  return (
    <div className='mt-20'>
      <Select
        isMulti
        name="emails"
        options={emailOptions}
        theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#9333EA', 
              primary: '#9333EA',   
            },
          })}
        classNamePrefix="select"
      />
    </div>
  );
};

export default StyledMultipleSelection;
