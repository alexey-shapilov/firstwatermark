(function($){

    var Position = function(){ //создаем функцию конструктор

        var self = this;

        this.init =  function(options){ //метод принимающий нужные элементы
            // здесь я перешел на английский =)

            //x coords button and value
            this.$xCoordInputValue = options.$xCoordInputValue;
            this.$xCoordDownButton = options.$xCoordDownButton;
            this.$xCoordUpButton = options.$xCoordUpButton;

            //y coords button and value
            this.$yCoordInputValue = options.$yCoordInputValue;
            this.$yCoordUpButton = options.$yCoordUpButton;
            this.$yCoordDownpButton = options.$yCoordDownpButton;

            //style position our elem and listener coords when drag
            this.$elemCoord = options.$elemCoord;
            this.coordsX = 0;
            this.coordsY = 0;

            //area our button
            this.$areaCoord = options.$areaCoord;
            this.$areaCoordWidth = this.$areaCoord.width() - this.$elemCoord.width();
            this.$areaCoordHeight = this.$areaCoord.height() - this.$elemCoord.height();

            // all work width X coords
            this.xCoordsWork();

            // all work width Y coords
            this.yCoordsWork();

            //drag working
            self.$elemCoord.on('drag', function( event, ui ) {
                self.coordsX = ui.position.left;
                self.coordsY = ui.position.top;
                self.texWriteX(self.coordsX);
                self.texWriteY(self.coordsY);
            });
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

                if(self.coordsX < self.$areaCoordWidth){
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

            var textX = textX || 0;
            if(textX >= 0 && textX <= self.$areaCoordWidth){
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

                if(self.coordsY < self.$areaCoordHeight){
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

            var textY = textY || 0;
            if(textY >= 0 && textY <= self.$areaCoordHeight){
                self.$yCoordInputValue.val(textY);
            }

        };

        this.positionCssElem = function(posX,posY){
            console.log(posX);
            var posY = posY || 0,
                posX = posX || 0;

            if((posX >= 0 && posX <= self.$areaCoordWidth) && (posY >= 0 && posY <= self.$areaCoordHeight)){
                self.$elemCoord.css({
                    left: posX + 'px',
                    top: posY + 'px'
                });
            }
        };

    };

    p = new Position(); //создаем наш бегунок

    p.init({// указываем ему необходимые элементы для работы
        $xCoordInputValue: $('#x_coordinate'),
        $xCoordDownButton: $('.coord__arrow_down'),
        $xCoordUpButton: $('.coord__arrow_up'),
        $yCoordInputValue: $('#y_coordinate'),
        $yCoordUpButton: $('.button__arrow_up'),
        $yCoordDownpButton: $('.button__arrow_down'),
        $areaCoord: $('.picture__body'),
        $elemCoord: $('.picture__watermark'),
        $leftTop: $('.leftTop'),
        $rightTop: $('.rightTop'),
        $centerTop: $('.centerTop'),
    });

})(jQuery);