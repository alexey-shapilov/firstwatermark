!function ($) {
    var
        resetBtn = $('.form__button_reset');

    resetBtn.on('click', function (event) {
        var
            position = uploader.getPosition();
        event.preventDefault();
        if (position !== undefined) {
            slider.$rangeOpacity.slider('value', 0.5);
            position.init();
        }
    })

}(jQuery);