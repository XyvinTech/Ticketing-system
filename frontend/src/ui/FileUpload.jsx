import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginImagePreview);

const FileUpload = ({ onChange }) => {
  const handleFileChange = (fileItems) => {
    
    onChange(fileItems.map(fileItem => fileItem.file));
  };

  return (
    <div>
      <label className="mb-1 block text-sm text-gray-900">
        Attachments
      </label>
      <FilePond
        allowMultiple={true}
        onupdatefiles={handleFileChange} 
      />
    </div>
  );
};

export default FileUpload;
