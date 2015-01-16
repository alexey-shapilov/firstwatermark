$(function () {
  'use strict';

  console.log('module init');

  var url = window.location.hostname === '/ajax/upload.ajax';
  $('#image-original').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      $.each(data.result.files, function (index, file) {
        $('<p/>').text(file.name).appendTo('#original-result');
      });
    }
    // progressall: function (e, data) {
    //   var progress = parseInt(data.loaded / data.total * 100, 10);
    //   $('#progress .progress-bar').css(
    //     'width',
    //     progress + '%'
    //   );
    // }
  }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');


  $('#image-watermark').fileupload({
    url: url,
    dataType: 'json',
    done: function (e, data) {
      $.each(data.result.files, function (index, file) {
        $('<p/>').text(file.name).appendTo('#watermark-result');
      });
    }
    // progressall: function (e, data) {
    //   var progress = parseInt(data.loaded / data.total * 100, 10);
    //   $('#progress .progress-bar').css(
    //     'width',
    //     progress + '%'
    //   );
    // }
  }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');

});