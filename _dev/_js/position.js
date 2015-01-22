!function(){

    var Position = function(){ //создаем функцию конструктор

        var self = this;

        this.init =  function(options){

            /****
             *
             * * drag and work with value X and Y
             *
             */

                //x coords button and value
            this.$xCoordInputValue = options.$xCoordInputValue;
            this.$xCoordDownButton = options.$xCoordDownButton;
            this.$xCoordUpButton = options.$xCoordUpButton;

            //y coords button and value
            this.$yCoordInputValue = options.$yCoordInputValue;
            this.$yCoordDownpButton = options.$yCoordDownpButton;
            this.$yCoordUpButton = options.$yCoordUpButton;


            //style position our elem and listener coords when drag
            this.$elem = options.$elem;
            this.$elemWidth = options.$elem.width();
            this.$elemHeight = options.$elem.height();
            this.coordsX = 0;
            this.coordsY = 0;

            //area our watermark
            this.$placeElem = options.$placeElem;
            this.$placeElemImg = options.$placeElemImg;
            this.$placeElemBodyImg = options.$placeElemBodyImg;

            this.$placeElemImgWidth = this.$placeElemImg.width();
            this.$placeElemImgHeight = this.$placeElemImg.height();

            this.elemTop = parseFloat(this.$placeElemImg.position().top);
            this.elemLeft = parseFloat(this.$placeElemImg.position().left);
            this.elemMarginTop = parseFloat(this.$placeElemImg.css('margin-top'));
            this.elemMarginLeft = parseFloat(this.$placeElemImg.css('margin-left'));

            this.axis = {
                top: (self.elemMarginTop == '0') ? self.elemTop : self.elemMarginTop,
                left: (self.elemMarginLeft == '0') ? self.elemLeft : self.elemMarginLeft
            }

            this.$placeElemWidth = this.$placeElem.width() - this.$elem.width();
            this.$placeElemHeight = this.$placeElem.height() - this.$elem.height();

            /****
             *
             * * mosh work START
             *
             */
            this.mosh = {
                status: false,
                moshClone: 'mosh__item',
                moshBody: 'mosh__body',
                copyX: self.$placeElemWidth/self.$elemWidth,
                copyY :self.$placeElemHeight/self.$elemHeight,
                moshButton : options.$moshButton,
                moshDelButton : options.$moshDelButton
            };

            this.mosh.moshButton.click(function(){

                if(!self.mosh.status){
                    self.$elem.css({
                        top: 0,
                        left: 0
                    });
                self.$placeElemBodyImg.append('<div class="mosh__body">');

                    for(var i = 0; i < self.mosh.copyX; i++ ) {
                        for(var j = 0; j < self.mosh.copyY; j++) {
                            self.$elem.clone().addClass(self.mosh.moshClone)
                                .css('left', '+=' + self.$elemWidth * i)
                                .css('top', '+=' + self.$elemHeight * j)
                                .appendTo('.'+self.mosh.moshBody);
                        }
                    }
                    //$('.mosh__item').appendTo('.mosh__body');
                    self.$elem.css('display','none');
                    $('.mosh__body').draggable();
                }

                self.mosh.status = true;
            });

            this.mosh.moshDelButton.click(function(){

                if(self.mosh) {
                    $('.mosh__body').remove();
                    self.$elem.css('display', 'block');
                }
                self.mosh.status = false;
            });

            /****
             *
             * * mosh work END
             *
             */
            // all work width X coords
            this.xCoordsWork();

            // all work width Y coords
            this.yCoordsWork();

            //drag working
            self.$elem.on('drag', function( event, ui ) {
                self.coordsX = ui.position.left;
                self.coordsY = ui.position.top;
                self.texWriteX(self.coordsX);
                self.texWriteY(self.coordsY);
            });

            self.$elem.draggable({
                stop: function( event, ui ) {
                    self.coordsX = ui.position.left;
                    self.coordsY = ui.position.top;
                    self.texWriteX(self.coordsX);
                    self.texWriteY(self.coordsY);
                }
            });
            /****
             *
             * * grid work
             *
             */

                //option
            this.sectorWidth = 0;
            this.sectorHeight = 0;

            //place grid
            this.$placeGrind = options.$placeGrind;

            //top
            this.$leftTop = options.$leftTop;
            this.$rightTop = options.$rightTop;
            this.$centerTop = options.$centerTop;

            //center
            this.$centerLeft = options.$centerLeft;
            this.$centerCenter = options.$centerCenter;
            this.$centerRight = options.$centerRight;

            //bottom
            this.$bottomLeft = options.$bottomLeft;
            this.$bottomCenter = options.$bottomCenter;
            this.$bottomRight = options.$bottomRight;

            //event click
            this.$placeGrind.click(function(e){
                var event = e || window.event,
                    target = event.target || event.srcElement;

                self.eventPosition(target);

            });
        };

        this.eventPosition = function(pos){
            var classNameTarget = pos.className,
                posX,
                posY,
                sectorCenterX = self.$placeElemImgWidth/2,
                sectorCenterY = self.$placeElemImgHeight/2;

            switch (classNameTarget) {

            /***
             * top position
             */
                case self.$leftTop:
                    posX = this.axis.left;
                    posY = this.axis.top;
                    self.movePositionElem(posX, posY);
                    break;

                case self.$centerTop:
                    posX = sectorCenterX - self.$elemWidth/2 + this.axis.left ;
                    posY = this.axis.top;
                    self.movePositionElem(posX, posY);
                    break;

                case self.$rightTop:
                    posX = self.$placeElemImgWidth - self.$elemWidth + this.axis.left;
                    posY = this.axis.top;
                    self.movePositionElem(posX, posY);
                    break;


            /***
             * center position
             */

                case self.$centerLeft:
                    posX = self.axis.left;
                    posY = sectorCenterY - self.$elemHeight / 2 + self.axis.top;

                    self.movePositionElem(posX, posY);
                    break;
                case self.$centerCenter:
                    posX = self.axis.left + sectorCenterX - self.$elemWidth/2;
                    posY = self.axis.top + sectorCenterY - self.$elemHeight / 2;

                    self.movePositionElem(posX, posY);
                    break;
                case self.$centerRight:
                    posX = self.axis.left + self.$placeElemImgWidth - self.$elemWidth;
                    posY = self.axis.top + sectorCenterY - self.$elemHeight / 2;

                    self.movePositionElem(posX, posY);
                    break;

            /***
             * bottom position
             */

                case self.$bottomLeft:
                    posX = self.axis.left;
                    posY = self.axis.top + self.$placeElemImgHeight - self.$elemHeight;
                    self.movePositionElem(posX, posY);
                    break;
                case self.$bottomCenter:
                    posX = self.axis.left + sectorCenterX - self.$elemWidth/2;
                    posY = self.axis.top + self.$placeElemImgHeight - self.$elemHeight;
                    self.movePositionElem(posX, posY);
                    break;
                case self.$bottomRight:
                    posX = self.axis.left + self.$placeElemImgWidth - self.$elemWidth;
                    posY = self.axis.top + self.$placeElemImgHeight - self.$elemHeight;
                    self.movePositionElem(posX, posY);
                    break;

                default:
                    alert('Я таких значений не знаю');
            }
        };

        this.movePositionElem = function(x,y){

            self.$elem.css({
                top: y,
                left: x
            });
            self.coordsX = x;
            self.coordsY = y;
            self.texWriteX(x);
            self.texWriteY(y);
        };

        this.xCoordsWork = function() {


            // START x coords and input value
            self.$xCoordDownButton.click(function(){
                //console.log(self.coordsX);
                console.log(self.coordsX);
                //if(self.coordsX  > -self.$elemWidth){
                    --self.coordsX;
                //}

                self.positionCssElem(self.coordsX,self.coordsY);
                self.texWriteX(self.coordsX);
            });

            self.$xCoordUpButton.click(function(){

                //if(self.coordsX < self.$placeElemWidth+self.$elemWidth){
                    ++self.coordsX;
                //}
                self.positionCssElem(self.coordsX,self.coordsY);
                self.texWriteX(self.coordsX);
            });

            self.$xCoordInputValue.change(function(){
                self.coordsX = this.value;
                self.positionCssElem(self.coordsX,self.coordsY);
            });
            // END x coords and input value
        };

        // write text value X
        this.texWriteX = function(textX){

            var textX = Math.round(textX);
            //if(textX >= -self.$elemWidth && textX <= self.$placeElemWidth+self.$elemWidth){
                self.$xCoordInputValue.val(textX);
            //}
        };


        this.yCoordsWork = function() {

            // START y coords and input value
            self.$yCoordUpButton.click(function(){
                //console.log(self.coordsX);

                //if(self.coordsY  > -self.$elemHeight){
                    --self.coordsY;
                //}

                self.positionCssElem(self.coordsX,self.coordsY);
                self.texWriteY(self.coordsY);
            });

            self.$yCoordDownpButton.click(function(){

                if(self.coordsY < self.$placeElemHeight+self.$elemHeight){
                    ++self.coordsY;
                }
                self.positionCssElem(self.coordsX,self.coordsY);;
                self.texWriteY(self.coordsY);
            });

            self.$yCoordInputValue.change(function(){
                self.coordsY = this.value;
                self.positionCssElem(self.coordsX,self.coordsY);
            });
            // END x coords and input value
        };

        // write text value Y
        this.texWriteY = function(textY){

            var textY = Math.round(textY);
            //if(textY >= -self.$elemHeight && textY <= self.$placeElemHeight+self.$elemHeight){
                self.$yCoordInputValue.val(textY);
            //}

        };

        this.positionCssElem = function(posCssX,posCssY){

            var posCssY = posCssY,
                posCssX = posCssX;

            if((posCssX >= -self.$elemWidth && posCssX <= self.$placeElemWidth+self.$elemWidth) && (posCssY >= -self.$elemHeight && posCssY <= self.$placeElemHeight+self.$elemHeight)){
                self.$elem.css({
                    left: posCssX + 'px',
                    top: posCssY + 'px'
                });
            }
        };

    };

    p = new Position(); //создаем наш бегунок

    p.init({

        //x and Y value, button
        $xCoordInputValue: $('#x_coordinate'),
        $xCoordDownButton: $('.coord__arrow_down'),
        $xCoordUpButton: $('.coord__arrow_up'),
        $yCoordInputValue: $('#y_coordinate'),
        $yCoordUpButton: $('.button__arrow_up'),
        $yCoordDownpButton: $('.button__arrow_down'),

        //area elem
        $placeElem: $('body'),
        $placeElemImg: $('.picture__upload'),
        $placeElemBodyImg: $('.picture__body'),
        //elem
        $elem: $('.picture__watermark'),

        // place grid events
        $placeGrind : $('.grid'),

        //position grid buttons
        $leftTop : "leftTop",
        $rightTop : "rightTop",
        $centerTop : "centerTop",
        $centerLeft : "centerLeft",
        $centerCenter : "centerCenter",
        $centerRight : "centerRight",
        $bottomLeft : "bottomLeft",
        $bottomCenter : "bottomCenter",
        $bottomRight : "bottomRight",

        //mosh buttons
        $moshButton : $('.mosh'),
        $moshDelButton : $('.mosh__del'),

    });

}();