<?php

$strings = [
  'eng' => [
    'Генератор водяных знаков' => 'Watermark generator',
    'Настройки' => 'Settings',
    'Исходное изображение' => 'Source image',
    'Водяной знак' => 'Watermark',
    'Положение' => 'Position',
    'Прозрачность' => 'Opacity',
    'Сброс' => 'Reset',
    'Скачать' => 'Download'
  ]
];

function t($string) {
  global $strings, $lang;

  return $strings[$lang][$string] ?: $string;
}