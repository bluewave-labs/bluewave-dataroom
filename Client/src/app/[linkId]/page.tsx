import { Container } from '@mui/material';
import FileAccessPage from './components/FileAccessPage';

export default ({ params }) => {

  return (
    <Container
      sx={{
        width: '100%',
        margin: '0 auto',
        minHeight: '80vh',
        pr: '23rem',
      }}>
      <FileAccessPage linkId={params.linkId} />
    </Container>
  );
};
