<?php

namespace Firstwatermark;

class ImageConverter {
  public function convert($source, $watermark, $x, $y, $opacity) {

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
    $newWidth = $w1 + $w2;
    $newHeight = max($h1, $h2);
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    imagealphablending($newImage, true); // что-то как-то связанное с альфа каналами
    imagesavealpha($newImage, true);     // в такой комбинации работает

    // 1.1 определим вызываемую функцию копирования в зависимости
    // от разрешения загруженного файла
    $image_create_source_func = 'imagecreatefrom';
    $image_create_water_func = 'imagecreatefrom';

    $allowed_ext = ['jpeg', 'png', 'gif'];

    // 1.1.1 ...для исходного изображения
    preg_match('/\.([a-z]*)$/', $source, $ext);

    if(!array_search($ext[1], $allowed_ext)) {
      throw new \RuntimeException('Invalid source extension.');
    }

    $image_create_source_func .= $ext[1];
    $source_img = $image_create_source_func($source);
    if($ext[1] == 'png') {
      imagealphablending($source_img, true); // в картинке может быть альфа-канал
    }

    // 1.1.2 ...для водяного знака
    preg_match('/\.([a-z]*)$/', $watermark, $ext);

    if(!array_search($ext[1], $allowed_ext)) {
      throw new \RuntimeException('Invalid watermark extension.');
    }

    $image_create_water_func .= $ext[1];
    $water_img = $image_create_source_func($watermark);
    if($ext[1] == 'png') {
      imagealphablending($water_img, true);
    }


    // 2. формируем исходное изображение
    imagecopyresampled($newImage, $source_img, 0, 0, 0, 0, $w1, $h1, $w1, $h1);
    imagecopyresampled($newImage, $water_img, $x, $y, 0, 0, $w2, $h2, $w2, $h2);

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

  ImageConverter::convert($source, $watermark, $x, $y, $opacity);

} catch (\Exception $e) {

  echo $e->getMessage();

}
