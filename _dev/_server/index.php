<?php

session_start();

error_reporting(0);

$_SESSION['INIT'] = true;

define('INIT', true);
define('PATH_BASE', dirname(__FILE__));

require_once(PATH_BASE . '/config.php');

define('PATH_MODULES', PATH_BASE . '/modules');
define('PATH_SCRIPTS', PATH_BASE . '/ajax');
define('PATH_CONTENT', PATH_BASE . '/content');
define('PATH_CONTENT_COMMON', PATH_CONTENT . '/common');

$query = explode('/', $_GET['q']);

//если корневой уровень сайта, будем загружать скрипт about
if (!$query[0]) {
    $query[0] = 'main';
}

// будем считать что может быть только один уровень сайта


// все ajax запросы выполняются на адрес <название скрипта>.ajax
if (strpos($query[0], 'ajax') !== false) {
    require_once(PATH_SCRIPTS . '/' . substr($query[0], 0, -5) . '.php');
} else {
    require_once(PATH_CONTENT . '/' . $query[0] . '.php');
    require_once(PATH_CONTENT . '/' . 'template.php');
}