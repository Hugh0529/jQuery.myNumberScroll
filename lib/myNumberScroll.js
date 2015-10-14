;
(function ($) {
    'use strict';
    $.myNumberScroll = function (container, options, originNumber, currentNumber) {
        var plugin = this,
            $container = $(container),

            /**
             css example
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
             */

            defaults = {
                animate: true,
                animationSpeed: 'normal',
                spanHeight: 51,
                numberWidth: 109,
                numberStyle: 'number',
                numberSelectStyle: 'number-select',
                numberCurrentStyle: 'current'
            },

            animationSpeeds = {
                fast: 200,
                normal: 400,
                slow: 600
            },

            settings,
            originNumberArray = originNumber.toString().split(''),
            currentNumberArray = currentNumber.toString().split(''),

            arrayParseInt = function (item, index, array) {
                array[index] = parseInt(item, 10);
            };

        function setOriginAndCurrentArrayToNumber() {
            originNumberArray.forEach(arrayParseInt);
            currentNumberArray.forEach(arrayParseInt);
        }

        function checkIfHasInitialized() {
            if (!$container.data('myNumberScroll').hasInitialized) {
                $container.data('myNumberScroll').hasInitialized = Boolean($container.children().length);
            }
        }

        function createSpanElement(number, setStyle) {
            var spanElementLists = '',
                element = '',
                i = 0;

            for (i; i < 11; i += 1) {
                //spanElementLists = linkSpan(i, number, spanElementLists);
                if (i === number) {
                    spanElementLists = spanElementLists + '<span class="' + settings.numberCurrentStyle + '">' + i % 10 + '</span>';
                } else {
                    spanElementLists = spanElementLists + '<span>' + i % 10 + '</span>';
                }
            }

            if (setStyle === true) {
                element =
                    '<div class="' + settings.numberStyle + '">' +
                    '<div class="' + settings.numberSelectStyle + '" style="margin-top: ' + -number * settings.spanHeight + 'px">' +
                    spanElementLists +
                    '</div></div>';
            } else {
                element =
                    '<div class="' + settings.numberStyle + '">' +
                    '<div class="' + settings.numberSelectStyle + '">' +
                    spanElementLists +
                    '</div></div>';
            }

            return element;
        }

        function setNumberSpan(addNumberSpan, number) {
            var numberLength = currentNumberArray.length,
                i = 0,
                element = '';

            if (addNumberSpan !== true && $container.data('myNumberScroll').hasInitialized !== true) {
                for (i; i < numberLength; i += 1) {
                    //element = linkElement(i);
                    element =  currentNumberArray[i] === ' ' ? element :
                    element + createSpanElement(currentNumberArray[i], true);
                }
                // set container width to align center
                $container.css('width', numberLength * settings.numberWidth + 'px');

                $container.html('').append(element);
                $container.data('myNumberScroll').hasInitialized = true;
            } else if (addNumberSpan === true) {
                element = createSpanElement(number, false);

                $container.css('width', numberLength * settings.numberWidth + 'px');
                $container.prepend(element)
                    .find('.' + settings.numberSelectStyle).first()
                    .animate({'margin-top': -number * settings.spanHeight + 'px'}, settings.animationSpeed);
            }
        }

        function setCurrentSpanStyle($numberSelect, currentNumberSelect) {
            $numberSelect
                .find('span').removeClass(settings.numberCurrentStyle)
                .eq(currentNumberSelect).addClass(settings.numberCurrentStyle);
        }

        function setMargin(diff, currentNumberSelect, $numberSelect) {
            if (diff > 0) {
                $numberSelect
                    .animate({'margin-top': -currentNumberSelect * settings.spanHeight + 'px'}, settings.animationSpeed);
                setCurrentSpanStyle($numberSelect, currentNumberSelect);
            } else if (diff < 0) {
                $numberSelect
                    .animate({'margin-top': -10 * settings.spanHeight + 'px'}, settings.animationHalfSpeed)
                    .animate({'margin-top': '0px'}, 0)
                    .animate({'margin-top': -currentNumberSelect * settings.spanHeight + 'px'}, settings.animationHalfSpeed);
                setCurrentSpanStyle($numberSelect, currentNumberSelect);
            }
        }

        function changeNumber() {
            if (currentNumber > originNumber) {
                var currentNumberArrayLength = currentNumberArray.length,
                    originNumberArrayLength = originNumberArray.length,
                    $numberSelects = $container.find('.' + settings.numberSelectStyle),
                    i = currentNumberArrayLength - 1,
                    diffLength = currentNumberArrayLength - originNumberArrayLength,
                    diff = 0;

                for (i; i >= 0; i -= 1) {
                    if (originNumberArray[i - diffLength] !== undefined) {
                        diff = currentNumberArray[i] - originNumberArray[i - diffLength];
                        setMargin(diff, currentNumberArray[i], $numberSelects.eq(i - diffLength));
                    } else if (originNumberArray[i - diffLength] === undefined) {
                        // declare that diffLength !== 0, then we should add a number element
                        if ($container.data('myNumberScroll').hasInitialized) {
                            setNumberSpan(true, currentNumberArray[i]);
                        }
                    }
                }
            }
        }

        plugin.init = function () {
            plugin.settings = settings = $.extend({}, defaults, options);

            if (typeof (settings.animationSpeed) === 'string') {
                settings.animationSpeed = animationSpeeds[settings.animationSpeed];
            }
            // default speed
            if (!settings.animationSpeed) {
                settings.animationSpeed = animationSpeeds[defaults.animationSpeed];
            }
            settings.animationHalfSpeed = settings.animationSpeed / 2;

            $container.data('myNumberScroll', {});

            $container.attr('data-myNumberScroll', true);

            setOriginAndCurrentArrayToNumber();

            checkIfHasInitialized();

            setNumberSpan();

            changeNumber();
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

}(jQuery));
