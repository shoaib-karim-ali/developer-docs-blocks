// @vitest-environment jsdom

import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Edit from '../../../../src/code-example/edit.jsx';

function renderEdit( initialAttributes = {} ) {
	const setAttributes = vi.fn();

	function Harness() {
		const [ attributes, setCurrentAttributes ] =
			useState( initialAttributes );

		const updateAttributes = ( updates ) => {
			setAttributes( updates );

			setCurrentAttributes( ( current ) => ( {
				...current,
				...updates,
			} ) );
		};

		return (
			<Edit
				attributes={ attributes }
				setAttributes={ updateAttributes }
			/>
		);
	}

	return {
		...render( <Harness /> ),
		setAttributes,
	};
}

vi.mock( '@wordpress/i18n', () => ( {
	__: ( text ) => text,
} ) );

vi.mock( '@wordpress/block-editor', () => ( {
	InspectorControls: ( { children } ) => <div>{ children }</div>,
	useBlockProps: ( props ) => props,
	getFontSizeClass: ( fontSize ) =>
		fontSize ? `has-${ fontSize }-font-size` : undefined,
} ) );

vi.mock( '@wordpress/components', () => ( {
	PanelBody: ( { children } ) => <div>{ children }</div>,

	SelectControl: ( { label, value, options, onChange } ) => (
		<>
			<label htmlFor="language-control">{ label }</label>
			<select
				id="language-control"
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
			>
				{ options.map( ( option ) => (
					<option key={ option.value } value={ option.value }>
						{ option.label }
					</option>
				) ) }
			</select>
		</>
	),

	TextControl: ( { label, value, onChange } ) => (
		<>
			<label htmlFor="filename-control">{ label }</label>
			<input
				id="filename-control"
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
			/>
		</>
	),

	TextareaControl: ( {
		label,
		value,
		onChange,
		placeholder,
		rows,
		className,
		style,
	} ) => (
		<>
			<label htmlFor="code-control">{ label }</label>
			<textarea
				id="code-control"
				value={ value }
				onChange={ ( event ) => onChange( event.target.value ) }
				placeholder={ placeholder }
				rows={ rows }
				className={ className }
				style={ style }
			/>
		</>
	),
} ) );

vi.mock( '../../../../src/code-example/editor.scss', () => ( {} ) );

describe( 'Code Example editor', () => {
	it( 'renders the code textarea', () => {
		render( <Edit attributes={ {} } setAttributes={ vi.fn() } /> );

		expect(
			screen.getByRole( 'textbox', { name: 'Code' } )
		).not.toBeNull();
	} );

	it( 'renders all supported language options', () => {
		render( <Edit attributes={ {} } setAttributes={ vi.fn() } /> );

		const languageSelect = screen.getByRole( 'combobox', {
			name: 'Language',
		} );

		expect( languageSelect.value ).toBe( 'javascript' );
		expect( languageSelect.options ).toHaveLength( 8 );
	} );

	it( 'updates the code attribute when code is entered', async () => {
		const user = userEvent.setup();
		const { setAttributes } = renderEdit();

		await user.type(
			screen.getByRole( 'textbox', { name: 'Code' } ),
			'console.log("Hello");'
		);

		expect( setAttributes ).toHaveBeenLastCalledWith( {
			code: 'console.log("Hello");',
		} );
	} );

	it( 'updates the language attribute when the language changes', async () => {
		const user = userEvent.setup();
		const { setAttributes } = renderEdit();

		await user.selectOptions(
			screen.getByRole( 'combobox', { name: 'Language' } ),
			'php'
		);

		expect( setAttributes ).toHaveBeenCalledWith( {
			language: 'php',
		} );
	} );

	it( 'updates the filename attribute when a filename is entered', async () => {
		const user = userEvent.setup();
		const { setAttributes } = renderEdit();

		await user.type(
			screen.getByRole( 'textbox', {
				name: 'Filename (optional)',
			} ),
			'functions.php'
		);

		expect( setAttributes ).toHaveBeenLastCalledWith( {
			fileName: 'functions.php',
		} );
	} );

	it( 'displays existing code and filename attributes', () => {
		renderEdit( {
			code: 'console.log("Existing");',
			language: 'javascript',
			fileName: 'existing.php',
		} );

		expect( screen.getByRole( 'textbox', { name: 'Code' } ).value ).toBe(
			'console.log("Existing");'
		);

		expect(
			screen.getByRole( 'textbox', {
				name: 'Filename (optional)',
			} ).value
		).toBe( 'existing.php' );

		expect(
			screen.getByRole( 'combobox', { name: 'Language' } ).value
		).toBe( 'javascript' );
	} );

	it( 'does not render a filename when the filename is empty', () => {
		render( <Edit attributes={ {} } setAttributes={ vi.fn() } /> );

		expect( screen.queryByText( 'functions.php' ) ).toBeNull();
	} );

	it( 'falls back to JavaScript for an unsupported language', () => {
		render(
			<Edit
				attributes={ { language: 'unsupported-language' } }
				setAttributes={ vi.fn() }
			/>
		);

		expect(
			screen.getByRole( 'combobox', { name: 'Language' } ).value
		).toBe( 'javascript' );
	} );

	it( 'applies the selected font size and line height to the code editor', () => {
		render(
			<Edit
				attributes={ {
					fontSize: 'large',
					style: {
						typography: {
							lineHeight: '1.8',
						},
					},
				} }
				setAttributes={ vi.fn() }
			/>
		);

		const codeEditor = screen.getByRole( 'textbox', { name: 'Code' } );

		expect( codeEditor.classList.contains( 'has-large-font-size' ) ).toBe(
			true
		);
		expect( codeEditor.style.lineHeight ).toBe( '1.8' );
	} );

	it( 'hides the filename when the filename is cleared', async () => {
		const user = userEvent.setup();

		renderEdit( {
			fileName: 'functions.php',
		} );

		const filenameInput = screen.getByRole( 'textbox', {
			name: 'Filename (optional)',
		} );

		expect( screen.getByText( 'functions.php' ) ).not.toBeNull();

		await user.clear( filenameInput );

		expect( screen.queryByText( 'functions.php' ) ).toBeNull();
	} );
} );
