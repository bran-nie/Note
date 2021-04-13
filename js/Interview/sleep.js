// LazyMan 链式调用
// LazyMan('Jack').eat('lunch').sleepFirst(2).sleep(20).eat('dinner').sleep(40).eat('breakfast');

// (等待 2s) I'm sleep 2s
// Hi, I'm Jack
// I'm eating lunch
// (等待 20s) I'm sleep 20s
// I'm eating dinner
// (等待 40s) I'm sleep 40s
// I'm eating breakfast

// ans:
// 从题目中可以得出，函数是一个链式调用，那就是说，函数的返回值还是一个对象，有着 eat 和 sleep 方法。
// 其中，sleep 方法是一个异步函数，在其没执行完之前，需要暂停链式调用，
// 不过考虑到 sleep 可以有多个，那么，可以使用队列这种先进先出的特性，来存放和执行链式调用的各个方法。

function LazyMan(name) {
    class _LazyMan {
        constructor(name) {
            this.name = name;
            this.taskQueue = [];
            this.hi();
            // 这里使用 setTimeout 来异步执行 next 函数，此时链式调用的各个方法已经在 taskQueue 队列中了。
            setTimeout(() => {
                console.log(this.taskQueue);
                this.next();
            }, 0);
        }
        hi() {
            const fn = () => {
                console.log(`Hi, I'm ${name}`, new Date());
                this.next();
            };
            this.taskQueue.push(fn);
            return this;
        }

        next() {
            let fn = this.taskQueue.shift();
            fn && fn();
        }

        eat(food) {
            let fn = () => {
                console.log(`I'm eating ${food}`, new Date());
                this.next();
            };
            this.taskQueue.push(fn); // 添加到 taskQueue 队列中
            // 返回 this，让函数可以继续链式调用。
            return this;
        }

        sleepFirst(time) {
            return this.lazy(time, true);
        }
        sleep(time) {
            return this.lazy(time);
        }

        lazy(time, isFirst = false) {
            const text = isFirst ? 'sleepFist' : 'sleep';
            const fn = () => {
                console.group(`I'm ${text} ...`, new Date());
                setTimeout(() => {
                    console.group(`I'm ${text} ${time}s`, new Date());
                    console.groupEnd();
                    this.next();
                }, time * 1000);
            };

            if (isFirst) {
                this.taskQueue.unshift(fn);
            } else {
                this.taskQueue.push(fn);
            }
            return this;
        }
    }

    return new _LazyMan(name);
}

LazyMan('Jack').eat('lunch').sleepFirst(2).sleep(4).eat('dinner').sleep(6).eat('breakfast');
