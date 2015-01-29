function Tile(options) {
    var
        tileItemClass = 'tile-item',
        tileWrapperClass = 'tile-wrapper',
        self = this,
        tile = options.tile,
        tileContainer = options.tileContainer,
        tileWidth = tile.width(),
        tileHeight = tile.height(),
        tileWrapper = this.tileWrapper,
        marginButtons = options.marginButtons,
        tileGridCross = options.tileGridCross,
        slider = options.slider;

    tileWrapper.addClass(tileWrapperClass);

    this.reInitOptions = options;
    this.created = false;
    this.margin = {
        x: {
            value: 0,
            marginClass: 'col_'
        },
        y: {
            value: 0,
            marginClass: 'row_'
        }
    };

    this.gridCroos = {
        width: 0,
        height: 0,
        tileGridX: $('.grid__closed_x'),
        tileGridY: $('.grid__closed_y'),
        scale: {
            x: 1,
            y: 1
        },
        hide: function () {
            tileGridCross.removeClass('grid__closed_active');
        }
    };

    this.count = {
        x: tileContainer.width() / tileWidth,
        y: tileContainer.height() / tileHeight
    };

    this.make = function () {
        var
            img = '<img src="' + tile.attr('src') + '" %class% %style%>',
            tileClass = tile.attr('class') + ' ' + tileItemClass,
            row = 0,
            col = 0,
            imgs = '';

        for (var i = 0; i < self.count.x; i++) {
            ++col;
            row = 0;
            for (var j = 0; j < self.count.y; j++) {
                ++row;
                imgs += img.replace('%style%', 'style="left:' + (tileWidth * i) + 'px; top:' + (tileHeight * j) + 'px; ' +
                'width:' + tileWidth + 'px; height:' + tileHeight + 'px;"');
                imgs = imgs.replace('%class%', 'class="' + tileClass + ' ' + self.margin.y.marginClass + row + ' ' + self.margin.x.marginClass + col + '"')
            }
        }
        tileWrapper.html(imgs);

        tileWrapper.attr('style', 'position:absolute; left:0; top:0;');
        self.setSlider();

        self.bindButtons();

        tile.css('display', 'none');
        tileWrapper.draggable();

        self.created = true;

        return tileWrapper;
    };

    this.bindButtons = function () {

        tileGridCross.addClass('grid__closed_active');
        self.gridCroos.width = tileGridCross.width();
        self.gridCroos.height = tileGridCross.height();
        self.gridCroos.scale.x = self.gridCroos.width / tileContainer.width();
        self.gridCroos.scale.y = self.gridCroos.height / tileContainer.height();

        function tileMargin(axis, step) {
            var
                temp = 0;
            if (self.gridCroos.tileGridY.height() <= self.gridCroos.height && self.gridCroos.tileGridX.width() <= self.gridCroos.width) {
                self.margin[axis]['value'] = self.margin[axis]['value'] + step;

                for (var i = 2; i <= self.count[axis] + 1; i++) {
                    tileWrapper.find('.' + self.margin[axis]['marginClass'] + i).each(function () {
                        var $this = $(this);
                        switch (axis) {
                            case 'x':
                                $this.css({
                                    left: '+=' + step * (i - 1)
                                });
                                temp = self.margin[axis]['value'] * self.gridCroos.scale.x; //width X cross
                                $(self.gridCroos.tileGridY).css({
                                    width: (temp <= self.gridCroos.width ? temp : self.gridCroos.width) + 'px'
                                });
                                break;
                            case 'y':
                                $this.css({
                                    top: '+=' + step * (i - 1)
                                });
                                temp = self.margin[axis]['value'] * self.gridCroos.scale.y; //height Y cross
                                $(self.gridCroos.tileGridX).css({
                                    height: (temp <= self.gridCroos.height ? temp : self.gridCroos.height) + 'px'
                                });
                                break;
                        }
                        marginButtons.writeCoord(self.margin[axis]['value'], marginButtons[axis]['input']);
                    });
                }
            }

        }

        marginButtons.x.inputTitle.text("\u2194");
        marginButtons.y.inputTitle.text("\u2195");

        marginButtons.writeCoord(self.margin.x.value, marginButtons.x.input);
        marginButtons.writeCoord(self.margin.y.value, marginButtons.y.input);

        marginButtons.x.btnUp.off('click').on('click', function () {
            tileMargin('x', 1);
        });

        marginButtons.x.btnDown.off('click').on('click', function () {
            tileMargin('x', -1);
        });

        marginButtons.y.btnUp.off('click').on('click', function () {
            tileMargin('y', 1);
        });
        marginButtons.y.btnDown.off('click').on('click', function () {
            tileMargin('y', -1);
        });

        marginButtons.x.input.off('change').on('change', function () {
            tileMargin('x', parseInt(this.value) - self.margin.x.value);
        });
        marginButtons.y.input.off('change').on('change', function () {
            tileMargin('y', parseInt(this.value) - self.margin.y.value);
        });
    };

    this.setSlider = function () {
        slider.setElement(tileWrapper);
        slider.sliderOpacity(slider.$rangeOpacity.slider('value'));
    }
}

Tile.prototype.tileWrapper = $('<div/>');

function Position(options) { //создаем функцию конструктор
    this.options = options;

    this.created = false;
    this.gridElem = '.grid__item_';
    this.gridElements = '.grid__item';

    this.tile = new Tile(
        {
            tile: options.$watermark,
            tileContainer: options.$mainImg,
            marginButtons: options.axisButtons,
            tileGridCross: options.tileGridCross,
            slider: options.slider
        }
    );

    this.watermark = {
        elem: options.$watermark,
        width: options.$watermark.width(),
        height: options.$watermark.height(),
        position: {
            left: 0,
            top: 0
        }
    };

    this.workspace = options.$workspace;
    this.mainImg = {
        elem: options.$mainImg,
        width: options.$mainImg.width(),
        height: options.$mainImg.height()
    };

    this.placeGrid = options.$placeGrid;
    this.axisButtons = options.axisButtons;
    this.gridButtons = options.gridButtons;
}

Position.prototype.reInit = function () {

    var
        tileInitOptions = this.tile.reInitOptions;

    this.initWatermark();
    this.initMainImg();

    this.initAxis();

    this.tile.tileWrapper.remove();
    this.tile.gridCroos.hide();

    delete this.tile;

    this.tile = new Tile(tileInitOptions);

    this.setSlider();

    // all work width X coords
    this.initCoordsX();

    // all work width Y coords
    this.initCoordsY();
};

Position.prototype.initAxis = function () {
    this.axis = {
        top: (parseFloat(this.mainImg.elem.css('margin-top')) == 0) ? parseFloat(this.mainImg.elem.position().top) : parseFloat(this.mainImg.elem.css('margin-top')),
        left: (parseFloat(this.mainImg.elem.css('margin-left')) == 0) ? parseFloat(this.mainImg.elem.position().left) : parseFloat(this.mainImg.elem.css('margin-left'))
    };
};

Position.prototype.initMainImg = function () {
    this.mainImg.width = this.mainImg.elem.width();
    this.mainImg.height = this.mainImg.elem.height();
};

Position.prototype.initWatermark = function () {
    this.watermark.position.left = 0;
    this.watermark.position.top = 0;
    this.positionCssElem(this.watermark.position.left, this.watermark.position.top);
    this.watermark.width = this.watermark.elem.width();
    this.watermark.height = this.watermark.elem.height();
    this.watermark.elem.css('display', 'block');
};

Position.prototype.init = function () {
    var
        switchBtn = this.options.switchBtn,
        self = this;

    if (this.created) {
        switchBtn.tileBtn.removeClass('toggle__item_grid-active');
        switchBtn.singleBtn.addClass('toggle__item_single-active');
        this.reInit();
        return this
    }

    switchBtn.tileBtn.on('click', function () {
        self.watermark.elem.hide();
        if (!self.tile.created) {
            var
                tile = self.tile.make();
            self.workspace.append(tile)
        } else {
            self.tile.bindButtons();
            self.tile.tileWrapper.show();
            self.tile.setSlider();
        }
        if (!switchBtn.tileBtn.hasClass('toggle__item_grid-active')) {
            switchBtn.tileBtn.addClass('toggle__item_grid-active');
            switchBtn.singleBtn.removeClass('toggle__item_single-active');
        }
    });


    switchBtn.singleBtn.on('click', function () {
        if (self.tile) {
            self.tile.tileWrapper.hide();
            self.tile.gridCroos.hide();
        }
        if (!switchBtn.singleBtn.hasClass('toggle__item_single-active')) {
            self.watermark.elem.show();
            self.setSlider();
            self.initCoordsX();
            self.initCoordsY();
            switchBtn.tileBtn.removeClass('toggle__item_grid-active');
            switchBtn.singleBtn.addClass('toggle__item_single-active');
        }
    });

    switchBtn.tileBtn.removeClass('toggle__item_grid-active');
    switchBtn.singleBtn.addClass('toggle__item_single-active');

    /**
     *
     * * drag and work with value X and Y
     *
     **/
    this.initAxis();

    // all work width X coords
    this.initCoordsX();

    // all work width Y coords
    this.initCoordsY();

    //drag working
    this.watermark.elem.on('drag', function (event, ui) {
        $(self.gridElements).removeClass('grid__item_active'); //clear gird active class elem
        self.watermark.position.left = ui.position.left;
        self.watermark.position.top = ui.position.top;
        self.axisButtons.writeCoord(self.watermark.position.left, self.axisButtons.x.input);
        self.axisButtons.writeCoord(self.watermark.position.top, self.axisButtons.y.input);
    });

    this.watermark.elem.draggable({
        stop: function (event, ui) {
            self.watermark.position.left = ui.position.left;
            self.watermark.position.top = ui.position.top;
            self.axisButtons.writeCoord(self.watermark.position.left, self.axisButtons.x.input);
            self.axisButtons.writeCoord(self.watermark.position.top, self.axisButtons.y.input);
        }
    });

    this.setSlider = function () {
        slider.setElement(this.watermark.elem);
        slider.sliderOpacity(slider.$rangeOpacity.slider('value'));
    };
    /****
     *
     * * grid work
     *
     */

    this.placeGrid.on('click', function (e) {
        self.eventPosition(e.target);
    });

    this.eventPosition = function (pos) {
        var classNameTarget = pos.className,
            posX,
            posY,
            sectorCenterX = self.mainImg.width / 2,
            sectorCenterY = self.mainImg.height / 2,
            re = new RegExp(self.gridButtons + '_(\\d)', 'gi'),
            gridNum = re.exec(classNameTarget);

        switch (gridNum[1]) {

        /***
         * top position
         */
            case '1':
                posX = this.axis.left;
                posY = this.axis.top;
                this.movePositionElem(posX, posY, 1);
                break;

            case '2':
                posX = sectorCenterX - this.watermark.width / 2 + this.axis.left;
                posY = this.axis.top;
                this.movePositionElem(posX, posY, 2);
                break;

            case '3':
                posX = this.mainImg.width - this.watermark.width + this.axis.left;
                posY = this.axis.top;
                this.movePositionElem(posX, posY, 3);
                break;


        /***
         * center position
         */

            case '4':
                posX = this.axis.left;
                posY = sectorCenterY - this.watermark.height / 2 + this.axis.top;

                this.movePositionElem(posX, posY, 4);
                break;
            case '5':
                posX = this.axis.left + sectorCenterX - this.watermark.width / 2;
                posY = this.axis.top + sectorCenterY - this.watermark.height / 2;

                self.movePositionElem(posX, posY, 5);
                break;
            case '6':
                posX = this.axis.left + this.mainImg.width - this.watermark.width;
                console.log(this.axis.top, '+', sectorCenterY, '-', this.watermark.height / 2);
                posY = this.axis.top + sectorCenterY - this.watermark.height / 2;
                console.log(posY);

                this.movePositionElem(posX, posY, 6);
                break;

        /***
         * bottom position
         */

            case '7':
                posX = this.axis.left;
                posY = this.axis.top + this.mainImg.height - this.watermark.height;
                self.movePositionElem(posX, posY, 7);
                break;
            case '8':
                posX = this.axis.left + sectorCenterX - this.watermark.width / 2;
                posY = this.axis.top + this.mainImg.height - this.watermark.height;
                this.movePositionElem(posX, posY, 8);
                break;
            case '9':
                posX = this.axis.left + this.mainImg.width - this.watermark.width;
                posY = this.axis.top + this.mainImg.height - this.watermark.height;
                this.movePositionElem(posX, posY, 9);
                break;

            default:
                alert('Я таких значений не знаю');
        }
    };

    this.movePositionElem = function (x, y, i) {

        self.watermark.elem.animate(
            {
                top: y,
                left: x
            },
            {
                duration: 500,
                queue: false,
            });

        self.watermark.position.left = x;
        self.watermark.position.top = y;
        self.axisButtons.writeCoord(x, self.axisButtons.x.input);
        self.axisButtons.writeCoord(y, self.axisButtons.y.input);

        //add active grid elem
        $(self.gridElements).removeClass('grid__item_active');
        $(self.gridElem + i).addClass('grid__item_active');
    };

    //clear grid active class elem
    $('.wrapper').click(function (event) {
        classNameElem = event.target.className.split(' ');

        if (classNameElem[0] !== 'grid__item') {
            $(self.gridElements).removeClass('grid__item_active');
        }

    });

    this.positionCssElem = function (posCssX, posCssY) {

        if ((posCssX >= -this.watermark.width && posCssX <= this.mainImg.width + this.watermark.width) && (posCssY >= -this.watermark.height && posCssY <= this.mainImg.height + this.watermark.height)) {
            this.watermark.elem.css({
                left: posCssX + 'px',
                top: posCssY + 'px'
            });
        }
    };

    this.created = true;

    return this;
};

Position.prototype.initCoordsX = function () {
    var self = this;

    this.axisButtons.writeCoord(this.watermark.position.left, this.axisButtons.x.input);
    this.axisButtons.x.inputTitle.text('X');

    // START x coords and input value
    this.axisButtons.x.btnDown.off('click').on('click', function () {
        console.log();
        self.watermark.position.left -= 1;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.left, self.axisButtons.x.input);
    });

    this.axisButtons.x.btnUp.off('click').on('click', function () {
        console.log(self.watermark.position.left);
        self.watermark.position.left += 1;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.left, self.axisButtons.x.input);
    });

    this.axisButtons.x.input.off('change').on('change', function () {
        self.watermark.position.left = parseInt(this.value);
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
    });
    // END x coords and input value
};


Position.prototype.initCoordsY = function () {
    var self = this;

    this.axisButtons.writeCoord(this.watermark.position.top, this.axisButtons.y.input);

    this.axisButtons.y.inputTitle.text('Y');

    // START y coords and input value
    this.axisButtons.y.btnUp.off('click').on('click', function () {
        self.watermark.position.top -= 1;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.top, self.axisButtons.y.input);
    });

    this.axisButtons.y.btnDown.off('click').on('click', function () {
        if (self.watermark.position.top < self.mainImg.height + self.watermark.height) {
            self.watermark.position.top += 1;
        }
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.top, self.axisButtons.y.input);
    });

    this.axisButtons.y.input.off('change').on('change', function () {
        self.watermark.position.top = parseInt(this.value);
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
    });
    // END x coords and input value
};