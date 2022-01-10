<?php
/**
 * Plugin Name: Example plugin
 * Plugin URI: https://areaf5.es/
 * Description: Boilerplate plugin
 * Author: AreaF5
 * Version: 1.0.0
 * Author URI: https://areaf5.es/
 */

declare(strict_types = 1);

global $default_logger;
$default_logger->warning('Foo');

$default_logger->error('Bar', [
    'example_key' => [
        'example_value' => $default_logger,
        'a' => 'b',
    ],
]);
