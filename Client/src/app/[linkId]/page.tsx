import { Container } from '@mui/material';
import FileAccessContainer from './components/FileAccessContainer';

interface Params {
  linkId: string;
}

interface Props {
  params: Params;
}

export default ({ params: { linkId } }: Props) => {
  return <FileAccessContainer linkId={linkId} />;
};
