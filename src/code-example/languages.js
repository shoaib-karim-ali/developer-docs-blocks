export const DEFAULT_LANGUAGE = 'javascript';

export const LANGUAGE_OPTIONS = [
	{ label: 'JavaScript', value: 'javascript' },
	{ label: 'PHP', value: 'php' },
	{ label: 'HTML', value: 'html' },
	{ label: 'CSS', value: 'css' },
	{ label: 'JSON', value: 'json' },
	{ label: 'Bash', value: 'bash' },
	{ label: 'SQL', value: 'sql' },
	{ label: 'Plain text', value: 'text' },
];

export const SUPPORTED_LANGUAGES = LANGUAGE_OPTIONS.map(
	( { value } ) => value
);

export function getSafeLanguage( language ) {
	return SUPPORTED_LANGUAGES.includes( language )
		? language
		: DEFAULT_LANGUAGE;
}
