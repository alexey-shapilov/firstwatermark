$(function () {
  'use strict';

  console.log('downloader init');

  $('.form__download-button').click(function(e) {
    e.preventDefault();

    console.log('123');

    var $originalEl = $('.picture__upload');
    var $waterEl = $('.picture__watermark');

    var i1 = '';
    var i2 = '';

    console.log('123');
    
    if($originalEl.attr('src')) {
      i1 = $originalEl.attr('src').split('/')[2];
    } else {
      console.error('no original src');
      return false;
    }

    console.log('123');

    if($waterEl.attr('src')) {
      i2 = $waterEl.attr('src').split('/')[2];
    } else {
      console.error('no watermark src');
      return false;
    }

    console.log('123');

    window.open('/index.php?q=download.ajax&i1=' + i1 + '&i2=' + i2, '_blank');

    // return false;
  });
});