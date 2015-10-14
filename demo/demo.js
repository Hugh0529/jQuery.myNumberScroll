$(document).ready(function() {
    var setting = {
        //animationSpeed: 'slow'
    };

    var $number = $("#number-wrapper");
    var i = 1,
        diff = 29,
        originNumber = 1,
        currentNumber = 1;
    (function test() {
        //when you init it, you should set originNumber equal currentNumber
        $number.myNumberScroll(originNumber, currentNumber, setting);
        originNumber = i;
        currentNumber = originNumber + diff;
        i = i + diff;
        if(i < 1000) {
            setTimeout(test, 3000);
        }
    })();

});
