/**
 * @author  sparkHou
 * @date 2020-03-11 17:40
 * @Description:
 */
/*交叉类型（Intersection Types）*/
// 交叉类型是将多个类型合并为一个类型。
// 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
// 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。
// 就是说这个类型的对象同时拥有了这三种类型的成员。
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!(result as any).hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

class Person {
  constructor(public name: string) {
  }
}

interface Loggable {
  log(): void;
}

class ConsoleLogger implements Loggable {
  log() {
    // ...
  }
}

var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

/*联合类型（Union Types）*/
// 联合类型与交叉类型很有关联，但是使用上却完全不同。
// 偶尔你会遇到这种情况，一个代码库希望传入 number或 string类型的参数。 例如下面的函数：
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", true); // errors during compilation

// 联合类型表示一个值可以是几种类型之一。
// 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。
//
// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。
interface Bird {
  fly();

  layEggs();
}

interface Fish {
  swim();

  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors

/*类型保护与区分类型（Type Guards and Differentiating Types）*/
// 联合类型适合于那些值可以为不同类型的情况。
// 但当我们想确切地了解是否为 Fish时怎么办？ JavaScript里常用来区分2个可能值的方法是检查成员是否存在。
// 如之前提及的，我们只能访问联合类型中共同拥有的成员。

// 每一个成员访问都会报错
if (pet.swim) {
  pet.swim();
} else if (pet.fly) {
  pet.fly();
}
// 为了让这段代码工作，我们要使用类型断言：
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
} else {
  (<Bird>pet).fly();
}

/*用户自定义的类型保护*/
// 这里可以注意到我们不得不多次使用类型断言。
// 假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet的类型的话就好了。

function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}


// 'swim' 和 'fly' 调用都没有问题了

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
// 注意TypeScript不仅知道在 if分支里 pet是 Fish类型；
// 它还清楚在 else分支里，一定 不是 Fish类型，一定是 Bird类型。

/*typeof类型保护*/

// 现在我们回过头来看看怎么使用联合类型书写 padLeft代码。 我们可以像下面这样利用类型断言来写：
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    // 根据上下文，padding必须是number，所以必须用 x is number 不能用boolean
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// 然而，必须要定义一个函数来判断类型是否是原始类型，这太痛苦了。
// 幸运的是，现在我们不必将 typeof x === "number"抽象成一个函数，因为TypeScript可以将它识别为一个类型保护。
// 也就是说我们可以直接在代码里检查类型了。
function padLeft2(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

/*instanceof类型保护*/

// instanceof类型保护是通过构造函数来细化类型的一种方式。 比如，我们借鉴一下之前字符串填充的例子：
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {
  }

  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {
  }

  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
    new SpaceRepeatingPadder(4) :
    new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}

/*可以为null的类型*/
