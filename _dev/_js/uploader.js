!function ($) {
    'use strict';

    var url = '/index.php?q=uploader.ajax',
        scale = {
            x: 1,
            y: 1
        };

    $('#upload_picture').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            var pic = $('.picture__upload'),
                workspace = $('.picture__images'),
                picSizeOriginal = {
                    width: 0,
                    height: 0
                };
            if (data.result.src) {
                console.log('Новый фон ===================: ');
                pic.attr('style', '');
                pic.hide();
                pic.attr('src', data.result.src);
                pic.on('load', (function () {
                        console.log('сработало событие pic.load');
                        var $this = $(this),
                            watermark = $('.picture__watermark'),
                            watermarkSizeOriginal = {
                                width: 0,
                                height: 0
                            };
                        console.log('картинка: ', $this.width(), ' ', $this.height());
                        picSizeOriginal.width = $this.width();
                        picSizeOriginal.height = $this.height();
                        console.log('рабочая область: ', workspace.width(), ' ', workspace.height());
                        $this.attr('style', 'max-width:' + workspace.width() + 'px;' + 'max-height:' + workspace.height() + 'px;');
                        console.log('картинка после масштабирования: ', $this.width(), ' ', $this.height());
                        scale.x = picSizeOriginal.width / $this.width();
                        scale.y = picSizeOriginal.height / $this.height();
                        console.log('масштаб: ', scale);
                        pic.show();

                        console.log('водяной знак src: ', watermark.attr('src'));
                        if (watermark.attr('src')) {
                            watermark.hide();
                            watermark.attr('style', '');
                            console.log('водяной знак: ', watermark.width(), ' ', watermark.height());
                            watermarkSizeOriginal.width = watermark.width();
                            watermarkSizeOriginal.height = watermark.height();
                            console.log('водяной знак должен стать: ', watermark.width() / scale.x, ' ', watermark.height() / scale.y);
                            watermark.attr('style', 'width:' + watermarkSizeOriginal.width / scale.x + 'px;' + 'height:' + watermarkSizeOriginal.height / scale.y + 'px;');
                            console.log('водяной знак после масштабирования: ', watermark.width(), ' ', watermark.height());
                            watermark.show();
                        }
                        $this.off('load');
                    })
                );
            } else {
                console.log('error uploading the original file');
            }
        }
    });


    $('#upload_watermark').fileupload({
        url: url,
        dataType: 'json',
        done: function (e, data) {
            if (data.result.src) {
                var watermark = $('.picture__watermark'),
                    watermarkSizeOriginal = {
                        width: 0,
                        height: 0
                    };
                watermark.attr('style', '');
                watermark.hide();
                watermark.attr('src', data.result.src);
                watermark.load(function () {
                    var $this = $(this);
                    console.log('водяной знак: ', $this.width(), ' ', $this.height());
                    watermarkSizeOriginal.width = $this.width();
                    watermarkSizeOriginal.height = $this.height();
                    console.log('водяной знак должен стать: ', $this.width() / scale.x, ' ', $this.height() / scale.y);
                    $this.attr('style', 'width:' + watermarkSizeOriginal.width / scale.x + 'px;' + 'height:' + watermarkSizeOriginal.height / scale.y + 'px;');
                    console.log('водяной знак после масштабирования: ', $this.width(), ' ', $this.height());
                    $this.show();
                    $this.off('load');

                    var p = new Position({

                        //x and Y value, button
                        axisButtons: {
                            x: {
                                input: $('#x_coordinate'),
                                btnUp: $('#x_coordinate_up'),
                                btnDown: $('#x_coordinate_down')
                            },
                            y: {
                                input: $('#y_coordinate'),
                                btnUp: $('#y_coordinate_up'),
                                btnDown: $('#y_coordinate_down')
                            },
                            writeCoord: function (coord, input) {
                                input.val(Math.round(coord));
                            }
                        },

                        //area elem
                        $workspace: $('body'),
                        $mainImg: $('.picture__upload'),
                        $placeElemBodyImg: $('.picture__body'),
                        //elem
                        $watermark: $('.picture__watermark'),

                        // place grid events
                        $placeGrid: $('.grid'),

                        //position grid buttons
                        gridButtons: 'grid__item',

                        //mosh buttons

                        $tileBtn: $('.tile')
                    });

                    p.init();
                });
            } else {
                console.log('error uploading the watermark file');
            }
        }
    });

}(jQuery);