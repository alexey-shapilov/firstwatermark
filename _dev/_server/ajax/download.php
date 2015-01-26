<?php

namespace Firstwatermark;

class ImageConverter {
  public function convert($source, $watermark, $x, $y, $opacity, $tileMode, $marginX, $marginY) {

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

    // 1.1 определим вызываемую функцию копирования в зависимости
    // от разрешения загруженного файла
    $imageCreateSourceFunc = 'imagecreatefrom';
    $imageCreateWaterFunc = 'imagecreatefrom';

    $allowedExt = array('jpeg', 'png', 'gif');

    // 1.1.1 ...для исходного изображения
    preg_match('/\.([a-z]*)$/', $source, $ext);

    if(!array_search($ext[1], $allowedExt)) {
      throw new \RuntimeException('Invalid source extension.');
    }

    $imageCreateSourceFunc .= $ext[1];
    $sourceImg = $imageCreateSourceFunc($source);

    // 1.1.2 ...для водяного знака
    preg_match('/\.([a-z]*)$/', $watermark, $ext);

    if(!array_search($ext[1], $allowedExt)) {
      throw new \RuntimeException('Invalid watermark extension.');
    }

    $imageCreateWaterFunc .= $ext[1];
    $waterImg = $imageCreateSourceFunc($watermark);

    // 2. формируем новое изображение - копируем исходные изображения
    // в нужные позиции

    imagecopyresampled($newImage, $sourceImg, 0, 0, 0, 0, $w1, $h1, $w1, $h1);

    // в зависимости от режима плитки копируем один вотермарк или создаем плитку
    if($tileMode == 'single') {
      imagecopyresampled($newImage, $waterImg, $x, $y, 0, 0, $w2, $h2, $w2, $h2);
    } else {
      // кто-нибудь, объясните мне, как это, вот это внизу, могло произойти?
      for($i = $x; $i < $w1 + $x + $marginX * ($w1 / ($w2 + $marginX)); $i += $w2 + $marginX) {
        for($j = $y; $j < $h1 + $y; $j += $h2 + $marginY) {
          imagecopyresampled($newImage, $waterImg, $i, $j, 0, 0, $w2, $h2, $w2, $h2);
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
  $opacity = (int)$_GET['opacity'];
  $scaleX = round((float)$_GET['scaleX'], 2);
  $scaleY = round((float)$_GET['scaleY'], 2);
  $x = (int)$_GET['x'] * $scaleX;
  $y = (int)$_GET['y'] * $scaleY;
  $tileMode = ($_GET['tileMode'] == 'grid') ? 'grid' : 'single';
  $marginX = (int)$_GET['marginX'];
  $marginY = (int)$_GET['marginY'];

  ImageConverter::convert($source, $watermark, $x, $y, $opacity, $tileMode, $marginX, $marginY);

} catch (\Exception $e) {

  echo $e->getMessage();

}
