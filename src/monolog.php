<?php /** @noinspection PhpUndefinedConstantInspection */

declare(strict_types = 1);

use Monolog\ErrorHandler;
use Monolog\Handler\ErrorLogHandler;
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Processor\IntrospectionProcessor;

// Logger por defecto como variable global
$default_logger = new Logger('wpMonolog');

// Añadimos el procesador de logs que nos concatena el archivo y línea de donde procede el log
$default_logger->pushProcessor(new IntrospectionProcessor(MONOLOG_LOG_LEVEL));

// Logger en archivo diario
$default_log_file_handler = new RotatingFileHandler(
    __DIR__ . '/logs/' . MONOLOG_LOG_NAME,
    MONOLOG_LOG_DAYS,
    MONOLOG_LOG_LEVEL
);
$default_logger->pushHandler($default_log_file_handler);

// Logger por error_log nativo de PHP (stdout en docker)
$default_log_handler = new ErrorLogHandler(
    ErrorLogHandler::OPERATING_SYSTEM,
    MONOLOG_LOG_LEVEL
);
$default_logger->pushHandler($default_log_handler);

// Logger de errores genéricos de PHP
ErrorHandler::register($default_logger);
