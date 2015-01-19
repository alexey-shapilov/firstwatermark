$(function () {
  'use strict';

  var url = '/ajax/uploader.php';

  $('#upload_picture').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      if(data.result.src) {
        $('.picture__upload').attr('src', data.result.src);
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