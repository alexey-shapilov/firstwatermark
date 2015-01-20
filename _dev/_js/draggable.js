(function($){

    var Drag = function(){ //создаем функцию конструктор

        var self = this; //ссылка на себя



        this.init =  function(options){ //метод принимающий нужные элементы

            this.$dragPlace = options.$dragPlace; //запоминаем выбранные элементы в переменные
            this.$dragElem = options.$dragElem;

            self.dragActive(); // вызываем метод у конструктора

        };
        this.dragActive = function(){

            this.$dragElem.draggable({
                containment: this.$dragPlace,
                scroll: false
            })
        };

    };

    d = new Drag(); //создаем наш драг объект

    d.init({// указываем ему необходимые элементы для работы
        $dragPlace: $('.picture__body'),
        $dragElem: $('.picture__watermark')
    });

})(jQuery);

