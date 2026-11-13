<?php
/**
 * Tests for Code Example block metadata registration.
 *
 * @package Ddb
 */

class BlockMetadataTest extends WP_UnitTestCase {

	/**
	 * Registers the block before each test.
	 */
	public function set_up() {
		parent::set_up();

		require_once dirname( __DIR__, 2 ) . '/developer-docs-blocks.php';

		$registry = WP_Block_Type_Registry::get_instance();

		if ( $registry->is_registered( 'ddb/code-example' ) ) {
			$registry->unregister( 'ddb/code-example' );
		}

		ddb_developer_docs_blocks_block_init();
	}

	/**
	 * Unregisters the block after each test.
	 */
	public function tear_down() {
		$registry = WP_Block_Type_Registry::get_instance();

		if ( $registry->is_registered( 'ddb/code-example' ) ) {
			$registry->unregister( 'ddb/code-example' );
		}

		parent::tear_down();
	}

	/**
	 * Tests the registered block's API version.
	 */
	public function test_block_uses_api_version_three() {
		$block_type = WP_Block_Type_Registry::get_instance()->get_registered( 'ddb/code-example' );

		$this->assertSame( 3, $block_type->api_version );
	}

	/**
	 * Tests the registered block's attributes.
	 */
	public function test_block_registers_expected_attributes() {
		$block_type = WP_Block_Type_Registry::get_instance()->get_registered( 'ddb/code-example' );

		$this->assertArrayHasKey( 'code', $block_type->attributes );
		$this->assertArrayHasKey( 'language', $block_type->attributes );
		$this->assertArrayHasKey( 'fileName', $block_type->attributes );

		$this->assertSame( 'string', $block_type->attributes['code']['type'] );
		$this->assertSame( 'text', $block_type->attributes['code']['source'] );
		$this->assertSame( 'code', $block_type->attributes['code']['selector'] );
		$this->assertSame( '', $block_type->attributes['code']['default'] );

		$this->assertSame( 'javascript', $block_type->attributes['language']['default'] );
		$this->assertSame( '', $block_type->attributes['fileName']['default'] );
	}

	/**
	 * Tests the registered block's supported features.
	 */
	public function test_block_registers_expected_supports() {
		$block_type = WP_Block_Type_Registry::get_instance()->get_registered( 'ddb/code-example' );

		$this->assertFalse( $block_type->supports['html'] );

		$this->assertTrue( $block_type->supports['color']['background'] );
		$this->assertTrue( $block_type->supports['color']['text'] );
		$this->assertFalse( $block_type->supports['color']['gradients'] );
		$this->assertFalse( $block_type->supports['color']['link'] );

		$this->assertTrue( $block_type->supports['typography']['fontSize'] );
		$this->assertTrue( $block_type->supports['typography']['lineHeight'] );

		$this->assertTrue( $block_type->supports['spacing']['padding'] );
		$this->assertFalse( $block_type->supports['spacing']['margin'] );

		$this->assertTrue( $block_type->supports['border']['radius'] );
	}
}