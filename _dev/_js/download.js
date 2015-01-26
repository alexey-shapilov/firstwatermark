$(function () {
  'use strict';

  console.log('downloader init');

  $('.form__button_submit').click(function(e) {
    e.preventDefault();

    console.log('form__download_button click');

    var $originalEl = $('.picture__upload');
    var $waterEl = $('.picture__watermark');

    var i1 = '';
    var i2 = '';

    var waterX = $waterEl[0].offsetLeft;
    var waterY = $waterEl[0].offsetTop;
    var opacity = Math.abs($waterEl.css('opacity') * 100);

    var scale = uploader.getScale();
    var downloadUrl = '';

    if($originalEl.attr('src')) {
      i1 = $originalEl.attr('src').split('/')[2];
    } else {
      console.error('no original src');
      return false;
    }

    if($waterEl.attr('src')) {
      i2 = $waterEl.attr('src').split('/')[2];
    } else {
      console.error('no watermark src');
      return false;
    }

    console.log(opacity);

    downloadUrl = '/download.ajax?i1=' + i1 + '&i2=' + i2 +
      '&x=' + waterX + '&y=' + waterY + '&opacity=' + opacity + 
      '&scaleX=' + scale.x + '&scaleY=' + scale.y;

    window.open(downloadUrl, '_blank');

    // return false;
  });
});