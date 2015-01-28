<?php

namespace Firstwatermark;

class ImageConverter {
  public static function convert($source, $watermark, $x, $y, $opacity, $tileMode, $marginX, $marginY) {

    // 0. Убедимся, что файлы существуют и получим их размеры
    $source = PATH_BASE . '/uploads/' . $source;
    $watermark = PATH_BASE . '/uploads/' . $watermark;

    if(!file_exists($source)) {
      throw new \RuntimeException('Invalid parameters.');
    }

    if(!file_exists($watermark)) {
      throw new \RuntimeException('Invalid parameters.');
    }

    list($w1, $h1, , ) = getimagesize($source);
    list($w2, $h2, , ) = getimagesize($watermark);

    // 1. Создадим результирующий пустой холст, на котором будем рисовать
    $newWidth = max($w1, $w2);
    $newHeight = max($h1, $h2);
    $newImage = imagecreatetruecolor($newWidth, $newHeight);

    if(!$newImage) {
      throw new \RuntimeException('Image creation failed.');
    }

    imagealphablending($newImage, true); // что-то как-то связанное с альфа каналами
    imagesavealpha($newImage, true);     // в такой комбинации работает

    // 2. формируем новое изображение - копируем исходные изображения
    // в нужные позиции
    $sourceImg = imagecreatefromstring(file_get_contents($source));
    $waterImg = imagecreatefromstring(file_get_contents($watermark));

    imagecopyresampled($newImage, $sourceImg, 0, 0, 0, 0, $w1, $h1, $w1, $h1);

    // в зависимости от режима плитки копируем один вотермарк или создаем плитку

    if($tileMode == 'single') {
      imagecopymerge($newImage, $waterImg, $x, $y, 0, 0, $w2, $h2, $opacity);
    } else {
      // кто-нибудь, объясните мне, как это, вот это внизу, могло произойти?
      for($i = $x; $i < $w1 + $x + $marginX * ($w1 / ($w2 + $marginX)); $i += $w2 + $marginX) {
        for($j = $y; $j < $h1 + $y + $marginY * ($h1 / ($h2 + $marginY)); $j += $h2 + $marginY) {
          imagecopymerge($newImage, $waterImg, $i, $j, 0, 0, $w2, $h2, $opacity);
        }
      }
    }

    header("Content-Type: application/stream");
    header("Content-Disposition: attachment; filename=result.png");

    imagepng($newImage);

  }
}


try {

  if(!($_GET['i1']) || !($_GET['i2'])) {
    throw new \RuntimeException('Invalid parameters.');
  }

  if(!preg_match('/[a-z0-9]/i', $_GET['i1'])) {
    throw new \RuntimeException('Invalid parameters.');
  }

  if(!preg_match('/[a-z0-9]/i', $_GET['i1'])) {
    throw new \RuntimeException('Invalid parameters.');
  }

  $source = $_GET['i1'];
  $watermark = $_GET['i2'];

  // проверяем, переданы ли файлы разрешенных разрешений
  $allowedExt = array('jpeg', 'png', 'gif');

  preg_match('/\.([a-z]*)$/', $source, $ext);

  if(array_search($ext[1], $allowedExt) === false) {
    throw new \RuntimeException('Invalid source extension.');
  }

  preg_match('/\.([a-z]*)$/', $watermark, $ext);

  if(array_search($ext[1], $allowedExt) === false) {
    throw new \RuntimeException('Invalid watermark extension.');
  }

  $opacity = (int)$_GET['opacity'];
  $scaleX = round((float)$_GET['scaleX'], 2);
  $scaleY = round((float)$_GET['scaleY'], 2);
  $x = (int)$_GET['x'] * $scaleX;
  $y = (int)$_GET['y'] * $scaleY;
  $tileMode = ($_GET['tileMode'] == 'grid') ? 'grid' : 'single';
  $marginX = (int)$_GET['marginX'] * $scaleX;
  $marginY = (int)$_GET['marginY'] * $scaleY;

  ImageConverter::convert($source, $watermark, $x, $y, $opacity, $tileMode, $marginX, $marginY);

} catch (\Exception $e) {

  echo $e->getMessage();

}
