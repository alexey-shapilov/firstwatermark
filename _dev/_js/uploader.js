function Uploader(options) { //конструктор загрузчика

	this.$uploadWatermark = options.$uploadWatermark;
    this.$uploadPicture = options.$uploadPicture;
}

Uploader.prototype.init = function () {
    
	self = this;
	this.url = '/uploader.ajax';
	this.scale = {
		x: 1,
		y: 1
	};
	this.watermarkSizeOriginal = {
		width: 0,
		height: 0
	};
	this.pictureWorkspaceClass = 'picture__workspace',
	this.position = 0;

    this.step = {
        secondElem: $('.upload__item'),
        thirdElem: $('.place'),
        thirdElemTransparent: $('.transparent')
    };
	
	this.uploadPictureActive(); // вызываем метод загрузки картинки у конструктора
    this.uploadWatermarkActive(); // вызываем метод загрузки водяного знака у конструктора
	
	// используется в download.js для получения текущего масштаба


	this.getScale = function () {
		return self.scale;
	};
	this.getPosition = function () {
		return self.position;
	};

};

Uploader.prototype.positionToogle = function (val) {

	if(val){
		self.position = new Position({

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

			tileGridCross: $('.grid__closed'),

			slider: slider
		});

		self.position.init();
	}else{
		self.position.init();
	}
};

Uploader.prototype.uploadPictureActive = function () {
	var
        self = this;
	//step 1
    //add text src img
    self.$uploadPicture.change(function () {
        var valueFile = $(this).val();
        $(this).next().text(valueFile);
        self.step.secondElem.eq(1).removeClass('opacity__disabled');
        $('#upload_watermark').removeAttr('disabled');
    });


    self.$uploadPicture.fileupload({
        url: self.url,
        dataType: 'json',

        change: function (e, data) {
            $.each(data.files, function (index, file) {
                $('.upload__field-source').html(file.name);
            });
			console.log(self.url);
				
        },
        send: function () {
            console.log('send');
            $('.picture__uploading').css('display', 'block');
        },
        done: function (e, data) {
            var pic = $('.picture__upload'),
                workspace = $('.picture__images'),
                picture__workspace = $('.' + self.pictureWorkspaceClass),
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
                            watermark = $('.' + self.pictureWorkspaceClass + ' > .picture__watermark');
                        $('.picture__uploading').css('display', 'none');
                        console.log('картинка: ', $this.width(), ' ', $this.height());
                        picSizeOriginal.width = $this.width();
                        picSizeOriginal.height = $this.height();
                        console.log('рабочая область: ', workspace.width(), ' ', workspace.height());
                        $this.attr('style', 'max-width:' + workspace.width() + 'px;' + 'max-height:' + workspace.height() + 'px;');
                        console.log('картинка после масштабирования: ', $this.width(), ' ', $this.height());
                        picture__workspace.attr('style', 'width:' + $this.width() + 'px;' + 'height:' + $this.height() + 'px;');
                        self.scale.x = picSizeOriginal.width / $this.width();
                        self.scale.y = picSizeOriginal.height / $this.height();
                        console.log('масштаб: ', self.scale);
                        pic.show();

                        console.log('водяной знак src: ', watermark.attr('src'));
                        if (watermark.attr('src')) {
                            watermark.hide();
                            watermark.attr('style', '');
                            console.log('водяной знак: ', self.watermarkSizeOriginal.width, ' ', self.watermarkSizeOriginal.height);
                            console.log('водяной знак должен стать: ', self.watermarkSizeOriginal.width / self.scale.x, ' ', self.watermarkSizeOriginal.height / self.scale.y);
                            watermark.attr('style', 'width:' + self.watermarkSizeOriginal.width / self.scale.x + 'px;' + 'height:' + self.watermarkSizeOriginal.height / self.scale.y + 'px;');
                            console.log('водяной знак после масштабирования: ', watermark.width(), ' ', watermark.height());
                            watermark.show();
                            slider.sliderOpacity(slider.$rangeOpacity.slider("value"));
                            self.positionToogle(false);
                        }
                        $this.off('load');
                    })
                );
            } else {
                console.log('error uploading the original file');
            }
        }

    });
};

Uploader.prototype.uploadWatermarkActive = function () {
	var
        self = this;
	//step 2
    self.$uploadWatermark.attr('disabled', 'disabled');
    self.step.secondElem.eq(1).addClass('opacity__disabled');
    self.step.thirdElem.addClass('opacity__disabled');
    self.step.thirdElem.append('<div class="opacity__disabled__block"></div>')
    self.step.thirdElemTransparent.addClass('opacity__disabled');
    $('.transparent__item').slider('disable');

    //step 3
    //add text src watermark
    self.$uploadWatermark.change(function () {
        var valueFile = $(this).val();
        console.log(valueFile);
        $(this).next().text(valueFile);
        self.step.thirdElem.removeClass('opacity__disabled');
        self.step.thirdElemTransparent.removeClass('opacity__disabled');
        $('.opacity__disabled__block').remove();
        $('.transparent__item').slider('enable');
    });
	
	self.$uploadWatermark.fileupload({
        url: self.url,
        dataType: 'json',

        change: function (e, data) {
            $.each(data.files, function (index, file) {
                $('.upload__field-watermark').html(file.name);
            });
        },
        send: function () {
            console.log('send');
            $('.picture__uploading').css('display', 'block');
        },
        done: function (e, data) {
            if (data.result.src) {
                var watermark = $('.' + self.pictureWorkspaceClass + ' > .picture__watermark');
                watermark.attr('style', '');
                watermark.hide();
                watermark.attr('src', data.result.src);
                watermark.load(function () {
                        var
                            $this = $(this);
                        $('.picture__uploading').css('display', 'none');
                        console.log('водяной знак: ', $this.width(), ' ', $this.height());
                        self.watermarkSizeOriginal.width = $this.width();
                        self.watermarkSizeOriginal.height = $this.height();
                        console.log('водяной знак должен стать: ', $this.width() / self.scale.x, ' ', $this.height() / self.scale.y);
                        $this.attr('style', 'opacity:0.5; width:' + self.watermarkSizeOriginal.width / self.scale.x + 'px;' + 'height:' + self.watermarkSizeOriginal.height / self.scale.y + 'px;');
                        console.log('водяной знак после масштабирования: ', $this.width(), ' ', $this.height());

                        $this.show();
                        slider.sliderOpacity(slider.$rangeOpacity.slider('value'));
                        $this.off('load');
						console.log(self.position);
                        if (self.position === 0) {
                            self.positionToogle(true);
                        } else {
                           self.positionToogle(false);
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
	
};
var uploader = new Uploader({// указываем ему необходимые элементы для работы
    $uploadWatermark: $('#upload_watermark'),
    $uploadPicture: $('#upload_picture')
}); //создаем наш загрузчик
uploader.init();