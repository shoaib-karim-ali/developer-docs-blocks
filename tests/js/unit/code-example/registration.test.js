import { describe, expect, it, vi } from 'vitest';

const { registerBlockTypeMock } = vi.hoisted( () => ( {
	registerBlockTypeMock: vi.fn(),
} ) );

vi.mock( '@wordpress/blocks', () => ( {
	registerBlockType: registerBlockTypeMock,
} ) );

vi.mock( '../../../../src/code-example/edit.jsx', () => ( {
	default: () => null,
} ) );

vi.mock( '../../../../src/code-example/save.jsx', () => ( {
	default: () => null,
} ) );

vi.mock( '../../../../src/code-example/style.scss', () => ( {} ) );

import metadata from '../../../../src/code-example/block.json';
import Edit from '../../../../src/code-example/edit.jsx';
import save from '../../../../src/code-example/save.jsx';

describe( 'Code Example block registration', () => {
	it( 'registers the block with its metadata, editor, and save components', async () => {
		await import( '../../../../src/code-example/index.js' );

		expect( registerBlockTypeMock ).toHaveBeenCalledExactlyOnceWith(
			metadata.name,
			{
				edit: Edit,
				save,
			}
		);
	} );
} );
