class PubSub {
    constructor() {
        this.subscribers = []
    }

    subscribe(type, fn) {
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [fn]
        } else {
            this.subscribers[type].push(fn)
        }
    }

    publish(type, ...args) {
        let fns = this.subscribers[type] || []
        fns.forEach(fn => fn(...args))
    }
}

// 创建事件调度中心, 为订阅者和发布者提供调度服务
let pubSub = new PubSub()

// A订阅了SMS事件, (和观察者不同的是, 发布订阅模式中, 订阅者只关注事件本身, 也就是A只关于SMS本身, 而不关心是谁发布了这个事件
pubSub.subscribe('sms', console.log)

// B订阅了SMS事件,
pubSub.subscribe('sms', console.log)

// C 订阅了Email事件
pubSub.subscribe('email', console.log)


// 调度中心发布事件,   发布 SMS Email, phone 事件
pubSub.publish('sms', 'I publish `sms` event')
pubSub.publish('email', 'I publish `email` event')
pubSub.publish('phone', 'I publish `phone` event')


/*
    举个生活中的范例:
    pubSub 这个调度中心, 类似微博,
    粉丝关注了(订阅)爱豆    爱豆发布了动态    粉丝收到了提醒
    在  粉丝 --- 微博 --- 爱豆 这三者中,就类似了发布订阅者模式中的   订阅者---调度中心---发布者
    和观察者模式不太同的地方是, 爱豆不需要知道都有哪些人关注了自己, 只需要发动态就完了,  粉丝和爱豆并没有直接消息关联.
 */




// 这是es5的写法
const Observe = (function () {
    // 防止消息队列暴露而被篡改，将消息容器设置为私有变量
    let __message = {}
    return {
        // 注册消息接口
        on: function (type, fn) {
            // 如果此消息不存在，创建一个该消息类型     数组
            if (typeof __message[type] === 'undefined') {
                __message[type] = [fn]
            } else {
                // 将执行方法推入该消息对应的执行队列中
                __message[type].push(fn)
            }
        },

        // 订阅消息接口
        subscribe: function (type, args) {
            // 如果该消息没有注册，直接返回
            if (!__message[type]) return

            // 定义消息信息
            let events = {
                    type: type,                     // 消息类型
                    args: args || {}                // 参数
                },
                i = 0,                          // 循环变量
                len = __message[type].length    // 执行队列长度

            // 遍历执行函数
            for (; i < len; i++) {
                // 依次执行注册消息对应的方法
                __message[type][i].call(this, events)
            }
        },

        // 移除消息接口
        off: function (type, fn) {
            // 如果消息执行队列存在
            if (__message[[type] instanceof Array]) {
                // 从最后一条依次遍历
                let i = __message[type].length - 1
                for (; i >= 0; i--) {
                    // 如果存在该执行函数, 则移除相应的动作
                    __message[type][i] === fn && __message[type].slice(i, 1)
                }
            }
        }
    }
})()

// 订阅消息
Observe.on('say', function (data) {
    console.log(data.args.text)
})
Observe.on('say', function (data) {
    console.log('second: the type is ', data.type)
})
Observe.on('success', function () {
    console.log('success')
})

// 发布消息
Observe.subscribe('say', {text: 'hello world'})
Observe.subscribe('say', {})
Observe.subscribe('success')
