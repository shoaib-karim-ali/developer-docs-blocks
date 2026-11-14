<?php
/**
 * WordPress integration tests for block registration.
 *
 * @package Ddb
 */

/**
 * Tests for block registration.
 */
class BlockRegistrationTest extends WP_UnitTestCase {

	/**
	 * Tests that the Code Example block is registered.
	 */
	public function test_registers_code_example_block() {
		require_once dirname( __DIR__, 2 ) . '/developer-docs-blocks.php';

		ddb_developer_docs_blocks_block_init();

		$this->assertTrue(
			WP_Block_Type_Registry::get_instance()->is_registered( 'ddb/code-example' ),
			'The Code Example block should be registered.'
		);
	}
}
