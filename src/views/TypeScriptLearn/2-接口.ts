/**
 * @author  sparkHou
 * @date 2020-03-06 16:10
 * @Description:
 */
/*接口*/

//只读属性
interface Point {
  readonly x: number;
  readonly y: number;
}

// 额外的属性检查
interface SquareConfig {
  color?: string;
  width?: number;
}

// 最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性
// interface SquareConfig {
//   color?: string;
//   width?: number;
//
//   [propName: string]: any;
// }

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {color: "sd", area: 123}
}

// error: 'colour' not expected in type 'SquareConfig'
// let mySquare = createSquare({colour: "red", width: 100});

// 绕开这些检查非常简单。 最简便的方法是使用类型断言：
let mySquare = createSquare({width: 100, opacity: 0.5} as SquareConfig);

// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
}

//可索引的类型
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// TypeScript支持两种索引签名：字符串和数字。
// 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
// 这是因为当使用 number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用 100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致

class Animal {
  name: string;

  constructor() {
    this.name = '1'
  }
}

class Dog extends Animal {
  breed: string;

  constructor() {
    super()
    this.breed = '2'
  }
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  // [x: number]: Animal;
  [x: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number;

  length: number;    // 可以，length是number类型
  //name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

// 只读
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray2: ReadonlyStringArray = ["Alice", "Bob"];
//myArray2[2] = "Mallory"; // error!


/*类类型*/

//实现接口
interface ClockInterface {
  currentTime: Date;
}

class Clock implements ClockInterface {
  currentTime: Date;

  constructor(h: number, m: number) {
    this.currentTime = new Date()
  }
}

// 类静态部分与实例部分的区别
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface2;
}

interface ClockInterface2 {
  tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface2 {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface2 {
  constructor(h: number, m: number) {
  }

  tick() {
    console.log("beep beep");
  }
}

class AnalogClock implements ClockInterface2 {
  constructor(h: number, m: number) {
  }

  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

/*继承接口*/
// 和类一样，接口也可以相互继承。
// 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。
// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = <Square>{}
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// 混合类型
interface Counter {
  (start: number): string;

  interval: number;

  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {
  };
  counter.interval = 123;
  counter.reset = function () {
  };
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。
// 接口同样会继承到类的private和protected成员。
// 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select(): void {
  }
}

class TextBox extends Control {
  select() {
  }
}

// 错误：“Image”类型缺少“state”属性。
// class Image2 implements SelectableControl {select() { }}

