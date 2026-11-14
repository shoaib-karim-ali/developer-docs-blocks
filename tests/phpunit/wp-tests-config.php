<?php
/**
 * PHPUnit configuration for Developer Docs Blocks.
 *
 * @package Ddb
 */

define( 'DB_NAME', 'ddb_wordpress_tests' );
define( 'DB_USER', 'root' );
define( 'DB_PASSWORD', '' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// Required by the WordPress PHPUnit test bootstrap.
// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
$table_prefix = 'wptests_';

define( 'WP_TESTS_DOMAIN', 'localhost' );
define( 'WP_TESTS_EMAIL', 'admin@example.org' );
define( 'WP_TESTS_TITLE', 'Developer Docs Blocks Tests' );

$wp_php_binary = getenv( 'WP_PHP_BINARY' );

if ( false === $wp_php_binary ) {
		$wp_php_binary = PHP_BINARY;
}

define( 'WP_PHP_BINARY', $wp_php_binary );

$wp_core_dir = getenv( 'WP_CORE_DIR' );

if ( ! $wp_core_dir ) {
	throw new RuntimeException( 'WP_CORE_DIR is not configured.' );
}

define(
	'ABSPATH',
	rtrim( $wp_core_dir, '/\\' ) . DIRECTORY_SEPARATOR
);

if ( ! is_file( ABSPATH . 'wp-load.php' ) ) {
	throw new RuntimeException( 'WP_CORE_DIR must point to a valid WordPress installation.' );
}

define( 'WP_DEBUG', true );
