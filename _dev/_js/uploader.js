$(function () {
  'use strict';

  var url = '/index.php?q=uploader.ajax';
  console.log('uploader init');

  $('#upload_picture').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      if(data.result.src) {
        $('.picture__upload').attr('src', data.result.src);
        console.log('upload succesful');
      } else {
        console.log('error uploading the original file');
      }
    }
  });


  $('#upload_watermark').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      if(data.result.src) {
        $('.picture__watermark').attr('src', data.result.src);
      } else {
        console.log('error uploading the watermark file');
      }
    }
  });

});