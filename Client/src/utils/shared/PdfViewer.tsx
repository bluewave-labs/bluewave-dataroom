import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import { Box } from '@mui/material';

// Set the worker source copy the worker file from node_modules/pdfjs-dist/build/pdf.worker.min.js to public/pdf.worker.min.mjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdfDocument = await loadingTask.promise;
      setPdf(pdfDocument);
      setTotalPages(pdfDocument.numPages);
    };

    loadPdf();
  }, [pdfUrl]);

  useEffect(() => {
    if (pdf) {
      const renderPage = async () => {
        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;

        if (canvas) {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const renderContext = {
              canvasContext: context,
              viewport,
            };

            await page.render(renderContext).promise;
          }
        }
      };

      renderPage();
    }
  }, [pdf, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'antiquewhite',
    }}>
      <canvas ref={canvasRef} />
      <Box sx={{ display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <p style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </Box>
    </Box>
  );
};

export default PdfViewer;
