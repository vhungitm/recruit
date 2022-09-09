import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const Editor = ({ config, value, onChange }) => {
	const editor = useRef(null);

	const defaultConfig = {
		buttons: [
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'ul',
			'ol',
			'superscript',
			'subscript',
			'link',
			'outdent',
			'indent',
			'left'
		]
	};

	return (
		<JoditEditor
			ref={editor}
			value={value || ''}
			config={config || defaultConfig}
			tabIndex={1}
			onBlur={onChange}
		/>
	);
};
export default Editor;
