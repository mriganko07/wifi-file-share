import React from 'react';
import FileUploader from './FileUploader';
import FileReceiver from './FileReceiver';

function App() {
  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-700">Wi-Fi File Share</h1>
      <FileUploader />
      <FileReceiver />
    </div>
  );
}

export default App;
