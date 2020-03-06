/**
 * @author  sparkHou
 * @date 2020-03-04 13:59
 * @Description:
 */

enum Color {Red = 3, Green, Blue}



export default class TSLDto {

  /**
   * 数组
   * @type {number[]}
   */
  list: number[] = [1, 2, 3]

  /**
   * 使用数组范型声明数组
   * @type {number[]}
   */
  listT: Array<number> = [1, 2, 3]


  /**
   * 元组 Tuple
   * 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
   * @type {[string, number]}
   */
  tuple: [string, number] = ['1', 2]
  // error  tuple: [string, number] = [1, 2]


  /**
   * 枚举
   * @type {Color.Green}
   */
  c: Color = Color.Green

  /**
   * 枚举类型提供的一个便利是你可以由枚举的值得到它的名字
   * @type {string}
   */
  enumKey: string = Color[5]


  /**
   * Never
   * never类型表示的是那些永不存在的值的类型
   * 返回never的函数必须存在无法达到的终点
   * @param message
   */
  error(message: string): never {
    throw new Error(message)
  }

  /**
   * Object
   * object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型。
   * @param o
   */
  create(o: object | null): void {

  }

  /**
   * 类型断言
   * @type {string}
   */
  someValue: any = "this is a string"

  strLength: number = (<string>this.someValue).length

  strLength2: number = (this.someValue as string).length

  /*变量声明*/
  /**
   *
   * 默认值可以让你在属性为 undefined 时使用缺省值：
   * @param wholeObject
   */
  keepWholeObject(wholeObject: { a: string, b?: number }) {
    let {a, b = 1001} = wholeObject;
  }

  /**
   * 结构赋值
   * @type {{a: string, b: number, c: string}}
   */
  o = {a: "foo", b: 12, c: "bar"}
  //令人困惑的是，这里的冒号不是指示类型的。 如果你想指定它的类型， 仍然需要在其后写上完整的模式
  //{a, b}: {a: string, b: number} =this.o

  /*接口*/

}
