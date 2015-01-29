function Drag(options){
    this.$dragPlace = options.$dragPlace; //запоминаем выбранные элементы в переменные
    this.$dragElem = options.$dragElem;
}

Drag.prototype.init = function () { //метод принимающий нужные элементы
    this.dragActive(); // вызываем метод у конструктора
};

Drag.prototype.dragActive = function(){
    this.$dragElem.draggable({
        scroll: false
    })
};

var drag = new Drag({ //создаем драг
    $dragPlace: $('.picture__body'),
    $dragElem: $('.picture__watermark')
});