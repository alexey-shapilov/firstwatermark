(function(){

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
            this.$placeElemWidth = this.$placeElem.width() - this.$elem.width();
            this.$placeElemHeight = this.$placeElem.height() - this.$elem.height();

            this.$placeElemWidthtForGrid = this.$placeElem.width();
            this.$placeElemHeightForGrid = this.$placeElem.height();


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
                sectorCenterX = self.$placeElemWidthtForGrid / 2,
                sectorCenterY = self.$placeElemHeightForGrid / 2;

            switch (classNameTarget) {

            /***
             * top position
             */
                case self.$leftTop:
                    posX = 0;
                    posY = 0;
                    self.movePositionElem(posX, posY);
                    break;

                case self.$centerTop:
                    posX = sectorCenterX - self.$elemWidth/2;
                    posY = 0;
                    self.movePositionElem(posX, posY);
                    break;

                case self.$rightTop:
                    posX = self.$placeElemWidthtForGrid - self.$elemWidth;
                    posY = 0;
                    self.movePositionElem(posX, posY);
                    break;


            /***
             * center position
             */

                case self.$centerLeft:
                    posX = 0;
                    posY = sectorCenterY - self.$elemHeight / 2;

                    self.movePositionElem(posX, posY);
                    break;
                case self.$centerCenter:
                    posX = sectorCenterX - self.$elemWidth/2;
                    posY = sectorCenterY - self.$elemHeight / 2;

                    self.movePositionElem(posX, posY);
                    break;
                case self.$centerRight:
                    posX = self.$placeElemWidthtForGrid - self.$elemWidth;
                    posY = sectorCenterY - self.$elemHeight / 2;

                    self.movePositionElem(posX, posY);
                    break;

            /***
             * bottom position
             */

                case self.$bottomLeft:
                    posX = 0;
                    posY = self.$placeElemHeightForGrid - self.$elemHeight;
                    self.movePositionElem(posX, posY);
                    break;
                case self.$bottomCenter:
                    posX = sectorCenterX - self.$elemWidth/2;
                    posY = self.$placeElemHeightForGrid - self.$elemHeight;
                    self.movePositionElem(posX, posY);
                    break;
                case self.$bottomRight:
                    posX = self.$placeElemWidthtForGrid - self.$elemWidth;
                    posY = self.$placeElemHeightForGrid - self.$elemHeight;
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

                if(self.coordsX  > 0){
                    --self.coordsX;
                }

                self.positionCssElem(self.coordsX,self.coordsY);
                self.texWriteX(self.coordsX);
            });

            self.$xCoordUpButton.click(function(){

                if(self.coordsX < self.$placeElemWidth){
                    ++self.coordsX;
                }
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

            var textX = Math.round(textX) || 0;
            if(textX >= 0 && textX <= self.$placeElemWidth){
                self.$xCoordInputValue.val(textX);
            }
        };


        this.yCoordsWork = function() {

            // START y coords and input value
            self.$yCoordUpButton.click(function(){
                //console.log(self.coordsX);

                if(self.coordsY  > 0){
                    --self.coordsY;
                }

                self.positionCssElem(self.coordsX,self.coordsY);
                self.texWriteY(self.coordsY);
            });

            self.$yCoordDownpButton.click(function(){

                if(self.coordsY < self.$placeElemHeight){
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

            var textY = Math.round(textY) || 0;
            if(textY >= 0 && textY <= self.$placeElemHeight){
                self.$yCoordInputValue.val(textY);
            }

        };

        this.positionCssElem = function(posCssX,posCssY){

            var posCssY = posCssY || 0,
                posCssX = posCssX || 0;

            if((posCssX >= 0 && posCssX <= self.$placeElemWidth) && (posCssY >= 0 && posCssY <= self.$placeElemHeight)){
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
        $placeElem: $('.picture__body'),
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
        $bottomRight : "bottomRight"
    });

}());