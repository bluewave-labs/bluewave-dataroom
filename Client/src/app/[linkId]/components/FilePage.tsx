import React from 'react';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('../../../utils/shared/PdfViewer'), { ssr: false });

interface FilePageProps {
  signedUrl: string;
}

const FilePage: React.FC<FilePageProps> = ({ signedUrl }) => {
  return (
    <div>
      <h1>PDF Viewer</h1>
      <PdfViewer pdfUrl={signedUrl} />
    </div>
  );
};

export default FilePage;
