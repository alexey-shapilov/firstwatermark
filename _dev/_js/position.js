function Tile(options) {
    var
        tileItemClass = 'tile-item',
        tileWrapperClass = 'tile-wrapper',
        self = this,
        tile = options.tile,
        tileContainer = options.tileContainer,
        tileWrapper = $('<div/>'),
        tileWidth = tile.width(),
        tileHeight = tile.height();
    tileWrapper.addClass(tileWrapperClass);

    this.count = {
        axisX: tileWidth / tileContainer.width(),
        axisY: tileHeight / tileContainer.height()
    };

    this.make = function () {
        tile.css({
            top: 0,
            left: 0
        });

        var
            img = '<img src="' + tile.attr('src') + '" class="' + tile.attr('class') + ' ' + tileItemClass + '" %style%>',
            imgs = '';
        for (var i = 0; i < self.count.axisX; i++) {
            for (var j = 0; j < self.mosh.axisY; j++) {
                imgs += img.replace('%style%', 'style="left:' + (tileWidth * i) + 'px; top:' + (tileHeight * j) + 'px;"')
            }
        }
        tileWrapper.html(imgs);

        tile.css('display', 'none');
        tileWrapper.draggable();
    }
};

function Position(options) { //создаем функцию конструктор
    this.options = options;
    this.tile = new Tile(
        {
            tile: options.$watermark,
            tileContainer: options.$mainImg
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
    this.placeElemBodyImg = options.$placeElemBodyImg;
    this.placeGrid = options.$placeGrid;
    this.axisButtons = options.axisButtons;
    this.gridButtons = options.gridButtons;
}

Position.prototype.init = function () {
    var
        $tileBtn = this.options.$tileBtn,
        self = this;

    $tileBtn.on('click', function (event) {
        self.tile.make();
    });

    /****
     *
     * * drag and work with value X and Y
     *
     */

        //area our watermark
        //this.$placeElemImg = options.$placeElemImg;
        //this.$placeElemBodyImg = options.$placeElemBodyImg;

    this.axis = {
        top: (parseFloat(this.mainImg.elem.css('margin-top')) == 0) ? parseFloat(this.mainImg.elem.position().top) : parseFloat(this.mainImg.elem.css('margin-top')),
        left: (parseFloat(this.mainImg.elem.css('margin-left')) == 0) ? parseFloat(this.mainImg.elem.position().left) : parseFloat(this.mainImg.elem.css('margin-left'))
    };

    // all work width X coords
    this.initCoordsX();

    // all work width Y coords
    this.initCoordsY();

    //drag working
    this.watermark.elem.on('drag', function (event, ui) {
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
                this.movePositionElem(posX, posY);
                break;

            case '2':
                posX = sectorCenterX - this.watermark.width / 2 + this.axis.left;
                posY = this.axis.top;
                this.movePositionElem(posX, posY);
                break;

            case '3':
                posX = this.mainImg.width - this.watermark.width + this.axis.left;
                posY = this.axis.top;
                this.movePositionElem(posX, posY);
                break;


        /***
         * center position
         */

            case '4':
                posX = this.axis.left;
                posY = sectorCenterY - this.watermark.height / 2 + this.axis.top;

                this.movePositionElem(posX, posY);
                break;
            case '5':
                posX = this.axis.left + sectorCenterX - this.watermark.width / 2;
                posY = this.axis.top + sectorCenterY - this.watermark.height / 2;

                self.movePositionElem(posX, posY);
                break;
            case '6':
                posX = this.axis.left + this.mainImg.width - this.watermark.width;
                console.log(this.axis.top, '+', sectorCenterY, '-', this.watermark.height / 2);
                posY = this.axis.top + sectorCenterY - this.watermark.height / 2;
                console.log(posY);

                this.movePositionElem(posX, posY);
                break;

        /***
         * bottom position
         */

            case '7':
                posX = this.axis.left;
                posY = this.axis.top + this.mainImg.height - this.watermark.height;
                self.movePositionElem(posX, posY);
                break;
            case '8':
                posX = this.axis.left + sectorCenterX - this.watermark.width / 2;
                posY = this.axis.top + this.mainImg.height - this.watermark.height;
                this.movePositionElem(posX, posY);
                break;
            case '9':
                posX = this.axis.left + this.mainImg.width - this.watermark.width;
                posY = this.axis.top + this.mainImg.height - this.watermark.height;
                this.movePositionElem(posX, posY);
                break;

            default:
                alert('Я таких значений не знаю');
        }
    };

    this.movePositionElem = function (x, y) {

        self.watermark.elem.css({
            top: y,
            left: x
        });
        self.watermark.position.left = x;
        self.watermark.position.top = y;
        self.axisButtons.writeCoord(x, self.axisButtons.x.input);
        self.axisButtons.writeCoord(y, self.axisButtons.y.input);
    };

    this.positionCssElem = function (posCssX, posCssY) {

        if ((posCssX >= -this.watermark.width && posCssX <= this.mainImg.width + this.watermark.width) && (posCssY >= -this.watermark.height && posCssY <= this.mainImg.height + this.watermark.height)) {
            this.watermark.elem.css({
                left: posCssX + 'px',
                top: posCssY + 'px'
            });
        }
    };

    return this;
};

Position.prototype.initCoordsX = function () {
    var self = this;
    // START x coords and input value
    this.axisButtons.x.btnDown.on('click', function () {
        console.log();
        self.watermark.position.left -= 1;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.left, self.axisButtons.x.input);
    });

    this.axisButtons.x.btnUp.on('click', function () {
        console.log(self.watermark.position.left);
        self.watermark.position.left += 1;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.left, self.axisButtons.x.input);
    });

    this.axisButtons.x.input.change(function () {
        self.watermark.position.left = this.value;
        self.positionCssElem(sself.watermark.position.left, self.watermark.position.top);
    });
    // END x coords and input value
};


Position.prototype.initCoordsY = function () {
    var self = this;
    // START y coords and input value
    this.axisButtons.y.btnUp.on('click', function () {
        self.watermark.position.top -= 1;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.top, self.axisButtons.y.input);
    });

    this.axisButtons.y.btnDown.on('click', function () {
        if (self.watermark.position.top < self.mainImg.height + self.watermark.height) {
            self.watermark.position.top += 1;
        }
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
        self.axisButtons.writeCoord(self.watermark.position.top, self.axisButtons.y.input);
    });

    this.axisButtons.y.input.change(function () {
        self.watermark.position.top = this.value;
        self.positionCssElem(self.watermark.position.left, self.watermark.position.top);
    });
    // END x coords and input value
};