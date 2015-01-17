(function(){

    var Position = function(){ //создаем функцию конструктор

        var self = this;

        this.init =  function(options){ //метод принимающий нужные элементы
            // здесь я перешел на английский =)
            //console.log(this.coordsX);
            //x coords and value
            this.$xCoordInputValue = options.$xCoordInputValue;
            this.$xCoordDownButton = options.$xCoordDownButton;
            this.$xCoordUpButton = options.$xCoordUpButton;

            //y coords and value
            this.$yCoordInputValue = options.$yCoordInputValue;
            this.$yCoordUpButton = options.$yCoordUpButton;
            this.$yCoordDownpButton = options.$yCoordDownpButton;

            //area our button
            this.$areaCoord = options.$areaCoord;

            //style position our elem and listener coords when drag
            this.$elemCoord = options.$elemCoord;
            this.coordsX = 0;
            this.coordsY = 0;


            //working coords drag
            this.$elemCoord.on('drag', function( event, ui ) {
                self.coordsX = ui.position.left;
                self.coordsY = ui.position.top;
                self.texWriteX(self.coordsX);
            });

            // START x coords and input value
            this.$xCoordDownButton.click(function(){
                console.log(self.coordsX);
                --self.coordsX;
                self.$elemCoord.css('left', self.coordsX + 'px');
                self.texWriteX(self.coordsX);
            });

            this.$xCoordUpButton.click(function(){
                ++self.coordsX;
                self.$elemCoord.css('left', self.coordsX + 'px');
                self.texWriteX(self.coordsX);
            });

            this.$xCoordInputValue.change(function(){
                self.coordsX = this.value; // нужен метож обрабатывающий координаты x и y
                self.$elemCoord.css('left', self.coordsX + 'px');
            });
            // END x coords and input value

        };

        this.texWriteX = function(text){
            //console.log(self.$xCoordInputValue.val());
            self.$xCoordInputValue.val(text);
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
        $areaCoord: $('.coord'),
        $elemCoord: $('.picture__watermark')
    });

}());