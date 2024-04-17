// StyledText.js
import React from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StyledText = ({ label, field }) => {
  const handleQuillChange = (content) => {
    field.onChange(content);
  };
  

  return (
    <div>
      <label className="mb-1 block text-sm text-gray-900">
        {label}
      </label>
      <ReactQuill
        theme="snow" 
        value={field.value}
        onChange={handleQuillChange}
        placeholder='Describe Your Issue...'
        style={{ height: '150px' }} // Set the height of the editor
      />
    </div>
  );
};

export default StyledText;
