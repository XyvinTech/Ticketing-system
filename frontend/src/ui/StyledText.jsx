import React from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const StyledText = ({label}) => {
  return (
    <div>
         <label   class="mb-1 block text-sm font- text-gray-900">
        {label}
      </label>
       <ReactQuill
        theme="snow" 
        placeholder='Describe Your Issue......'
       
      >

      </ReactQuill>
    </div>
  )
}

export default StyledText
