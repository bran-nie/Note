## 关于`forEach`方法中执行异步请求，使用 async/await，没有生效的探讨(待续。。)

> 1. 以下三个函数中，`foo`函数为测试函数，模拟一个异步请求，返回时间随机[0-4.5s]，三个函数区别主要在`bar`函数。

### 先看使用 forEach 的方式

```javascript
async function test1() {
    function foo(v) {
        const time = Math.floor(Math.random() * 10);
        console.log(v, 'cur timeout: ', time);
        return new Promise((r) => {
            setTimeout(() => {
                r(v * 2);
            }, time * 500);
        });
    }

    async function bar() {
        const arr = [1, 2, 3];
        console.log('start');
        arr.forEach(async (v) => {
            const res = await foo(v);
            console.log('get await res', res);
        });
        console.log('end');
    }
    await bar();
    console.log('bar run before');
}
test1();

// ⬇️⬇️⬇️ log ⬇️⬇️⬇️
// VM2436:15 start
// VM2436:4 1 "cur timeout: " 5
// VM2436:4 2 "cur timeout: " 5
// VM2436:4 3 "cur timeout: " 4
// VM2436:20 end
// VM2436:23 bar run before

// Promise {<fulfilled>: undefined}
// VM2436:18 get await res 6
// VM2436:18 get await res 2
// VM2436:18 get await res 4
// ⬆️⬆️⬆️ log ⬆️⬆️⬆️
```

原本设想的结果
console.log 依次打印 `'start'`, `'get await res *'`, `'end'`, `'bar run before'`

实际执行的结果
console.log 依次打印 `'start'`, `'end'`, `'bar run before'`, `'get await res *'`

```javascript
async function test2() {
    function foo(v) {
        const time = Math.floor(Math.random() * 10);
        console.log(v, 'cur timeout: ', time);
        return new Promise((r) => {
            setTimeout(() => {
                console.log('foo run done', v * 2);
                r(v * 2);
            }, time * 500);
        });
    }

    async function bar() {
        const arr = [1, 2, 3];
        console.log('start');
        const arrPromise = arr.map((v) => foo(v));
        await Promise.all(arrPromise);
        console.log('end');
    }
    await bar();
    console.log('bar run before');
}
test2();

// ⬇️⬇️⬇️ log ⬇️⬇️⬇️
// VM47:15 start
// VM47:4 1 "cur timeout: " 5
// VM47:4 2 "cur timeout: " 5
// VM47:4 3 "cur timeout: " 0

// Promise {<pending>}
// VM47:7 foo run done 6
// VM47:7 foo run done 2
// VM47:7 foo run done 4
// VM47:18 end
// VM47:21 bar run before
// ⬆️⬆️⬆️ log ⬆️⬆️⬆️
```

```javascript
async function test3() {
    function foo(v) {
        const time = Math.floor(Math.random() * 10);
        console.log(v, 'cur timeout: ', time);
        return new Promise((r) => {
            setTimeout(() => {
                console.log('foo run done', v * 2);
                r(v * 2);
            }, time * 500);
        });
    }

    async function bar() {
        const arr = [1, 2, 3];
        console.log('start');
        for (let v of arr) {
            const res = await foo(v);
            console.log('get await res', res);
        }
        console.log('end');
    }
    await bar();
    console.log('bar run before');
}
test3();

// ⬇️⬇️⬇️ log ⬇️⬇️⬇️
// VM93:15 start
// VM93:4 1 "cur timeout: " 0

// Promise {<pending>}
// VM93:7 foo run done 2
// VM93:18 get await res 2
// VM93:4 2 "cur timeout: " 1
// VM93:7 foo run done 4
// VM93:18 get await res 4
// VM93:4 3 "cur timeout: " 7
// VM93:7 foo run done 6
// VM93:18 get await res 6
// VM93:20 end
// VM93:23 bar run before
// ⬆️⬆️⬆️ log ⬆️⬆️⬆️
```
