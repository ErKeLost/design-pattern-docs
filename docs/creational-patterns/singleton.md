# 单例模式

## 1. 引言

**单例模式（Singleton Pattern）** 是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点。本文将详细讲解单例模式在 JavaScript 中的多种实现方式，并配以实际应用的示例，帮助您深入理解并灵活运用于项目中。

![alt text](https://refactoringguru.cn/images/patterns/content/singleton/singleton.png)

## 2. 说明

### 问题

单例模式同时解决了两个问题， 所以违反了单一职责原则：

保证一个类只有一个实例。 为什么会有人想要控制一个类所拥有的实例数量？ 最常见的原因是控制某些共享资源 （例如数据库或文件） 的访问权限。

它的运作方式是这样的： 如果你创建了一个对象， 同时过一会儿后你决定再创建一个新对象， 此时你会获得之前已创建的对象， 而不是一个新对象。

注意， 普通构造函数无法实现上述行为， 因为构造函数的设计决定了它必须总是返回一个新对象。

![](https://refactoringguru.cn/images/patterns/content/singleton/singleton-comic-1-zh.png)

一个对象的全局访问节点
客户端甚至可能没有意识到它们一直都在使用同一个对象。
为该实例提供一个全局访问节点。 还记得你 （好吧， 其实是我自己） 用过的那些存储重要对象的全局变量吗？ 它们在使用上十分方便， 但同时也非常不安全， 因为任何代码都有可能覆盖掉那些变量的内容， 从而引发程序崩溃。

和全局变量一样， 单例模式也允许在程序的任何地方访问特定对象。 但是它可以保护该实例不被其他代码覆盖。

还有一点： 你不会希望解决同一个问题的代码分散在程序各处的。 因此更好的方式是将其放在同一个类中， 特别是当其他代码已经依赖这个类时更应该如此。

如今， 单例模式已经变得非常流行， 以至于人们会将只解决上文描述中任意一个问题的东西称为单例。

### 解决方案

所有单例的实现都包含以下两个相同的步骤：

- 将默认构造函数设为私有， 防止其他对象使用单例类的 new 运算符。
- 新建一个静态构建方法作为构造函数。 该函数会 “偷偷” 调用私有构造函数来创建对象， 并将其保存在一个静态成员变量中。 此后所有对于该函数的调用都将返回这一缓存对象。

  如果你的代码能够访问单例类， 那它就能调用单例类的静态方法。 无论何时调用该方法， 它总是会返回相同的对象。

### 真实世界类比

政府是单例模式的一个很好的示例。 一个国家只有一个官方政府。 不管组成政府的每个人的身份是什么， ​ “某政府” 这一称谓总是鉴别那些掌权者的全局访问节点。

### 2.1 定义

单例模式的核心是**确保一个类只有一个实例**，并提供一个访问该实例的全局入口点。这对于需要在整个系统中共享状态或配置信息的场景十分有用。

### 2.2 特点

- **唯一性**：整个应用程序中只能存在一个实例。
- **全局访问**：提供一个全局访问点，所有模块都能方便地访问该实例。
- **可扩展性**：可以根据需要延迟实例化，并在实例内部扩展功能。

### 2.3 实现方式

#### 2.3.1 使用闭包和立即执行函数（IIFE）

```js
const Singleton = (function () {
  // 私有变量，存储单例实例
  let instance;

  // 私有方法，用于创建实例
  function init() {
    // 定义单例的属性和方法
    return {
      // 示例属性
      _state: {},

      // 获取状态
      getState: function () {
        return this._state;
      },

      // 设置状态
      setState: function (key, value) {
        this._state[key] = value;
      },
    };
  }

  // 公有方法，获取单例实例
  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

// 测试代码
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

instance1.setState("name", "Singleton Instance");

console.log(instance2.getState()); // 输出: { name: 'Singleton Instance' }
console.log(instance1 === instance2); // 输出: true
```

#### 2.3.2 使用类的静态属性

```js
class Singleton {
  constructor() {
    if (Singleton.instance) {
      // 如果实例已经存在，直接返回
      return Singleton.instance;
    }
    // 初始化实例
    this._state = {};
    Singleton.instance = this; // 存储实例
  }

  // 获取状态
  getState() {
    return this._state;
  }

  // 设置状态
  setState(key, value) {
    this._state[key] = value;
  }
}

// 测试代码
const instance1 = new Singleton();
const instance2 = new Singleton();

instance1.setState("language", "JavaScript");

console.log(instance2.getState()); // 输出: { language: 'JavaScript' }
console.log(instance1 === instance2); // 输出: true
```

#### 扩展知识点 类的静态属性

在 JavaScript 中，类实际上是语法糖，本质上是基于原型的构造函数。类本身就是一个特殊的函数，因此可以像使用对象一样，动态地向类添加属性和方法。

当您在类中使用 ConfigManager.instance 时，实际上是在向类本身（构造函数）添加一个静态属性 instance。

```js
class ConfigManager {
  constructor() {
    // 检查类的静态属性 instance 是否已存在
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }

    // 初始化配置
    this._config = {
      apiBaseUrl: "https://api.example.com",
      timeout: 5000,
      retryAttempts: 3,
    };

    // 将当前实例赋值给类的静态属性 instance
    ConfigManager.instance = this;
  }

  // 获取配置
  getConfig(key) {
    return this._config[key];
  }

  // 设置配置
  setConfig(key, value) {
    this._config[key] = value;
  }

  // 获取所有配置
  getAllConfigs() {
    return this._config;
  }
}
```

在上述代码中，虽然没有显式声明 ConfigManager.instance，但在 JavaScript 中，可以直接在类（构造函数）上添加或访问属性。也就是说，ConfigManager 作为一个函数对象，可以动态添加属性 instance。

### 2.3 适用场景

- **配置管理器**：需要在全局范围内共享和管理配置信息。
- **日志记录器**：全局统一的日志记录机制，方便调试和监控。
- **缓存系统**：在内存中缓存数据，提高性能。
- **发布订阅**：通过单例模式实现发布订阅。
- **数据库连接池**：管理数据库连接，避免重复创建连接。

## 3. 单例模式的实际应用

### 3.1 配置管理器

```js
class ConfigManager {
  constructor() {
    if (ConfigManager.instance) {
      return ConfigManager.instance;
    }
    this._config = {
      apiBaseUrl: "https://api.example.com",
      timeout: 5000,
      retryAttempts: 3,
    };
    ConfigManager.instance = this;
  }

  // 获取配置
  getConfig(key) {
    return this._config[key];
  }

  // 设置配置
  setConfig(key, value) {
    this._config[key] = value;
  }

  // 获取所有配置
  getAllConfigs() {
    return this._config;
  }
}

// 测试代码
const configManager1 = new ConfigManager();
const configManager2 = new ConfigManager();

console.log(configManager1 === configManager2); // 输出: true

// 修改配置
configManager1.setConfig("timeout", 10000);

// 获取配置
console.log(configManager2.getConfig("timeout")); // 输出: 10000
```

### 3.2 发布订阅

发布订阅模式和单例模式是两个独立的设计模式，它们各自解决不同的问题

- 发布订阅模式：用于处理对象之间的一对多关系，实现松耦合的事件通信机制
- 单例模式：确保一个类只有一个实例，并提供一个全局访问点

但在实际应用中，发布订阅系统可以使用单例模式来实现

- 全局唯一性：确保所有发布者和订阅者使用同一个事件总线
- 状态管理：统一管理订阅关系和事件分发
- 资源效率：避免创建多个事件处理实例

```js
class PubSub {
  // 私有实例
  static #instance = null;
  // 存储所有事件
  #events = {};

  // 私有构造函数
  constructor() {
    if (PubSub.#instance) {
      return PubSub.#instance;
    }
    PubSub.#instance = this;
  }

  // 获取单例实例
  static getInstance() {
    if (!PubSub.#instance) {
      PubSub.#instance = new PubSub();
    }
    return PubSub.#instance;
  }

  // 订阅事件
  subscribe(eventName, callback) {
    if (!this.#events[eventName]) {
      this.#events[eventName] = [];
    }
    this.#events[eventName].push(callback);
  }

  // 发布事件
  publish(eventName, data) {
    if (!this.#events[eventName]) {
      return;
    }
    this.#events[eventName].forEach((callback) => callback(data));
  }

  // 取消订阅
  unsubscribe(eventName, callback) {
    if (!this.#events[eventName]) {
      return;
    }
    this.#events[eventName] = this.#events[eventName].filter(
      (cb) => cb !== callback
    );
  }
}

// 测试代码

// 获取PubSub实例
const pubsub1 = PubSub.getInstance();
const pubsub2 = PubSub.getInstance();

// pubsub1 和 pubsub2 是同一个实例
console.log(pubsub1 === pubsub2); // true

// 订阅消息
pubsub1.subscribe("userLogin", (data) => {
  console.log("用户登录:", data);
});

// 发布消息
pubsub2.publish("userLogin", { userId: 123, username: "adny" });
```

### 3.3 创建数据库连接

```js
const { MongoClient } = require("mongodb");

class Database {
  // 静态属性，用于存储唯一实例
  static instance = null;

  constructor() {
    if (Database.instance) {
      // 如果实例已存在，直接返回
      return Database.instance;
    }

    // 初始化数据库配置
    this._config = {
      url: "mongodb://localhost:27017",
      dbName: "myDatabase",
    };

    this._client = null; // MongoClient 实例
    this._db = null; // 数据库实例

    Database.instance = this; // 缓存当前实例
  }

  // 连接到数据库
  async connect() {
    if (!this._client) {
      try {
        this._client = await MongoClient.connect(this._config.url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("数据库连接成功");

        this._db = this._client.db(this._config.dbName);
      } catch (error) {
        console.error("数据库连接失败", error);
        throw error;
      }
    }
    return this._db;
  }

  // 获取数据库实例
  getDB() {
    if (!this._db) {
      throw new Error("尚未连接到数据库，请先调用 connect() 方法");
    }
    return this._db;
  }

  // 关闭数据库连接
  async close() {
    if (this._client) {
      await this._client.close();
      this._client = null;
      this._db = null;
      console.log("数据库连接已关闭");
    }
  }
}

// 测试代码

// 创建两个实例
const dbInstance1 = new Database();
const dbInstance2 = new Database();

console.log("两个实例是否相同:", dbInstance1 === dbInstance2); // 输出: true

// 连接到数据库
await dbInstance1.connect();

// 获取数据库实例
const db1 = dbInstance1.getDB();
const db2 = dbInstance2.getDB();

console.log("两个数据库实例是否相同:", db1 === db2); // 输出: true

// 进行数据库操作，例如插入数据
const collection = db1.collection("users");

const result = await collection.insertOne({ name: "张三", age: 28 });
console.log("插入结果:", result.insertedId);

// 关闭数据库连接
await dbInstance1.close();
```
