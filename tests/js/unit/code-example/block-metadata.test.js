import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const blockMetadataPath = fileURLToPath(
	new URL( '../../../../src/code-example/block.json', import.meta.url )
);

const metadata = JSON.parse( readFileSync( blockMetadataPath, 'utf8' ) );

describe( 'Code Example block metadata', () => {
	it( 'defines the expected block identity', () => {
		expect( metadata ).toMatchObject( {
			apiVersion: 3,
			name: 'ddb/code-example',
			title: 'Code Example',
			category: 'text',
			textdomain: 'developer-docs-blocks',
		} );
	} );

	it( 'defines the required block metadata', () => {
		expect( metadata.version ).toBeTruthy();
		expect( metadata.description ).toBeTruthy();
		expect( metadata.icon ).toBeTruthy();
	} );

	it( 'disables custom HTML editing', () => {
		expect( metadata.supports.html ).toBe( false );
	} );

	it( 'enables the intended color support', () => {
		expect( metadata.supports.color ).toEqual( {
			background: true,
			text: true,
			gradients: false,
			link: false,
		} );
	} );

	it( 'enables the intended typography support', () => {
		expect( metadata.supports.typography ).toEqual( {
			fontSize: true,
			lineHeight: true,
		} );
	} );

	it( 'enables the intended spacing and border support', () => {
		expect( metadata.supports.spacing ).toEqual( {
			padding: true,
			margin: false,
		} );

		expect( metadata.supports.border ).toEqual( {
			radius: true,
		} );
	} );

	it( 'defines the code attribute correctly', () => {
		expect( metadata.attributes.code ).toEqual( {
			type: 'string',
			source: 'text',
			selector: 'code',
			default: '',
		} );
	} );

	it( 'defines the language attribute correctly', () => {
		expect( metadata.attributes.language ).toEqual( {
			type: 'string',
			default: 'javascript',
		} );
	} );

	it( 'defines the filename attribute correctly', () => {
		expect( metadata.attributes.fileName ).toEqual( {
			type: 'string',
			default: '',
		} );
	} );

	it( 'references the expected block assets', () => {
		expect( metadata.editorScript ).toBe( 'file:./index.js' );
		expect( metadata.editorStyle ).toBe( 'file:./index.css' );
		expect( metadata.style ).toBe( 'file:./style-index.css' );
	} );
} );
