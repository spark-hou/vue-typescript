/**
 * @author  sparkHou
 * @date 2020-03-08 22:10
 * @Description:
 */

/*数字枚举*/
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}

/*字符串枚举*/
//字符串枚举的概念很简单，但是有细微的 运行时的差别。
// 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
enum Direction2 {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

/*异构枚举（Heterogeneous enums）*/

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

/*计算的和常量成员*/

// 每个枚举成员都带有一个值，它可以是 常量或 计算出来的。 当满足如下条件时，枚举成员被当作是常量：

enum FileAccess {
  // constant members
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  // computed member
  G = "123".length
}

/*联合枚举与枚举成员的类型*/
enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Square,
  //    ~~~~~~~~~~~~~~~~ Error!
  radius: 100,
}

/*反向映射*/
enum Enum {
  A
}

let a = Enum.A;
let nameOfA = Enum[a]; // "A"

/*const枚举*/
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]

/*外部枚举*/
declare enum Enum2 {
  A = 1,
  B,
  C = 2
}
