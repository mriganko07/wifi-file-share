// FileReceiver.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const FileReceiver = () => {
  const [files, setFiles] = useState([]);
  
  const SERVER_PORT = import.meta.env.VITE_API_PORT || '5000';
  const SERVER_URL = `http://${window.location.hostname}:${SERVER_PORT}`;


  useEffect(() => {
    // axios.get('http://10.153.188.58:5000/files')

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
