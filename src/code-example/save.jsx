import { useBlockProps } from '@wordpress/block-editor';

const DEFAULT_LANGUAGE = 'javascript';

const SUPPORTED_LANGUAGES = [
	'javascript',
	'php',
	'html',
	'css',
	'json',
	'bash',
	'sql',
	'text',
];

export default function save( { attributes } ) {
	const { code, language, fileName } = attributes;
	const safeLanguage = SUPPORTED_LANGUAGES.includes( language )
		? language
		: DEFAULT_LANGUAGE;

	return (
		<div
			{ ...useBlockProps.save( {
				className: 'ddb-code-example',
			} ) }
		>
			{ fileName && (
				<div className="ddb-code-example__filename">{ fileName }</div>
			) }

			<pre className="ddb-code-example__pre">
				<code className={ `language-${ safeLanguage }` }>{ code }</code>
			</pre>
		</div>
	);
}
