import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { code, language, fileName } = attributes;

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
