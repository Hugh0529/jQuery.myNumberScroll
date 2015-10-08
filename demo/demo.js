$(document).ready(function() {
    var setting = {
        //animationSpeed: 'slow'
    };

    var $number = $("#number-wrapper");
    var i = 1;
    var diff = 29;
    (function test() {
        var currentNumber = i + diff;
        //when you init it, you should set originNumber equal currentNumber
        var originNumber = i==1? currentNumber : i;
        $number.myNumberScroll(originNumber, currentNumber, setting);
        i = i + diff;
        if(i < 1000) {
            setTimeout(test, 1000);
        }
    })();

});
