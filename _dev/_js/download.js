$(function () {
  'use strict';

  console.log('downloader init');

  $('.form__download-button').click(function(e) {
    e.preventDefault();

    var $originalEl = $('.picture__upload');
    var $waterEl = $('.picture__watermark');

    var i1 = '';
    var i2 = '';

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

    var waterX = $waterEl[0].offsetLeft;
    var waterY = $waterEl[0].offsetTop;
    var opacity = $waterEl.css('opacity');

    window.open('/index.php?q=download.ajax&i1=' + i1 + '&i2=' + i2 + 
      '&x=' + waterX + '&y=' + waterY + '&opacity=' + opacity, '_blank');

    // return false;
  });
});