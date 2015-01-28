var uploader = (function ($) {

    var self = this;

    this.step = {
        secondElem: $('.upload__item'),
        thirdElem: $('.place'),
        thirdElemTransparent: $('.transparent')
    };

    var url = '/uploader.ajax',
        scale = {
            x: 1,
            y: 1
        },
        watermarkSizeOriginal = {
            width: 0,
            height: 0
        },
        pictureWorkspaceClass = 'picture__workspace',
        position;

    //step 1
    //add text src img
    $('#upload_picture').change(function () {
        var valueFile = $(this).val();
        $(this).next().text(valueFile);
        self.step.secondElem.eq(1).removeClass('opacity__disabled');
        $('#upload_watermark').removeAttr('disabled');
    });


    $('#upload_picture').fileupload({
        url: url,
        dataType: 'json',

        change: function (e, data) {
            $.each(data.files, function (index, file) {
                $('.upload__field-source').html(file.name);
            });
        },
        send: function () {
            console.log('send');
            $('.picture__uploading').css('display','block');
        },
        done: function (e, data) {
            $('.picture__uploading').css('display','none');
            var pic = $('.picture__upload'),
                workspace = $('.picture__images'),
                picture__workspace = $('.' + pictureWorkspaceClass),
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
                            watermark = $('.' + pictureWorkspaceClass + ' > .picture__watermark');

                        console.log('картинка: ', $this.width(), ' ', $this.height());
                        picSizeOriginal.width = $this.width();
                        picSizeOriginal.height = $this.height();
                        console.log('рабочая область: ', workspace.width(), ' ', workspace.height());
                        $this.attr('style', 'max-width:' + workspace.width() + 'px;' + 'max-height:' + workspace.height() + 'px;');
                        console.log('картинка после масштабирования: ', $this.width(), ' ', $this.height());
                        picture__workspace.attr('style', 'width:' + $this.width() + 'px;' + 'height:' + $this.height() + 'px;');
                        scale.x = picSizeOriginal.width / $this.width();
                        scale.y = picSizeOriginal.height / $this.height();
                        console.log('масштаб: ', scale);
                        pic.show();

                        console.log('водяной знак src: ', watermark.attr('src'));
                        if (watermark.attr('src')) {
                            watermark.hide();
                            watermark.attr('style', '');
                            console.log('водяной знак: ', watermarkSizeOriginal.width, ' ', watermarkSizeOriginal.height);
                            console.log('водяной знак должен стать: ', watermarkSizeOriginal.width / scale.x, ' ', watermarkSizeOriginal.height / scale.y);
                            watermark.attr('style', 'width:' + watermarkSizeOriginal.width / scale.x + 'px;' + 'height:' + watermarkSizeOriginal.height / scale.y + 'px;');
                            console.log('водяной знак после масштабирования: ', watermark.width(), ' ', watermark.height());
                            watermark.show();
                            position.init();
                        }
                        $this.off('load');
                    })
                );
            } else {
                console.log('error uploading the original file');
            }
        }

    });

    //step 2
    $('#upload_watermark').attr('disabled', 'disabled');
    self.step.secondElem.eq(1).addClass('opacity__disabled');
    self.step.thirdElem.addClass('opacity__disabled');
    self.step.thirdElem.append('<div class="opacity__disabled__block"></div>')
    self.step.thirdElemTransparent.addClass('opacity__disabled');
    $('.transparent__item').slider('disable');

    //step 3
    //add text src watermark
    $('#upload_watermark').change(function () {
        var valueFile = $(this).val();
        console.log(valueFile);
        $(this).next().text(valueFile);
        self.step.thirdElem.removeClass('opacity__disabled');
        self.step.thirdElemTransparent.removeClass('opacity__disabled');
        $('.opacity__disabled__block').remove();
        $('.transparent__item').slider('enable');
    });


    $('#upload_watermark').fileupload({
        url: url,
        dataType: 'json',

        change: function (e, data) {
            $.each(data.files, function (index, file) {
                $('.upload__field-watermark').html(file.name);
            });
        },
        send: function () {
            console.log('send');
            $('.picture__uploading').css('display','block');
        },
        done: function (e, data) {
            $('.picture__uploading').css('display','none');
            if (data.result.src) {
                var watermark = $('.' + pictureWorkspaceClass + ' > .picture__watermark');
                watermark.attr('style', '');
                watermark.hide();
                watermark.attr('src', data.result.src);
                watermark.load(function () {
                        var
                            $this = $(this);

                        console.log('водяной знак: ', $this.width(), ' ', $this.height());
                        watermarkSizeOriginal.width = $this.width();
                        watermarkSizeOriginal.height = $this.height();
                        console.log('водяной знак должен стать: ', $this.width() / scale.x, ' ', $this.height() / scale.y);
                        $this.attr('style', 'width:' + watermarkSizeOriginal.width / scale.x + 'px;' + 'height:' + watermarkSizeOriginal.height / scale.y + 'px;');
                        console.log('водяной знак после масштабирования: ', $this.width(), ' ', $this.height());

                        $this.show();
                        $this.off('load');

                        if (position === undefined) {
                            position = new Position({

                                //x and Y value, button
                                axisButtons: {
                                    x: {
                                        input: $('#x_coordinate'),
                                        inputTitle: $('.coord__title_x'),
                                        btnUp: $('#x_coordinate_up'),
                                        btnDown: $('#x_coordinate_down')
                                    },
                                    y: {
                                        input: $('#y_coordinate'),
                                        inputTitle: $('.coord__title_y'),
                                        btnUp: $('#y_coordinate_up'),
                                        btnDown: $('#y_coordinate_down')
                                    },
                                    writeCoord: function (coord, input) {
                                        input.val(Math.round(coord));
                                    }
                                },

                                //area elem
                                $workspace: $('.picture__workspace'),
                                $mainImg: $('.picture__upload'),

                                //elem
                                $watermark: $('.picture__watermark'),

                                // place grid events
                                $placeGrid: $('.grid'),

                                //position grid buttons
                                gridButtons: 'grid__item',

                                //mosh buttons

                                switchBtn: {
                                    tileBtn: $('.toggle__item_grid'),
                                    singleBtn: $('.toggle__item_single')
                                },

                                tileGridCross: $('.grid__closed')
                            });

                            position.init();
                        } else {
                            position.init();
                        }
                    }
                );
                self.step.second = true;
            }
            else {
                console.log('error uploading the watermark file');
            }
        }
    });


    // используется в download.js для получения текущего масштаба
    return {

        getScale: function () {
            return scale;
        }

    };

})(jQuery);