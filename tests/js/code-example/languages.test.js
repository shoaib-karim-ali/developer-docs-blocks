import { describe, expect, it } from 'vitest';
import {
	DEFAULT_LANGUAGE,
	LANGUAGE_OPTIONS,
	SUPPORTED_LANGUAGES,
	getSafeLanguage,
} from '../../../src/code-example/languages';

describe( 'Code Example language configuration', () => {
	it( 'uses JavaScript as the default language', () => {
		expect( DEFAULT_LANGUAGE ).toBe( 'javascript' );
	} );

	it( 'provides unique language values', () => {
		const values = LANGUAGE_OPTIONS.map( ( option ) => option.value );

		expect( new Set( values ).size ).toBe( values.length );
	} );

	it( 'keeps supported languages in sync with the options', () => {
		expect( SUPPORTED_LANGUAGES ).toEqual(
			LANGUAGE_OPTIONS.map( ( option ) => option.value )
		);
	} );

	it( 'returns supported languages unchanged', () => {
		expect( getSafeLanguage( 'php' ) ).toBe( 'php' );
	} );

	it( 'falls back for unsupported or missing languages', () => {
		expect( getSafeLanguage( 'unknown' ) ).toBe( DEFAULT_LANGUAGE );
		expect( getSafeLanguage( undefined ) ).toBe( DEFAULT_LANGUAGE );
	} );
} );
