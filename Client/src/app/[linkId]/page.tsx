import { Container } from '@mui/material';
import FileAccessPage from './components/FileAccessPage';

interface Params {
  linkId: string;
}

interface Props {
  params: Params;
}


export default ({ params: { linkId } }: Props) => {

  return (
    <Container
      sx={{
        width: '100%',
        margin: '0 auto',
        minHeight: '80vh',
        pr: '23rem',
      }}>
      <FileAccessPage linkId={linkId} />
    </Container>
  );
};
