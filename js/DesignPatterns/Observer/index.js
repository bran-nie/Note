class Subject {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  notify(...args) {
    this.observers.forEach((observer) => observer.update(...args));
  }
}

class Observer {
  update(...args) {
    console.log(...args);
  }
}

// 创建观察者
let ob1 = new Observer();
let ob2 = new Observer();

// 创建目标对象, 存储观察者对象
let sub = new Subject();

// 将目标和观察者建立了依赖关系
sub.add(ob1);
sub.add(ob2);

// 当状态变更时, 主动通知观察者, 发送信息
sub.notify('给观察者们发送信息');
