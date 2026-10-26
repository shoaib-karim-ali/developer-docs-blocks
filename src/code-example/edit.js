import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	useBlockProps,
	getFontSizeClass,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
} from '@wordpress/components';

import './editor.scss';

const LANGUAGE_OPTIONS = [
	{ label: 'JavaScript', value: 'javascript' },
	{ label: 'PHP', value: 'php' },
	{ label: 'HTML', value: 'html' },
	{ label: 'CSS', value: 'css' },
	{ label: 'JSON', value: 'json' },
	{ label: 'Bash', value: 'bash' },
	{ label: 'SQL', value: 'sql' },
	{ label: 'Plain text', value: 'text' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { code, language, fileName } = attributes;
	const blockProps = useBlockProps( {
		className: 'ddb-code-example',
	} );
	const fontSizeClass = getFontSizeClass( attributes.fontSize );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Code settings', 'developer-docs-blocks' ) }
				>
					<SelectControl
						label={ __( 'Language', 'developer-docs-blocks' ) }
						value={ language }
						options={ LANGUAGE_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { language: value } )
						}
					/>

					<TextControl
						label={ __(
							'Filename (optional)',
							'developer-docs-blocks'
						) }
						value={ fileName }
						onChange={ ( value ) =>
							setAttributes( { fileName: value } )
						}
						help={ __(
							'For example, functions.php',
							'developer-docs-blocks'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ fileName && (
					<div className="ddb-code-example__filename">
						{ fileName }
					</div>
				) }

				<div className="ddb-code-example__editor">
					<TextareaControl
						label={ __( 'Code', 'developer-docs-blocks' ) }
						hideLabelFromVision
						value={ code }
						onChange={ ( value ) =>
							setAttributes( { code: value } )
						}
						rows={ 10 }
						placeholder={ __(
							'Write or paste your code here…',
							'developer-docs-blocks'
						) }
						className={ `ddb-code-example__textarea ${ fontSizeClass || '' }` }
						style={ {
							lineHeight:
								attributes.style?.typography?.lineHeight,
						} }
					/>
				</div>
			</div>
		</>
	);
}
