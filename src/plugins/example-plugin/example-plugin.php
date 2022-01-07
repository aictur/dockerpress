<?php
/*
Plugin Name: Example plugin
Plugin URI: https://areaf5.es/
Description: Boilerplate plugin
Author: AreaF5
Version: 1.0.0
Author URI: https://areaf5.es/
*/
global $defaultLogger;
$defaultLogger->warning('Foo');
$defaultLogger->error('Bar', ['example_key' => ['example_value' => $defaultLogger]]);
