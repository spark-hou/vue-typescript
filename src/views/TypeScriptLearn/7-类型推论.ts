/**
 * @author  sparkHou
 * @date 2020-03-11 16:24
 * @Description:
 */

/*基础*/
// TypeScript里，在有些没有明确指出类型的地方，类型推论会帮助提供类型。如下面的例子
let x2 = 3;

/*最佳通用类型*/
// 当需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，
let x3 = [0, 1, null]

// 由于最终的通用类型取自候选类型，有些时候候选类型共享相同的通用类型，但是却没有一个类型能做为所有候选类型的类型。例如：
let zoo = [new Rhino(), new Elephant(), new Snake()];

// 这里，我们想让zoo被推断为Animal[]类型，但是这个数组里没有对象是Animal类型的，
// 因此不能推断出这个结果。 为了更正，当候选类型不能使用的时候我们需要明确的指出类型：
let zoo: Animal[] = [new Rhino(), new Elephant(), new Snake()];
// 如果没有找到最佳通用类型的话，类型推断的结果为联合数组类型，(Rhino | Elephant | Snake)[]。


/*上下文类型*/
// TypeScript类型推论也可能按照相反的方向进行。
// 这被叫做“按上下文归类”。按上下文归类会发生在表达式的类型与所处的位置相关时。比如：
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.button);  //<- Error
};
// 如果上下文类型表达式包含了明确的类型信息，上下文的类型被忽略。 重写上面的例子：
window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.button);  //<- Error
};
