/**
 * @author  sparkHou
 * @date 2020-03-12 16:40
 * @Description:
 */

/*装饰器工厂*/
// 如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。
// 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。
// 我们可以通过下面的方式来写一个装饰器工厂函数
function color(value: string) { // 这是一个装饰器工厂
  return function (target: any) { //  这是装饰器
    // do something with "target" and "value"...
  }
}

/*类装饰器*/
// 类装饰器在类声明之前被声明（紧靠着类声明）。 类装饰器应用于类构造函数，可以用来监视，修改或替换类定义。
// 类装饰器不能用在声明文件中( .d.ts)，也不能用在任何外部上下文中（比如declare的类）。
//
// 类装饰器表达式会在运行时当作函数被调用，类的构造函数作为其唯一的参数。
//
// 如果类装饰器返回一个值，它会使用提供的构造函数来替换类的声明。
//
// 注意  如果你要返回一个新的构造函数，你必须注意处理好原来的原型链。 在运行时的装饰器调用逻辑中 不会为你做这些。
//
// 下面是使用类装饰器(@sealed)的例子，应用在Greeter类：

function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

// 当@sealed被执行的时候，它将密封此类的构造函数和原型。(注：参见Object.seal)

// 下面是一个重载构造函数的例子。
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property";
    hello = "override";
  }
}

@classDecorator
class Greeter2 {
  property = "property";
  hello: string;

  constructor(m: string) {
    this.hello = m;
  }
}

console.log(new Greeter2("world"));

/*方法装饰器*/
// 方法装饰器声明在一个方法的声明之前（紧靠着方法声明）。
// 它会被应用到方法的 属性描述符上，可以用来监视，修改或者替换方法定义。
// 方法装饰器不能用在声明文件( .d.ts)，重载或者任何外部上下文（比如declare的类）中。
//
// 方法装饰器表达式会在运行时当作函数被调用，传入下列3个参数：
//
// 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 成员的名字。
// 成员的属性描述符。
// 注意  如果代码输出目标版本小于ES5，属性描述符将会是undefined。
//
// 如果方法装饰器返回一个值，它会被用作方法的属性描述符。
//
// 注意  如果代码输出目标版本小于ES5返回值会被忽略。
//
// 下面是一个方法装饰器（@enumerable）的例子，应用于Greeter类的方法上：

function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter3 {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}

/*属性装饰器*/
//属性装饰器声明在一个属性声明之前（紧靠着属性声明）。
// 属性装饰器不能用在声明文件中（.d.ts），或者任何外部上下文（比如 declare的类）里。
//
// 属性装饰器表达式会在运行时当作函数被调用，传入下列2个参数：
//
// 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
// 成员的名字。
// 注意  属性描述符不会做为参数传入属性装饰器，这与TypeScript是如何初始化属性装饰器的有关。
// 因为目前没有办法在定义一个原型对象的成员时描述一个实例属性，并且没办法监视或修改一个属性的初始化方法。
// 返回值也会被忽略。因此，属性描述符只能用来监视类中是否声明了某个名字的属性。
//
// 我们可以用它来记录这个属性的元数据，如下例所示：
class Greeter4 {
  @format("Hello, %s")
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    let formatString = getFormat(this, "greeting");
    return formatString.replace("%s", this.greeting);
  }
}
import "reflect-metadata";

const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
