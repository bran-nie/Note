class MyPromise {
    State = {
        PENDING: 'pending',
        RESOLVED: 'resolved',
        REJECTED: 'rejected',
    };
    constructor(fn) {
        // resolve 和 reject 的任务队列
        this.resolvedCallbacks = [];
        this.rejectedCallbacks = [];

        // 初始化promise的状态，为pending
        this.state = this.State.PENDING;

        // 将resolve、reject绑定到
        fn(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        if (this.state === this.State.PENDING) {
            this.state = this.State.RESOLVED;
            this.value = value;

            this.resolvedCallbacks.map((cb) => cb(value));
        }
    }
    reject(value) {
        if (this.state === this.State.PENDING) {
            this.state = this.State.REJECTED;
            this.value = value;

            this.rejectedCallbacks.map((cb) => cb(value));
        }
    }

    then(onFulfilled, onRejected) {
        // 当promise状态是pending时，将then的两个参数分别添加到任务队列中
        if (this.state === this.State.PENDING) {
            typeof onFulfilled === 'function' &&
                this.resolvedCallbacks.push(onFulfilled);
            typeof onRejected === 'function' &&
                this.rejectedCallbacks.push(onRejected);
        }
        // promise的状态已经是 成功，就直接执行成功的函数
        if (this.state === this.State.RESOLVED) {
            typeof onFulfilled === 'function' && onFulfilled(this.value);
        }
        // promise的状态已经是 成功，就直接执行 失败 的函数
        if (this.state === this.State.REJECTED) {
            typeof onRejected === 'function' && onRejected(this.value);
        }
    }
}
