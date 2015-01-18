$(function () {
  'use strict';

  var url = '/ajax/uploader.php';

  $('#image-original').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      if(data.result.src) {
        $('.worspace__img').attr('src', data.result.src);
      } else {
        console.log('error uploading the file');
      }
    }
  });


  $('#image-watermark').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      console.log('done');
    }
  });

});