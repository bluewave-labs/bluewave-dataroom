import React from 'react';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('../../../utils/shared/PdfViewer'), { ssr: false });

interface FilePageProps {
  signedUrl: string;
}

const FilePage: React.FC<FilePageProps> = ({ signedUrl }) => {
  return (
    <PdfViewer pdfUrl={signedUrl} />
  );
};

export default FilePage;
