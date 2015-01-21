<?php

namespace Firstwatermark;

class ImageConverter {
  public function convert($source, $watermark) {

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

    $newWidth = $w1 + $w2;
    $newHeight = max($h1, $h2);
    $newImage = imagecreatetruecolor($newWidth, $newHeight);

    imagecopyresampled($newImage, imagecreatefromjpeg($source), 0, 0, 0, 0, $w1, $h1, $w1, $h1);
    imagecopymerge($newImage, imagecreatefromjpeg($watermark), 0, 0, 0, 0, $w2, $h2, 50);

    header("Content-Type: application/stream");
    header("Content-Disposition: attachment; filename=result.jpg");

    imagejpeg($newImage);

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

  ImageConverter::convert(
    $source, 
    $watermark);

} catch (\Exception $e) {

  echo $e->getMessage();

}
