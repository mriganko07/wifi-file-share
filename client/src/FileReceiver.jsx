// FileReceiver.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const FileReceiver = () => {
  const [files, setFiles] = useState([]);
  const SERVER_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${SERVER_URL}/files`)
      .then(res => setFiles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.filename}>
            <a href={file.url} download>{file.filename}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileReceiver;
