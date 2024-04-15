import React from 'react';
import { Controller } from 'react-hook-form'; // Add this line
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const StyledText = ({ label, control, name }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-900">
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactQuill
            theme="snow" 
            value={field.value}
            onChange={field.onChange}
            placeholder='Describe Your Issue...'
          />
        )}
      />
    </div>
  );
};

export default StyledText;
