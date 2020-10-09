var b = 1;

//函数声明，以function关键字开头
// function func(p) {
//     console.log(p);
// }

// var func2 = function(p) {
//     console.log(p);
// }
// func2();

// var声明的变量的作用域不能超过函数

// + function () {
//     var a = 0;
// }();
// console.log(a);

// var声明的变量的作用域可以穿过 {}
if(true) {
    var c = 0;
}

console.log(c);

// let/const 声明的变量的作用域不能超过 {}，也不能超过函数 
if(true) {
    let d = 0;
}

// let/const 块级作用域   var 函数级作用域

// console.log(d);




// let fun = function () {
//     console.log(e);
// }
// fun();

// let e = 1;


// 词法环境：一个函数在被定义的时候，可以记住当时所处的环境

// 一个函数可以 return 另一个函数
let makeTimer = function (times) {
    return function (n) {
        return n * times;
    }
}

// 可以生产函数的函数
let timer3 = makeTimer(3);
console.log(timer3(3));

// 可以生产有记忆的函数的函数

// 

let makeCounter = function (start) {
    let s = start;
    return function () {
        return s++;
    }
}

let counter = makeCounter(15);

counter();

// 闭包就是一个能记住他自己在定义的时候所处的环境的函数，所有的函数javascript函数都是闭包

// nodejs
// js是不是特别火啊， 然后会js的人也很多，然后chrome浏览器里面跑js也很快，然后就有一个人把chrome里的js引擎分离出来和浏览器独立了
// nodejs
// global

//setTimeout里的回调函数

// setTimeout(
//     ()=>{
//         console.log(1);
//     },
//     0
// );
// console.log(2);

// new 的操作步骤

// 创建一个空对象 {}
// 把这个空对象赋值给函数体里的this
// 返回this