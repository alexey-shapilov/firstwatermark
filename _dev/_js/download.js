$(function () {
    'use strict';

    $('.form__button_submit').click(function (e) {
        e.preventDefault();

        var $originalEl = $('.picture__upload');
        var $waterEl = $('.picture__watermark');
        var $tileEl = $('.tile-wrapper');

        var i1 = '';
        var i2 = '';

        var tileMode = $('.toggle__item_grid').hasClass('toggle__item_grid-active') ? 'grid' : 'single';
        var waterX = (tileMode === 'grid') ? $tileEl[0].offsetLeft : $waterEl[0].offsetLeft;
        var waterY = (tileMode === 'grid') ? $tileEl[0].offsetTop : $waterEl[0].offsetTop;
        var opacity = Math.abs($waterEl.css('opacity') * 100);

        var scale = uploader.getScale();
        var downloadUrl = '';

        var marginX = parseInt($('#x_coordinate').val());
        var marginY = parseInt($('#y_coordinate').val());

        if ($originalEl.attr('src')) {
            i1 = $originalEl.attr('src').split('/')[2];
        } else {
            console.error('no original src');
            return false;
        }

        if ($waterEl.attr('src')) {
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

        $("#download").attr("src",downloadUrl);

        // return false;
    });
});