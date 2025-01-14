import { useState } from 'react';
import DragAndDropBox from '../app/documents/components/DragAndDropBox';
import CustomUploader from './CustomUploader';

const FileManager = () => {
	const [btnclicked, setButtonClicked] = useState(false);

	return (
		<div>
			<DragAndDropBox
				setButtonClicked={setButtonClicked}
				text='Upload Documents'
			/>
			<CustomUploader btnstate={btnclicked} />
		</div>
	);
};

export default FileManager;
