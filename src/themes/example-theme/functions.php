<?php
/**
 * WordPress Theme with Webpack and HMR functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package basic_bootstrap_theme_with_Webpack_and_HMR
 */

declare(strict_types=1);

if (!function_exists('basic_bootstrap_theme_with_webpack_and_hmr_setup')) {
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which
     * runs before the init hook. The init hook is too late for some features, such
     * as indicating support for post thumbnails.
     */
    function basic_bootstrap_theme_with_webpack_and_hmr_setup() {
        /*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on WordPress Theme with Webpack and HMR, use a find and replace
         * to change 'example-theme' to the name of your theme in all the template files.
         */
        load_theme_textdomain( 'example-theme', get_template_directory() . '/languages' );

        // Add default posts and comments RSS feed links to head.
        add_theme_support( 'automatic-feed-links' );

        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support( 'title-tag' );

        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support( 'post-thumbnails' );

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus([
            'menu-1' => esc_html__('Primary', 'example-theme'),
        ]);

        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support( 'html5', [
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ]);

        // Set up the WordPress core custom background feature.
        add_theme_support(
            'custom-background',
            apply_filters(
                'basic_bootstrap_theme_with_webpack_and_hmr_custom_background_args',
                [
                    'default-color' => 'ffffff',
                    'default-image' => '',
                ]
            )
        );

        // Add theme support for selective refresh for widgets.
        add_theme_support( 'customize-selective-refresh-widgets' );

        /**
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support(
            'custom-logo',
            [
                'height' => 250,
                'width'       => 250,
                'flex-width'  => true,
                'flex-height' => true,
            ]
        );
    }
}

add_action( 'after_setup_theme', 'basic_bootstrap_theme_with_webpack_and_hmr_setup' );

/**
 * Añadir estilos y scripts básicos
 */
function basic_styles_and_js() {
    wp_deregister_script('jquery');

    wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', [], '20151215', true);
    wp_enqueue_script('jquery');


    if (is_singular() && comments_open() && get_option( 'thread_comments' )) {
        wp_enqueue_script( 'comment-reply' );
    }

    // Incluimos el css y el js generado por webpack
    // ----------------------------------------------------------------
    wp_enqueue_style(
        'basic-bootsrap-theme-with-webpack-and-hmr-custom-style',
        get_template_directory_uri() . '/assets/css/app.css',
        [],
        '20151215',
        'screen',
        true
    );


    wp_register_script(
        'basic-bootsrap-theme-with-webpack-and-hmr-script',
        get_template_directory_uri() . '/assets/js/app.js',
        [],
        '20151215',
        true
    );
    wp_enqueue_script('basic-bootsrap-theme-with-webpack-and-hmr-script');
    // ----------------------------------------------------------------
}
add_action( 'wp_enqueue_scripts', 'basic_styles_and_js' );
