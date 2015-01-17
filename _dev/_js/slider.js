(function(){

    var Slider = function(){ //создаем функцию конструктор

        var self = this; //ссылка на себя

        this.value =  null;

        this.init =  function(options){ //метод принимающий нужные элементы

            this.$rangeOpacity = options.$rangeOpacity; //запоминаем выбранные элементы в переменные
            this.$elemOpacity = options.$elemOpacity;

            self.sliderActive(); // вызываем метод у конструктора

        };
        this.sliderActive =  function(){

            this.$rangeOpacity.slider({// функция jquery ui, с настройками

                max: 1,// максимальное значение
                min: 0,// минимальное значение
                step:0.01,// шаг бегунка
                value: 0.5,// первоначальное положение бегунка

                slide:function( event, ui ) { // метод помогающий понять значение бегунка
                    this.value = ui.value;
                    self.sliderOpacity(this.value); // передача значение бегунка методу конструктора
                }
            });
        };

        this.sliderOpacity = function(val){ // функция изменяющая прозрачность элемента
            this.$elemOpacity.css('opacity', val);
        };
    };

    s = new Slider(); //создаем наш бегунок

    s.init({// указываем ему необходимые элементы для работы
        $rangeOpacity: $('.transparent__body'),
        $elemOpacity: $('.picture__watermark')
    });

}());

