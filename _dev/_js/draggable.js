(function(){

    var Drag = function(){ //создаем функцию конструктор

        var self = this; //ссылка на себя



        this.init =  function(options){ //метод принимающий нужные элементы

            this.$dragPlace = options.$dragPlace; //запоминаем выбранные элементы в переменные
            this.$dragElem = options.$dragElem;

            this.areaWidth =  this.$dragPlace.width() + this.$dragElem.width();
            this.areaHeight =  this.$dragPlace.height() + this.$dragElem.height();
            self.dragActive(); // вызываем метод у конструктора
            //console.log([self.areaHeight, self.areaWidth]);
        };
        this.dragActive = function(){

            this.$dragElem.draggable({
                //containment: [-(self.$dragElem.width()), 0, self.areaHeight, self.areaWidth, self.areaHeight],
                scroll: false
            })
        };

    };

    d = new Drag(); //создаем наш драг объект

    d.init({// указываем ему необходимые элементы для работы
        $dragPlace: $('.picture__body'),
        $dragElem: $('.picture__watermark')
    });

}());

