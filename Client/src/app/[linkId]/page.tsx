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
    <FileAccessPage linkId={linkId} />
  );
};
