/**
 * @author  sparkHou
 * @date 2020-03-07 16:52
 * @Description:
 */
// 这个例子演示了如何在子类里可以重写父类的方法。
// Snake类和 Horse类都创建了 move方法，它们重写了从 Animal继承来的 move方法，
// 使得 move方法根据不同的类而具有不同的功能。
// 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法：
class Animal2 {
  name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal2 {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal2 {
  constructor(name: string) {
    super(name);
  }

  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal2 = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

// 公共，私有与受保护的修饰符
// 理解 protected
class Person {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name)
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
//console.log(howard.name); // 错误

// readonly修饰符
// 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;

  constructor(theName: string) {
    this.name = theName;
  }
}

let dad = new Octopus("Man with the 8 strong legs");

// dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.

//参数属性
// 注意看我们是如何舍弃了 theName，仅在构造函数里使用 readonly name: string参数来创建和初始化 name成员。
// 我们把声明和赋值合并至一处。
class Octopus2 {
  readonly numberOfLegs: number = 8;

  constructor(readonly name: string) {
  }
}

let asd = new Octopus2('haha')

// 存取器
let passcode = "secret passcode";

class Employee2 {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee = new Employee2();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  alert(employee.fullName);
}

// 静态属性
// 到目前为止，我们只讨论了类的实例成员，那些仅当类被实例化的时候才会被初始化的属性。
// 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。
// 在这个例子里，我们使用 static定义 origin，因为它是所有网格都会用到的属性。
// 每个实例想要访问这个属性的时候，都要在 origin前面加上类名。
// 如同在实例属性上使用 this.前缀来访问属性一样，这里我们使用 Grid.来访问静态属性。

class Grid {
  static origin = {x: 0, y: 0};

  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }

  constructor(public scale: number) {
  }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// 抽象类
abstract class Animal3 {
  abstract makeSound(): void;

  move(): void {
    console.log('roaming the earch...');
  }
}

abstract class Department {

  constructor(public name: string) {
  }

  printName(): void {
    console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

  constructor() {
    super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
    console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
//department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
//department.generateReports(); // 错误: 方法在声明的抽象类中不存在

// 高级技巧
// 构造函数
// 当你在TypeScript里声明了一个类的时候，实际上同时声明了很多东西。 首先就是类的 实例的类型

class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

// 把类当做接口使用
// 如上一节里所讲的，类定义会创建两个东西：类的实例类型和一个构造函数。
// 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
