/**
 * @author  sparkHou
 * @date 2020-03-11 16:36
 * @Description:
 */
interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person();


// TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性。比如：

interface Named {
  name: string;
}

let x: Named;
// y's inferred type is { name: string; location: string; }
let y = {name: 'Alice', location: 'Seattle'};
x = y;

// 检查函数参数时使用相同的规则：
function greet(n: Named) {
  console.log('Hello, ' + n.name);
}

greet(y); // OK


/*比较两个函数*/
// 相对来讲，在比较原始类型和对象类型的时候是比较容易理解的，问题是如何判断两个函数是兼容的。
// 下面我们从两个简单的函数入手，它们仅是参数列表略有不同：
let x4 = (a: number) => 0;
let y1 = (b: number, s: string) => 0;

y1 = x4; // OK
x4 = y1; // Error


/*函数参数双向协变*/
//当比较函数参数类型时，只有当源函数参数能够赋值给目标函数或者反过来时才能赋值成功。
// 这是不稳定的，因为调用者可能传入了一个具有更精确类型信息的函数，
// 但是调用这个传入的函数的时候却使用了不是那么精确的类型信息。
// 实际上，这极少会发生错误，并且能够实现很多JavaScript里的常见模式。例如：
enum EventType { Mouse, Keyboard }

interface Event {
  timestamp: number;
}

interface MouseEvent extends Event {
  x: number;
  y: number
}

interface KeyEvent extends Event {
  keyCode: number
}

function listenEvent(eventType: EventType, handler: (n: Event) => void) {
  /* ... */
}

// Unsound, but useful and common
listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, (e: number) => console.log(e));

/*可选参数及剩余参数*/

// 有一个好的例子，常见的函数接收一个回调函数并用对于程序员来说是可预知的参数但对类型系统来说是不确定的参数来调用

function invokeLater(args: any[], callback: (...args: any[]) => void) {
  /* ... Invoke callback with 'args' ... */
}

// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], (x, y) => console.log(x + ', ' + y));

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));

/*枚举*/
// 枚举类型与数字类型兼容，并且数字类型与枚举类型兼容。不同枚举类型之间是不兼容的。比如，
enum Status { Ready, Waiting };
enum Color { Red, Blue, Green };

let status = Status.Ready;
status = Color.Green;  // Error

/*类*/
// 类与对象字面量和接口差不多，但有一点不同：类有静态部分和实例部分的类型。
// 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。
class Animal {
  feet: number;
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet: number;
  constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK

/*泛型*/
// 因为TypeScript是结构性的类型系统，类型参数只影响使用其做为类型一部分的结果类型。比如，
interface Empty<T> {
}
let x5: Empty<number>;
let y5: Empty<string>;

x5 = y5;  // OK, because y matches structure of x
// 上面代码里，x和y是兼容的，因为它们的结构使用类型参数时并没有什么不同。
// 把这个例子改变一下，增加一个成员，就能看出是如何工作的了
interface NotEmpty<T> {
  data: T;
}
let x6: NotEmpty<number>;
let y6: NotEmpty<string>;

x6 = y6;  // Error, because x and y are not compatible

// 对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。
// 然后用结果类型进行比较，就像上面第一个例子。
let identity = function<T>(x: T): T {
  // ...
}

let reverse = function<U>(y: U): U {
  // ...
}

identity = reverse;  // OK, because (x: any) => any matches (y: any) => any
