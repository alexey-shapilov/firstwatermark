$(function () {
  'use strict';

  var url = '/ajax/upload.ajax';

  $('#image-original').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      console.log('done');
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