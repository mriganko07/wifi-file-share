import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function FileUploader() {
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState('');

  // const SERVER_URL = 'http://10.153.188.58:5000';
  const SERVER_URL = import.meta.env.VITE_API_URL;


  const onDrop = async (acceptedFiles) => {
    setError('');
    setProgress(0);
    setUploadedFile(null);

    const formData = new FormData();
    const file = acceptedFiles[0];
    formData.append('file', file);

    try {
      const response = await axios.post(`${SERVER_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setUploadedFile({
        name: response.data.filename,
        url: `${SERVER_URL}/${encodeURIComponent(response.data.filename)}`
      });
    } catch (err) {
      console.error(err);
      setError('Upload failed. Make sure server is running and accessible.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-dashed rounded-lg text-center cursor-pointer shadow-md">
      <div {...getRootProps()} className="p-6 bg-gray-100 hover:bg-gray-200 transition">
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag and drop a file here, or click to select</p>
      </div>

      {progress > 0 && (
        <div className="mt-4 text-blue-600">Upload Progress: {progress}%</div>
      )}

      {uploadedFile && (
        <div className="mt-4 text-green-600">
          ✅ File uploaded successfully!<br />
          <a href={uploadedFile.url} download={uploadedFile.name} className="underline text-blue-500">
            Download {uploadedFile.name}
          </a>
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-500">
          ❌ {error}
        </div>
      )}
    </div>
  );
}

export default FileUploader;
