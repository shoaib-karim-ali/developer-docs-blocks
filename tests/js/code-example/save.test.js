import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock( '@wordpress/block-editor', () => ( {
	useBlockProps: {
		save: () => ( {} ),
	},
} ) );

import save from '../../../src/code-example/save';

function renderSavedBlock( attributes ) {
	return renderToStaticMarkup( save( { attributes } ) );
}

describe( 'Code Example block save function', () => {
	it( 'saves code with the selected language class', () => {
		const markup = renderSavedBlock( {
			code: 'const value = 1;',
			language: 'javascript',
			fileName: '',
		} );

		expect( markup ).toContain(
			'<code class="language-javascript">const value = 1;</code>'
		);
	} );

	it( 'displays the filename when provided', () => {
		const markup = renderSavedBlock( {
			code: 'echo "Hello";',
			language: 'php',
			fileName: 'example.php',
		} );

		expect( markup ).toContain(
			'<div class="ddb-code-example__filename">example.php</div>'
		);
		expect( markup ).toContain( 'class="language-php"' );
	} );

	it( 'omits the filename element when the filename is empty', () => {
		const markup = renderSavedBlock( {
			code: 'console.log( "Hello" );',
			language: 'javascript',
			fileName: '',
		} );

		expect( markup ).not.toContain( 'ddb-code-example__filename' );
	} );

	it( 'escapes HTML characters in code content', () => {
		const markup = renderSavedBlock( {
			code: '<script>alert("test")</script>',
			language: 'html',
			fileName: '',
		} );

		expect( markup ).toContain(
			'&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;'
		);
		expect( markup ).not.toContain( '<script>' );
	} );

	it( 'falls back to JavaScript for an unsupported language', () => {
		const markup = renderSavedBlock( {
			code: 'const value = 1;',
			language: 'invalid language',
			fileName: '',
		} );

		expect( markup ).toContain( 'class="language-javascript"' );
		expect( markup ).not.toContain( 'language-invalid language' );
	} );
} );
