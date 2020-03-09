/**
 * @author  sparkHou
 * @date 2020-03-08 15:23
 * @Description:
 */
/*使用泛型变量*/
// 你可以这样理解loggingIdentity的类型：泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组。
// 如果我们传入数字数组，将返回一个数字数组，因为此时 T的的类型为number。
// 这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性。
function loggingIdentity1<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

/*泛型类型*/

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
//  ｜
//  \ /

let myIdentity2: { <T>(arg: T): T } = identity;

interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity3: GenericIdentityFn = identity;

interface GenericIdentityFn2<T> {
  (arg: T): T;
}

let myIdentity4: GenericIdentityFn2<number> = identity;


/*泛型类*/
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity([1, 2, 3]);  // Error, number doesn't have a .length property
loggingIdentity({length: 1})

// 在泛型约束中使用类型参数
function getProperty(obj: T, key: K) {
  return obj[key];
}

let x = {a: 1, b: 2, c: 3, d: 4};

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

/*在泛型里使用类类型*/

// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。比如，
function create<T>(c: { new(): T; }): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!
