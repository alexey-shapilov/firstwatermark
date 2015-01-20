$(function () {
  'use strict';

  console.log('downloader init');

  $('.form__download-button').click(function(e) {
    e.preventDefault();

    window.open('/index.php?q=download.ajax&i1=2d35433efcaa6195ca75f4f58b0dbf454656aa5e.jpg&i2=2d35433efcaa6195ca75f4f58b0dbf454656aa5e.jpg','_blank');

    return false;
  });
});