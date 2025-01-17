# 抽象工厂模式

## 1. 引言

抽象工厂模式（Abstract Factory Pattern）是一种创建型设计模式，它提供了一个接口，用于创建一系列相关或相互依赖的对象，而无需指定它们的具体类。通过使用抽象工厂，客户端代码可以独立于具体的产品类进行操作，从而实现系统的可扩展性和灵活性。

![](https://refactoringguru.cn/images/patterns/content/abstract-factory/abstract-factory-zh-2x.png)

## 2. 说明

### 问题

假设你正在开发一款家具商店模拟器。 你的代码中包括一些类， 用于表示：

一系列相关产品， 例如 椅子 Chair 、 ​ 沙发 Sofa 和 咖啡桌 Coffee­Table 。

系列产品的不同变体。 例如， 你可以使用 现代 Modern 、 ​ 维多利亚 Victorian 、 ​ 装饰风艺术 Art­Deco 等风格生成 椅子 、 ​ 沙发和 咖啡桌 。

![](https://refactoringguru.cn/images/patterns/diagrams/abstract-factory/problem-zh-2x.png)

你需要设法单独生成每件家具对象， 这样才能确保其风格一致。 如果顾客收到的家具风格不一样， 他们可不会开心。

![](https://refactoringguru.cn/images/patterns/content/abstract-factory/abstract-factory-comic-1-zh-2x.png)

此外， 你也不希望在添加新产品或新风格时修改已有代码。 家具供应商对于产品目录的更新非常频繁， 你不会想在每次更新时都去修改核心代码的。

### 解决方案

首先， 抽象工厂模式建议为系列中的每件产品明确声明接口 （例如椅子、 沙发或咖啡桌）。 然后， 确保所有产品变体都继承这些接口。 例如， 所有风格的椅子都实现 椅子接口； 所有风格的咖啡桌都实现 咖啡桌接口， 以此类推。

![](https://refactoringguru.cn/images/patterns/diagrams/abstract-factory/solution1-2x.png)

接下来， 我们需要声明抽象工厂——包含系列中所有产品构造方法的接口。 例如 create­Chair 创建椅子 、 ​ create­Sofa 创建沙发和 create­Coffee­Table 创建咖啡桌 。 这些方法必须返回抽象产品类型， 即我们之前抽取的那些接口： ​ 椅子 ， ​ 沙发和 咖啡桌等等。

![](https://refactoringguru.cn/images/patterns/diagrams/abstract-factory/solution2-2x.png)

那么该如何处理产品变体呢？ 对于系列产品的每个变体， 我们都将基于 抽象工厂接口创建不同的工厂类。 每个工厂类都只能返回特定类别的产品， 例如， ​ 现代家具工厂 Modern­Furniture­Factory 只能创建 现代椅子 Modern­Chair 、 ​ 现代沙发 Modern­Sofa 和 现代咖啡桌 Modern­Coffee­Table 对象。

客户端代码可以通过相应的抽象接口调用工厂和产品类。 你无需修改实际客户端代码， 就能更改传递给客户端的工厂类， 也能更改客户端代码接收的产品变体。

![](https://refactoringguru.cn/images/patterns/content/abstract-factory/abstract-factory-comic-2-zh-2x.png)

假设客户端想要工厂创建一把椅子。 客户端无需了解工厂类， 也不用管工厂类创建出的椅子类型。 无论是现代风格， 还是维多利亚风格的椅子， 对于客户端来说没有分别， 它只需调用抽象 椅子接口就可以了。 这样一来， 客户端只需知道椅子以某种方式实现了 sit­On 坐下方法就足够了。 此外， 无论工厂返回的是何种椅子变体， 它都会和由同一工厂对象创建的沙发或咖啡桌风格一致。

最后一点说明： 如果客户端仅接触抽象接口， 那么谁来创建实际的工厂对象呢？ 一般情况下， 应用程序会在初始化阶段创建具体工厂对象。 而在此之前， 应用程序必须根据配置文件或环境设定选择工厂类别。

## 3. 抽象工厂模式与工厂方法的区别

抽象工厂模式（Abstract Factory）和工厂方法模式（Factory Method）都是创建型设计模式，用于封装对象的创建过程，以提高系统的灵活性和可扩展性。尽管它们都旨在解决对象创建的问题，但在结构和应用场景上存在显著差异。以下是两者的详细区别：

#### 1. 目的和意图

- 工厂方法模式（Factory Method）:

目的：定义一个用于创建对象的接口，让子类决定实例化哪个类。
意图：通过子类化来延迟实例化到子类，从而使得一个类的实例化延迟到其子类。

- 抽象工厂模式（Abstract Factory）：

目的：提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。
意图：封装一组具有相同主题或目的的对象的创建，使得系统独立于这些对象的创建、组合和表示。

#### 2. 结构

- 工厂方法模式：

通常涉及一个抽象产品和具体产品，以及一个抽象工厂和具体工厂。
关键组件：
产品接口（Product）：定义产品的接口。
具体产品（ConcreteProduct）：实现产品接口的具体类。
工厂接口（Creator）：声明工厂方法，返回产品接口。
具体工厂（ConcreteCreator）：实现工厂方法，返回具体产品实例。

- 抽象工厂模式：

包含多个产品族，每个产品族可以有多个不同类型的产品。
关键组件：
抽象工厂接口（AbstractFactory）：声明一组创建不同产品的方法。
具体工厂（ConcreteFactory）：实现抽象工厂接口，创建具体产品族中的各个产品。
抽象产品接口（AbstractProduct）：为每种产品族中的每种产品定义接口。
具体产品（ConcreteProduct）：实现抽象产品接口的具体类。

#### 3. 适用场景

工厂方法模式适用于：

当一个类不知道它所需要的对象的具体类时。
当一个类希望由子类来指定它所创建的对象时。
当类将创建的对象委托给多个帮助子类中的某一个。
抽象工厂模式适用于：

当系统需要独立于其产品的创建、组合和表示时。
当系统需要由多个产品系列中的一个来配置时。
当产品之间存在依赖关系，需要一起被创建和使用时。

#### 4. 示例

1. 工厂方法模式示例

以家具商店模拟器为例

```js
// 抽象产品：椅子
class Chair {
  constructor() {
    if (this.constructor === Chair) {
      throw new Error('抽象类不能被实例化');
    }
  }

  sitOn() {
    throw new Error('抽象方法必须被实现');
  }
}

// 具体产品：现代椅子
class ModernChair extends Chair {
  sitOn() {
    console.log('坐在现代椅子上');
  }
}

// 具体产品：维多利亚椅子
class VictorianChair extends Chair {
  sitOn() {
    console.log('坐在维多利亚椅子上');
  }
}


// 抽象产品：沙发
class Sofa {
  constructor() {
    if (this.constructor === Sofa) {
      throw new Error('抽象类不能被实例化');
    }
  }
  relaxOn() {
    throw new Error('抽象方法必须被实现');
  }
}

// 具体产品：现代沙发
class ModernSofa extends Sofa {
  relaxOn() {
    console.log('躺在现代沙发上');
  }
}

// 具体产品：维多利亚沙发
class VictorianSofa extends Sofa {
  relaxOn() {
    console.log('躺在维多利亚沙发上');
  }
}

// 抽象工厂
class FurnitureFactory {
  constructor() {
    if (this.constructor === FurnitureFactory) {
      throw new Error('抽象类不能被实例化');
    }
  }

  createChair() {
    throw new Error('抽象方法必须被实现');
  }

  createSofa() {
    throw new Error('抽象方法必须被实现');
  }
}

// 具体工厂：现代家具工厂
class ModernFurnitureFactory extends FurnitureFactory {
  createChair() {
    return new ModernChair();
  }

  createSofa() {
    return new ModernSofa();
  }
}

// 具体工厂：维多利亚家具工厂
class VictorianFurnitureFactory extends FurnitureFactory {
  createChair() {
    return new VictorianChair();
  }

  createSofa() {
    return new VictorianSofa();
  }
}

// 客户端代码
function clientCode(factory) {
  const chair = factory.createChair();
  const sofa = factory.createSofa();

  chair.sitOn();
  sofa.relaxOn();
}

// 使用现代家具工厂
clientCode(new ModernFurnitureFactory());

// 使用维多利亚家具工厂
clientCode(new VictorianFurnitureFactory());
```
