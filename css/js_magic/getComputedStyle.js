class StyleListen {
    constructor(el) {
        this.el = el
        this.styleList = {}
        this.computedStyle = window.getComputedStyle(el, null)
    }

    addStyleListen(style) {
        if (this.styleList[style]) {
            this.removeStyleListen(style)
        }
        this.styleList[style] = {
            value: null,
            interval: null
        }
        this.styleList[style].value = this.computedStyle[style]
        this.styleList[style].interval = setInterval(() => {
            if (this.styleList[style].value !== this.computedStyle[style]) {
                console.log(`${style} has changed~`)
                this.styleList[style].value = this.computedStyle[style]
            }
        }, 100)
        console.log('start listen ', style)
    }

    removeStyleListen(style) {
        clearInterval(this.styleList[style].interval)
        delete this.styleList[style]
        console.log('clear style listen')
    }

    showStyleListen() {
        console.log(`Current element is: %c${this.el.nodeName}%c, this is listen style:`, 'color: orange', '')
        for (let k in this.styleList) {
            console.log(`%c${k}`, 'color: #03a9f4')
        }
    }

}
const el = document.createElement('div')
el.innerHTML = 'test'
document.body.append(el)

let styleListen = new StyleListen(el)

styleListen.addStyleListen('font-size')

/*
    目标: 监听样式变化, 如有回调则执行.
    需求:
        实例化构造函数时,传入element, 可以有以下方法
        监听给定样式,
        可以解除监听,
        展示目前监听的样式列表
    1. addStyleListen
    2. removeStyleListen
    3. showStyleListen
 */
