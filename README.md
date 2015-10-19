#jQuery plugin: myNumberScroll

##Feature
1. 数字滚动效果。
2. 目前只有数字增大时候的滚动效果，如果不变或者减小页面不懂。
3. 后续增加减小时候的效果。

##Usage
`$number.myNumberScroll(originNumber, currentNumber, setting);`

##Option

```
animate: true,
animationSpeed: 'normal',
spanHeight: 51,
numberWidth: 109,
numberStyle: 'number',
numberSelectStyle: 'number-select',
numberCurrentStyle: 'current'
```
##Sample CSS
```
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
            
```
##Demo
[demo](http://embed.plnkr.co/Hhgl3KrAIIaICAwMiHb9/preview)

##TODO
1. 数字减少时候的处理
2. 优化
