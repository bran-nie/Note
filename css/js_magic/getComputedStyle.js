class StyleListen {
    constructor(el) {
        this.el = el
        this.styleList = {}
        this.computedStyle = window.getComputedStyle(el, null)
    }

    addStyleListen(style, cb) {
        if (!this.computedStyle.hasOwnProperty(style)) {    // 如果输入样式不合法则return
            console.error('style error')
            return
        }
        if (this.styleList[style]) {            // 如果已有该样式, 则重新监听
            this.removeStyleListen(style)
        }
        this.styleList[style] = {               // 初始化 样式对象
            value: null,
            interval: null
        }
        this.styleList[style].value = this.computedStyle[style]
        this.styleList[style].interval = setInterval(() => {
            if (this.styleList[style].value !== this.computedStyle[style]) {
                console.log(`${style} has changed~`)

                // typeof cb === 'function' && cb.bind(this)()      // this 指向 实例
                typeof cb === 'function' && cb()                    // this 指向 全局 or undefined
                this.styleList[style].value = this.computedStyle[style]
            }
        }, 100)
        console.log('start listen ', style)
    }

    removeStyleListen(style) {
        if (this.styleList.hasOwnProperty(style)) {
            try {
                clearInterval(this.styleList[style].interval)
                delete this.styleList[style]
                console.log('clear style listen')
            } catch (e) {
                console.log('remove err: ', e)
            }
        } else {
            console.log('Didn\'t find this style, maybe no listening. Please use the method showStyleListen view listening style')
        }
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
styleListen.showStyleListen()

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
