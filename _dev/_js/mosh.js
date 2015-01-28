!function(){

    var Mosh = function(){ //создаем функцию конструктор

        var self = this;

        this.init =  function(options){

            this.$moshButton = options.$moshButton;
            this.$moshDelButton = options.$moshDelButton;


            this.$placeElemImg = options.$placeElemImg;

            this.$elem = options.$elem;
            this.$elemWidth = options.$elem.width();
            this.$elemHeight = options.$elem.height();

            this.$placeElem = options.$placeElem;
            this.$placeElemWidth = this.$placeElem.width();
            this.$placeElemHeight = this.$placeElem.height();

            this.copyX = self.$placeElemWidth/self.$elemWidth;
            this.copyY = self.$placeElemHeight/self.$elemHeight;

            this.mosh = false;

            this.$moshButton.click(function(){
                var i,
                    countCopy = self.copyX*self.copyY;
                if(!self.mosh){
                    self.$elem.css({
                        top: 0,
                        left: 0,
                        //position: 'relative'
                        //float: 'relative',
                        // margin: '1px'
                    });



                    for (i=0; i<countCopy; i++) {
                        self.$elem.clone().addClass('mosh__item').appendTo(self.$placeElem);
                    }
                    self.$elem.css('display','none');
                    //self.$placeElemImg.css('position','absolute');
                }

                self.mosh = true;
            });
            this.$moshDelButton.click(function(){
                if(self.mosh){
                    $('.mosh__item').remove();
                    self.$elem.css('display','block');
                    //self.$placeElemImg.css('position','relative');
                }
                self.mosh = false;
            });
        };

    };

    m = new Mosh(); //создаем наш бегунок

    m.init({

        //area elem
        $placeElem: $('.picture__body'),
        //elem
        $elem: $('.picture__watermark'),
        $placeElemImg: $('.picture__apload'),
        // button mosh
        $moshButton : $('.mosh'),
        $moshDelButton : $('.mosh__del'),

    });

}();