import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './edit.jsx';
import save from './save';

import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
