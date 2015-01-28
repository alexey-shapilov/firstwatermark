<?php

$strings = array(
    'eng' => array(
        'Генератор водяных знаков' => 'Watermark generator',
        'Настройки' => 'Settings',
        'Исходное изображение' => 'Source image',
        'Водяной знак' => 'Watermark',
        'Положение' => 'Position',
        'Прозрачность' => 'Opacity',
        'Сброс' => 'Reset',
        'Скачать' => 'Download',
        'Загрузите изображение' => 'Upload image'
    )
);

function t($string)
{
    global $strings, $lang;

    return $strings[$lang][$string] ?: $string;
}