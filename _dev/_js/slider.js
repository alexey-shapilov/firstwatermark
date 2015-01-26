function Slider(options) {
    this.value = null; //текущее значение слайдера
    this.$rangeOpacity = options.$rangeOpacity; //запоминаем выбранные элементы в переменные
    this.$elemOpacity = options.$elemOpacity;
    //this.self = this; //ссылка на себя
} //создаем функцию конструктор


Slider.prototype.init = function () { //метод принимающий нужные элементы
    this.sliderActive(); // вызываем метод у конструктора
};

Slider.prototype.sliderActive = function () {

    var self = this; // ссылка на себя

    this.$rangeOpacity.slider({// функция jquery ui, с настройками

        max: 1,// максимальное значение
        min: 0,// минимальное значение
        step: 0.01,// шаг бегунка
        value: 0.5,// первоначальное положение бегунка

        slide: function (event, ui) { // метод помогающий понять значение бегунка
            self.value = ui.value;
            self.sliderOpacity(self.value); // передача значение бегунка методу конструктора
        }
    });
};

Slider.prototype.sliderOpacity = function (val) { // функция изменяющая прозрачность элемента
    this.$elemOpacity.css('opacity', val); //изменение прозрачности водяного знака
	
	if($('.tile-wrapper').lenght){
		$('.tile-wrapper').css('opacity', val);//изменение прозрачности копий водяного знака
	}
    
};

var slider = new Slider({// указываем ему необходимые элементы для работы
    $rangeOpacity: $('.transparent__item'),
    $elemOpacity: $('.picture__watermark')
}); //создаем наш бегунок

slider.init();
console.log(slider);