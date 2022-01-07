<?php /** @noinspection PhpUndefinedConstantInspection */

use Monolog\ErrorHandler;
use Monolog\Handler\ErrorLogHandler;
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Processor\IntrospectionProcessor;

// Logger por defecto como variable global
$defaultLogger = new Logger('wpMonolog');

// Añadimos el procesador de logs que nos concatena el archivo y línea de donde procede el log
$defaultLogger->pushProcessor(new IntrospectionProcessor(MONOLOG_LOG_LEVEL));

// Logger en archivo diario
$defaultLogFileHandler = new RotatingFileHandler(
    __DIR__.'/logs/'.MONOLOG_LOG_NAME,
	MONOLOG_LOG_DAYS,
	MONOLOG_LOG_LEVEL
);
$defaultLogger->pushHandler($defaultLogFileHandler);

// Logger por error_log nativo de PHP (stdout en docker)
$defaultLogHandler = new ErrorLogHandler(
    ErrorLogHandler::OPERATING_SYSTEM,
	MONOLOG_LOG_LEVEL
);
$defaultLogger->pushHandler($defaultLogHandler);

// Logger de errores genéricos de PHP
ErrorHandler::register($defaultLogger);
