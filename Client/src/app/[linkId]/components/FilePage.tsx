import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface FilePageProps {
  signedUrl: string;
}

const FilePage: React.FC<FilePageProps> = ({ signedUrl }) => {
  return (
    <div style={{ height: '100vh' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
        <Viewer fileUrl={signedUrl} />
      </Worker>
    </div>
  );
};

export default FilePage;
