# 工厂方法模式

## 1. 引言

**工厂方法**模式是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

![alt text](https://refactoringguru.cn/images/patterns/content/factory-method/factory-method-zh.png)

## 2. 说明

### 问题

假设你正在开发一款物流管理应用。 最初版本只能处理卡车运输， 因此大部分代码都在位于名为 卡车的类中。

一段时间后， 这款应用变得极受欢迎。 你每天都能收到十几次来自海运公司的请求， 希望应用能够支持海上物流功能。

![alt text](https://refactoringguru.cn/images/patterns/diagrams/factory-method/problem1-zh.png)

在程序中新增一个运输类会遇到问题
如果代码其余部分与现有类已经存在耦合关系， 那么向程序中添加新类其实并没有那么容易。
这可是个好消息。 但是代码问题该如何处理呢？ 目前， 大部分代码都与 卡车类相关。 在程序中添加 轮船类需要修改全部代码。 更糟糕的是， 如果你以后需要在程序中支持另外一种运输方式， 很可能需要再次对这些代码进行大幅修改。

最后， 你将不得不编写繁复的代码， 根据不同的运输对象类， 在应用中进行不同的处理。

### 解决方案

工厂方法模式建议使用特殊的工厂方法代替对于对象构造函数的直接调用 （即使用 new 运算符）。 不用担心， 对象仍将通过 new 运算符创建， 只是该运算符改在工厂方法中调用罢了。 工厂方法返回的对象通常被称作 “产品”。

![alt text](https://refactoringguru.cn/images/patterns/diagrams/factory-method/solution1.png)

创建者类结构
子类可以修改工厂方法返回的对象类型。
乍看之下， 这种更改可能毫无意义： 我们只是改变了程序中调用构造函数的位置而已。 但是， 仔细想一下， 现在你可以在子类中重写工厂方法， 从而改变其创建产品的类型。

但有一点需要注意:仅当这些产品具有共同的基类或者接口时， 子类才能返回不同类型的产品， 同时基类中的工厂方法还应将其返回类型声明为这一共有接口。

![alt text](https://refactoringguru.cn/images/patterns/diagrams/factory-method/solution2-zh.png)

产品对象层次结构
所有产品都必须使用同一接口。
举例来说， ​ 卡车 Truck 和 轮船 Ship 类都必须实现 运输 Transport 接口， 该接口声明了一个名为 deliver 交付的方法。 每个类都将以不同的方式实现该方法： 卡车走陆路交付货物， 轮船走海路交付货物。 ​ 陆路运输 Road­Logistics 类中的工厂方法返回卡车对象， 而 海路运输 Sea­Logistics 类则返回轮船对象。

使用工厂方法模式后的代码结构

![alt text](https://refactoringguru.cn/images/patterns/diagrams/factory-method/solution3-zh.png)

只要产品类实现一个共同的接口， 你就可以将其对象传递给客户代码， 而无需提供额外数据。
调用工厂方法的代码 （通常被称为客户端代码） 无需了解不同子类返回实际对象之间的差别。 客户端将所有产品视为抽象的 运输 。 客户端知道所有运输对象都提供 交付方法， 但是并不关心其具体实现方式。

### 问题 2

假如你正在开发一个游戏，其中需要创建各种类型的敌人，例如：兽人，精灵，巫师等。每个敌人都有自己的属性和行为，例如：兽人具有高攻击力，精灵具有高敏捷度，巫师具有高魔法值。如果直接在游戏中使用 new 创建敌人对象，代码就会变得混乱且难以维护。

```js
// 不使用工厂方法模式
const orc = new Orc();
const elf = new Elf();
const troll = new Troll();
```

如果需要添加新的敌人类型，就需要修改游戏中的代码，这样就违反了开闭原则

:::tip 扩展: 开闭原则
开闭原则 (Open/Closed Principle, OCP) 是面向对象设计中的一个重要原则，其核心思想是：

软件实体（类、模块、函数等）应该对扩展开放，对修改关闭。

这意味着，一个软件实体应该可以通过扩展来实现新的功能，而不是通过修改其现有的代码来实现。

更详细的解释：

对扩展开放: 指当需要添加新功能时，可以通过添加新的代码（例如新的类或方法）来实现，而不需要修改现有的代码。 这体现了设计的可扩展性，能够适应未来的需求变化。

对修改关闭: 指一旦一个软件实体完成开发并测试通过，就不应该对其进行修改，除非是为了修复 bug。 这保证了软件的稳定性，减少了引入新错误的风险。
:::

### 解决方案 2

工厂方法模式引入了一个抽象的工厂类, 定义了创建敌人对象的接口，具体的敌人创建逻辑由子类来实现

### 2.1 真实世界类比

汽车工厂就是一个很好的例子。汽车工厂可以生产各种类型的汽车，例如：轿车、SUV、卡车等。每种类型的汽车都有其特定的生产流程。汽车工厂相当于抽象工厂类，而生产不同类型汽车的车间相当于具体工厂类。

### 2.2 定义

工厂方法模式定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法让类把实例化推迟到子类。

### 2.2 特点

- 遵循开闭原则: 扩展新产品时无需修改现有代码。
- 封装创建逻辑: 将对象的创建逻辑与使用逻辑分离。
- 支持多态: 可以使用不同的工厂创建不同类型的对象。

### 2.3 实现方式

#### 2.3.1 使用闭包和立即执行函数（IIFE）

```js
// 抽象工厂类
class EnemyFactory {
  createEnemy() {
    throw new Error("子类必须实现 createEnemy 方法");
  }
}

// 具体工厂类
class OrcFactory extends EnemyFactory {
  createEnemy() {
    return new Orc();
  }
}

class ElfFactory extends EnemyFactory {
  createEnemy() {
    return new Elf();
  }
}

class TrollFactory extends EnemyFactory {
  createEnemy() {
    return new Troll();
  }
}

// 游戏中使用工厂创建敌人
const orcFactory = new OrcFactory();
const orc = orcFactory.createEnemy();

const elfFactory = new ElfFactory();
const elf = elfFactory.createEnemy();

const trollFactory = new TrollFactory();
const troll = trollFactory.createEnemy();
```

这个时候可能就会有问题了, 感觉这段代码跟上面的

```js
// 不使用工厂方法模式
const orc = new Orc();
const elf = new Elf();
const troll = new Troll();
```

也没什么区别呢, 看似工厂模式只是显得更加的多余，其实关键区别在于代码的可扩展性和可维护性, 尤其体现在新增类型和修改创建逻辑的时候

直接实例化 (new Orc()) 的问题：

- 紧耦合：游戏代码直接依赖于具体的 Orc， Elf， Troll 类，如果将来要添加一个新的敌人类型，就必须要修改游戏代码， 添加 `new Dragon()`， 这违反了开闭原则。
- 创建逻辑分散：如果创建 Orc 的逻辑比较复杂 (例如需要初始化属性，设置技能，根据游戏等级，地图属性等)，那么这些逻辑就会分散在游戏代码中，不利于维护和修改。
- 难以切换实现：如果想想吧 Orc 的实现换乘另外一种实现，例如：`new Orc2()`，那么就需要修改游戏代码，将 `new Orc()` 改为 `new Orc2()`，这样就会导致代码的耦合度增加 并且容易出错。

工厂方法模式的优势:

- 低耦合： 游戏代码只依赖于抽象的 `EnemyFactory` 接口，不依赖于具体的 OrcFactory， ElfFactory， TrollFactory，新增敌人类型，只需要添加一个新的工厂类(例如：`DragonFactory`)，不需要修改游戏代码。符合开闭原则

- 集中创建逻辑: 每个工厂类负责各自类型的对象的创建逻辑，例如：`OrcFactory` 负责创建 `Orc` 对象，`ElfFactory` 负责创建 `Elf` 对象，`TrollFactory` 负责创建 `Troll` 对象，这样创建逻辑就集中在工厂类中，不会分散在游戏代码中。

- 易于切换和实现：如果想要切换 Orc 的实现，只需要修改 `OrcFactory` 中的创建逻辑，例如：`return new Orc2()`，不需要修改游戏代码。如果想要添加新的敌人类型，只需要添加一个新的工厂类，不需要修改游戏代码。

#### 具体举例说明

假设创建 Orc 类需要根据游戏难度进行不同的初始化

直接实例化:

```js
let orc;
if (difficulty === "easy") {
  orc = new Orc(100, 10); // 100 生命值，10 攻击力
} else {
  orc = new Orc(200, 20); // 200 生命值，20 攻击力
}
```

如果多个地方需要创建 Orc 对象，那么这段代码就会重复出现，不利于维护和修改。

工厂方法模式

```js
class OrcFactory extends EnemyFactory {
  createEnemy() {
    if (difficulty === "easy") {
      return new Orc(100, 10);
    } else {
      return new Orc(200, 20);
    }
  }
}

// 使用工厂创建 Orc
const orcFactory = new OrcFactory();
const orc = orcFactory.createEnemy();
```

创建逻辑被封装在 OrcFactory 中，游戏代码只需要调用 orcFactory.createEnemy() 即可。

#### 总结

在简单的例子中，工厂方法模式的优势可能不明显。但随着项目规模的扩大和复杂度的增加，它的优势就会逐渐体现出来。它使得代码更具可扩展性、可维护性和灵活性，更符合面向对象设计的原则。

工厂方法模式的核心目的之一就是封装对象的创建逻辑，防止创建逻辑分散在代码的各个角落，从而提高代码的可维护性和可扩展性。

让我们再来一个复杂的场景

- 1.抽象工厂接口

```js
class EnemyFactory {
  createEnemy(level) {
    // 添加 level 参数
    throw new Error("子类必须实现 createEnemy 方法");
  }
}
```

- 2.具体工厂类

```js
class OrcFactory extends EnemyFactory {
  createEnemy(level) {
    switch (level) {
      case 1:
        return new LowLevelOrc();
      case 2:
        return new MidLevelOrc();
      case 3:
        return new HighLevelOrc();
      default:
        throw new Error("Invalid Orc level");
    }
  }
}

// ElfFactory 和 TrollFactory 类似 (略) ...
```

- 3.具体敌人类

```js
class LowLevelOrc {
  constructor() {
    this.health = 100;
    this.attack = 10;
    this.skills = ["近战攻击"];
  }
}

class MidLevelOrc extends LowLevelOrc {
  // 继承低级兽人，扩展属性和技能
  constructor() {
    super();
    this.health = 150;
    this.attack = 15;
    this.skills.push("重击");
  }
}

class HighLevelOrc extends MidLevelOrc {
  // 继承中级兽人，扩展属性和技能
  constructor() {
    super();
    this.health = 200;
    this.attack = 20;
    this.skills.push("狂暴");
  }
}

// 其他等级的 Elf 和 Troll 类似 (略) ...
```

最后的使用方式

```js
const difficulty = 3; // 获取游戏难度
let factory;

if (enemyType === "orc") {
  factory = new OrcFactory();
} else if (enemyType === "elf") {
  // factory = new ElfFactory();
} // ...

const enemy = factory.createEnemy(difficulty); // 根据难度创建敌人
```

如果不使用工厂方法模式的话

```js
let enemy;
if (enemyType === "orc") {
  if (level === 1) {
    enemy = new LowLevelOrc();
  } else if (level === 2) {
    enemy = new MidLevelOrc();
  } else if (level === 3) {
    enemy = new HighLevelOrc();
  } // ...
} else if (enemyType === "elf") {
  if (level === 1) {
    enemy = new LowLevelElf();
  } // ...  (大量的 if/else 判断)
} // ...  (更多敌人类型的判断)

// 在其他需要创建敌人的地方，需要重复上面的逻辑
```

### 2.3 适用场景

- 当一个类不知道它所必须创建的对象的类的时候。
- 当一个类希望由它的子类来指定它所创建的对象的时候。
- 当类将创建对象的职责委托给多个帮助子类中的某一个，并且你希望将哪一个帮助子类是代理者这一信息局部化的时候。

## 3. 工厂的实际应用

### 3.1 文档处理

```js
// 抽象文档类
class Document {
  constructor(content) {
    this.content = content;
  }
}

// 具体文档类
class WordDocument extends Document {}
class PdfDocument extends Document {}

// 抽象文档工厂类
class DocumentFactory {
  createDocument(content) {
    throw new Error("子类必须实现 createDocument 方法");
  }
}

// 具体文档工厂类
class WordDocumentFactory extends DocumentFactory {
  createDocument(content) {
    return new WordDocument(content);
  }
}

class PdfDocumentFactory extends DocumentFactory {
  createDocument(content) {
    return new PdfDocument(content);
  }
}

// 使用工厂创建文档
const wordFactory = new WordDocumentFactory();
const wordDoc = wordFactory.createDocument("Word文档内容");

const pdfFactory = new PdfDocumentFactory();
const pdfDoc = pdfFactory.createDocument("PDF文档内容");
```
