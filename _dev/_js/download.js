$(function () {
  'use strict';

  console.log('downloader init');

  $('.form__button_submit').click(function(e) {
    e.preventDefault();

    console.log('form__download_button click');

    var $originalEl = $('.picture__upload');
    var $waterEl = $('.picture__watermark');
    var $tileEl = $('.tile-wrapper');

    var i1 = '';
    var i2 = '';

    var tileMode = $tileEl.children().length > 0 ? 'grid' : 'single';
    var waterX = (tileMode === 'grid') ? $tileEl[0].offsetLeft : $waterEl[0].offsetLeft;
    var waterY = (tileMode === 'grid') ? $tileEl[0].offsetTop : $waterEl[0].offsetTop;
    var opacity = Math.abs($waterEl.css('opacity') * 100);

    var scale = uploader.getScale();
    var downloadUrl = '';

    var marginX = parseInt($('#x_coordinate').val());
    var marginY = parseInt($('#y_coordinate').val());

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

    downloadUrl = '/download.ajax?i1=' + i1 + '&i2=' + i2 +
      '&x=' + waterX + '&y=' + waterY + '&opacity=' + opacity + 
      '&scaleX=' + scale.x + '&scaleY=' + scale.y + '&tileMode=' + tileMode +
      '&marginX=' + marginX + '&marginY=' + marginY;

    console.log(downloadUrl);

    window.open(downloadUrl, '_blank');

    // return false;
  });
});