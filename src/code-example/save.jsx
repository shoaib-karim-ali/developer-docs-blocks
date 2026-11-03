import { useBlockProps } from '@wordpress/block-editor';
import { getSafeLanguage } from './languages';

export default function save( { attributes } ) {
	const code = attributes.code ?? '';
	const language = getSafeLanguage( attributes.language );
	const fileName = attributes.fileName ?? '';

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
				<code className={ `language-${ language }` }>{ code }</code>
			</pre>
		</div>
	);
}
