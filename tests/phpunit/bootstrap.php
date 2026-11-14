<?php
/**
 * PHPUnit bootstrap for Developer Docs Blocks.
 *
 * @package Ddb
 */

define(
	'WP_TESTS_CONFIG_FILE_PATH',
	__DIR__ . '/wp-tests-config.php'
);

define(
	'WP_TESTS_PHPUNIT_POLYFILLS_PATH',
	dirname( __DIR__, 2 ) . '/vendor/yoast/phpunit-polyfills'
);

require_once dirname( __DIR__, 2 ) . '/vendor/wp-phpunit/wp-phpunit/includes/bootstrap.php';
