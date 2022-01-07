<?php

use Monolog\Handler\ErrorLogHandler;
use Monolog\Logger;
use Monolog\Handler\RotatingFileHandler;

// El logger por defecto escribe en un archivo de log diario y por error_log
$defaultLogger = new Logger('name');
$defaultLogger->pushHandler(
    new RotatingFileHandler(
        __DIR__.'/logs/'.getenv_docker('MONOLOG_LOG_NAME', 'wordpress.log'),
        getenv_docker('MONOLOG_LOG_DAYS', 30),
        getenv_docker('MONOLOG_LOG_LEVEL', Logger::WARNING)
    )
);
$defaultLogger->pushHandler(
    new ErrorLogHandler(
        ErrorLogHandler::OPERATING_SYSTEM,
        getenv_docker('MONOLOG_LOG_LEVEL', Logger::DEBUG)
    )
);


$defaultLogger->warning('Foo');
$defaultLogger->error('Bar');
