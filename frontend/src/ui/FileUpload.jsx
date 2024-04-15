import React from 'react';
import { Controller } from 'react-hook-form'; // Import Controller component
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

// Optionally, you can import additional FilePond plugins if needed
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Register the plugins you want to use
registerPlugin(FilePondPluginImagePreview);

const FileUpload = ({ control, name }) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-gray-900">
        Attachments
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FilePond
            files={field.value} // Pass the value of the controlled component
            allowMultiple={true} // Allow multiple files to be uploaded
            onupdatefiles={(fileItems) => {
              // Set the value when files are updated
              field.onChange(fileItems.map((fileItem) => fileItem.file));
            }}
            server={{
              process: (fieldName, file, metadata, load, error, progress, abort) => {
                // You can implement your own server-side logic here for file uploads
                // Example implementation with fetch API:
                const formData = new FormData();
                formData.append(fieldName, file, file.name);

                fetch('/upload-endpoint', {
                  method: 'POST',
                  body: formData,
                  onUploadProgress: (event) => {
                    progress(event.lengthComputable, event.loaded, event.total);
                  },
                  onComplete: (data) => {
                    load(data);
                  },
                  onError: (err) => {
                    error(err);
                  },
                  onAbort: () => {
                    abort();
                  }
                });
              }
            }}
          />
        )}
      />
    </div>
  );
};

export default FileUpload;
