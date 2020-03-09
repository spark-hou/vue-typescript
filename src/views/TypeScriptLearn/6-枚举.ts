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
