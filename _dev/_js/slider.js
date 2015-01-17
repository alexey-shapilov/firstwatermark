(function(){

    var slider = {

        value: null,

        init: function(options){

            var self = this;
            this.$rangeOpacity = options.$rangeOpacity;
            this.$elemOpacity = options.$elemOpacity;
            slider.sliderActive();
        },
        sliderActive: function(){

            this.$rangeOpacity.slider({

                max: 1,
                min: 0,
                step:0.01,
                value: 0.5,

                slide:function( event, ui ) {
                    this.value = ui.value;
                    slider.sliderOpacity(this.value);
                }
            });
        },

        sliderOpacity:function(val){
            this.$elemOpacity.css('opacity', val);
        }
    };

    slider.init({
        $rangeOpacity: $('.transparent__body'),
        $elemOpacity: $('.picture__watermark')
    });

}());

