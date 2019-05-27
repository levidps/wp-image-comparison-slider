<?php
/**
 * Image Comparison Slider
 *
 * Plugin Name: Image Comparison Slider
 * Plugin URI:  https://levidps.com/resources/image-comparison-slider
 * Description: Plugin for creating image comparison sliders easily from short codes.
 * Version:     1.0
 * Author:      Levidps
 * Author URI:  https://github.com/levidps
 * License:     GPLv2 or later
 * License URI: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU
 * General Public License version 2, as published by the Free Software Foundation. You may NOT assume
 * that you can use any other version of the GPL.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( 'Invalid request.' );
}

if ( ! function_exists( 'init_comparison_slider' ) ) :
	function init_comparison_slider() {

		/**
		 * Return Image Comparison Block
		 * @param $args
		 * @return null|string
		 */
		function image_comparison( $args ) {

			// Attributes
			$args = shortcode_atts(
				array(
					'image-one'     => '',
					'image-one-alt' => '',
					'image-two'     => '',
					'image-two-alt' => '',
					'max-width'     => '1280',
					'max-height'    => '720',
					'start'         => '50%'
				), $args
			);
			$output = null;

			$img1   = esc_attr($args['image-one']);
			$alt1   = esc_attr($args['image-one-alt']);

			$img2   = esc_attr($args['image-two']);
			$alt2   = esc_attr($args['image-two-alt']);

			$start  = esc_attr($args['start']);
			$width  = esc_attr($args['max-width']);
			$height = esc_attr($args['max-height']);

			// Validate URLs for images
			if ( filter_var($img1, FILTER_VALIDATE_URL) && filter_var($img2, FILTER_VALIDATE_URL)):
				$output =
					'<div class="img-comp-container" data-comparison-start="'. $start .'" data-comparison-height="'. $height .'" data-comparison-width="'. $width .'">
					  <div class="img-comp-img">
					    <img class="img-comp-pre" data-src="'. $img1 .'" alt="'. $alt1 .'">
					  </div>
					  <div class="img-comp-img img-comp-overlay">
					    <img class="img-comp-post" data-src="'. $img2 .'" alt="'. $alt2 .'">
					  </div>
					</div>';
			endif;
			$output .= '<p>Image Comparison Slider by LDPS</p>';

			return $output;

		};
		add_shortcode('image_comparison', 'image_comparison');

	}
	add_action( 'plugins_loaded', 'init_comparison_slider' );


	function image_comparison_dependencies() {
		wp_register_script( 'img-comp', WPMU_PLUGIN_URL . '/image-comparison-slider/dist/img-comparison.min.js', array(), '1.0', true );
		wp_enqueue_script( 'img-comp' );
		wp_register_style( 'img-comp', WPMU_PLUGIN_URL . '/image-comparison-slider/dist/img-comparison.css', false, '1.0' );
		wp_enqueue_style( 'img-comp' );
	}
	add_action('wp_enqueue_scripts', 'image_comparison_dependencies');
endif;
