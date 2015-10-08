;(function ($) {
    $.myNumberScroll = function (container, options, originNumber, currentNumber) {
        var plugin = this,
            $container = $(container),

          /**
           * css example
           .number {
              display: inline-block;
              height: 50px;
              overflow: hidden;
              font-size: 45px;
           }

           .number-select {
              padding-left: 28px;
           }

           .number-select span {
              font-weight: 600;
              display: block;
              margin: 0 auto;
              height: 51px;
           }
           *
           * */

            defaults = {
                animate: true,
                animationSpeed: 'normal',
                spanHeight: 51,
                numberWidth: 109,
                numberStyle: 'number',
                numberSelectStyle: 'number-select',
                numberCurrentStyle: 'current'
            },

            transitions,
            animationSpeeds = {
                fast: 200,
                normal: 400,
                slow: 600
            },

            settings,
            originNumberArray = originNumber.toString().split(''),
            currentNumberArray = currentNumber.toString().split('');

        plugin.init = function() {
            plugin.settings = settings = $.extend({}, defaults, options);

            if ( typeof(settings.animationSpeed) === 'string' ) {
                settings.animationSpeed = animationSpeeds[settings.animationSpeed];
            }
            // default speed
            if (!settings.animationSpeed) {
                settings.animationSpeed = animationSpeeds[defaults.animationSpeed];
            }
            settings.animationHalfSpeed = settings.animationSpeed/2;

            $container.data('myNumberScroll', {});

            plugin.setTransitions();

            $container.attr('data-myNumberScroll', true);

            setOriginAndCurrentArrayToNumber();

            checkIfHasInitialized();

            setNumberSpan();

            changeNumber();
        };

        plugin.setTransitions = function () {
            transitions =  {
                show: settings.transitionIn,
                hide: settings.transitionOut,
                speed: settings.animationSpeed
            };
        };

        var setOriginAndCurrentArrayToNumber = function () {
            var i = 0,
                j = 0;
            for(i; i<originNumberArray.length; i++) {
                (function (i) {
                    originNumberArray[i] = parseInt(originNumberArray[i]);
                })(i);
            }
            for(j; j<currentNumberArray.length; j++) {
                (function (j) {
                    currentNumberArray[j] = parseInt(currentNumberArray[j]);
                })(j);
            }
        };

        var checkIfHasInitialized = function () {
            if(!$container.data('myNumberScroll').hasInitialized) {
                $container.data('myNumberScroll').hasInitialized = Boolean($container.children().length);
            }
        };

        var setNumberSpan = function (addNumberSpan, number) {
            var numberArray = currentNumberArray;
            var numberLength = numberArray.length;
            var i = 0,
                element = '';
            if(addNumberSpan !== true && $container.data('myNumberScroll').hasInitialized !== true) {
                for(i; i<numberLength; i++) {
                    (function (i) {
                        element = numberArray[i] === ' '?  element :
                            element + createSpanElement(numberArray[i], true);
                    })(i);
                }
                // set container width to align center
                $container.css('width', numberLength*settings.numberWidth + 'px');

                $container.html('').append(element);
                $container.data('myNumberScroll').hasInitialized = true;
            }else if (addNumberSpan === true) {
                element = createSpanElement(number, false);

                $container.css('width', numberLength*settings.numberWidth + 'px');
                $container.prepend(element)
                  .find('.' + settings.numberSelectStyle).first()
                  .animate({'margin-top': -number*settings.spanHeight + 'px'}, settings.animationSpeed);
            }
        };

        var createSpanElement = function (number, setStyle) {
            var spanElementLists = '',
                _i = 0;
            for(_i; _i<11; _i++) {
                (function (i) {
                    spanElementLists = spanElementLists + '<span>' + i%10 + '</span>';
                })(_i);
            }
            var _element = '';
            if(setStyle === true) {
                _element =
                  '<div class="'+ settings.numberStyle +'">' +
                    '<div class="' + settings.numberSelectStyle + '" style="margin-top: '+ -number*settings.spanHeight +'px">' +
                        spanElementLists +
                  '</div></div>';
            }else {
                _element =
                  '<div class="'+ settings.numberStyle +'">' +
                    '<div class="' + settings.numberSelectStyle + '">' +
                         spanElementLists +
                  '</div></div>';
            }

            return _element;
        };

        var changeNumber = function () {
            if(currentNumber > originNumber) {
                var currentNumberArrayLength = currentNumberArray.length,
                    originNumberArrayLength = originNumberArray.length,
                    $numberSelects = $container.find('.' + settings.numberSelectStyle);
                    i = currentNumberArrayLength - 1;
                var diffLength = currentNumberArrayLength - originNumberArrayLength;
                for(i; i>=0; i--) {
                    (function (i) {
                        changeMargin(originNumberArray[i - diffLength], currentNumberArray[i], $numberSelects.eq(i - diffLength));
                    })(i);
                }
            }
        };

        var changeMargin = function (originNumberSelect, currentNumberSelect, $numberSelect) {
            if(originNumberSelect !== undefined) {
                var diff = currentNumberSelect - originNumberSelect;
                setMargin(diff, originNumberSelect, currentNumberSelect, $numberSelect);
            }else if(originNumberSelect === undefined) {
                // declare that diffLength !== 0, then we should add a number element
                if($container.data('myNumberScroll').hasInitialized) {
                    setNumberSpan(true, currentNumberSelect);
                }
            }
        };

        var setMargin = function (diff, originNumberSelect, currentNumberSelect, $numberSelect) {
            if(diff > 0) {
                $numberSelect
                  .animate({'margin-top': -currentNumberSelect*settings.spanHeight + 'px'}, settings.animationSpeed)
                  .find('span').removeClass(settings.numberCurrentStyle)
                  .eq(currentNumberSelect).addClass(settings.numberCurrentStyle);
            }else if (diff < 0) {
                $numberSelect
                  .animate({'margin-top': -10*settings.spanHeight + 'px'}, settings.animationHalfSpeed)
                  .animate({'margin-top': '0px'}, 0)
                  .animate({'margin-top': -currentNumberSelect*settings.spanHeight + 'px'}, settings.animationHalfSpeed)
                  .find('span').removeClass(settings.numberCurrentStyle)
                  .eq(currentNumberSelect).addClass(settings.numberCurrentStyle);
            }
        };

        plugin.init();
    };

    $.fn.myNumberScroll = function (originNumber, currentNumber, options) {
        return this.each(function () {
            var $this = $(this),
                plugin = new $.myNumberScroll(this, options, originNumber, currentNumber);

            $this.data('myNumberScroll', plugin);
        });
    };
})(jQuery);
