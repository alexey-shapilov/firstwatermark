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

//если корневой уровень сайта, будем загружать скрипт main
if (!$query[0]) {
    $lang = $query[0] = 'ru';
    $template = 'main';
} else if ($query[0] == 'ru' || $query[0] == 'eng') {
    $lang = $query[0];
    if ($query[1]) {
        $template = $query[1];
    } else {
        $template = $query[1] = 'main';
    }
} else {
    $template = $query[0];
}

// будем считать что может быть только один уровень сайта
//var_dump($query);
// все ajax запросы выполняются на адрес <название скрипта>.ajax
if (strpos($template, 'ajax') !== false) {
    if (strpos($template, '?') !== false) {
        $template = substr($template, 0, strpos($template, '?'));
    }
    require_once(PATH_SCRIPTS . '/' . str_replace('.ajax', '.php', $template));
} else {
    require_once(PATH_CONTENT . '/' . 'translate.php');
    require_once(PATH_CONTENT . '/' . $template . '.php');
    require_once(PATH_CONTENT . '/' . 'template.php');
}

