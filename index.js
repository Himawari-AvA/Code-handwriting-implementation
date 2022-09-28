/*
 * @Author: Himawari 867415074@qq.com
 * @Date: 2022-09-27 14:41:50
 * @LastEditors: Himawari 867415074@qq.com
 * @LastEditTime: 2022-09-27 18:35:55
 * @FilePath: \手写\index.js
 * @Description: new file
 * 1
 * Copyright (c) 2022 by Himawari 867415074@qq.com, All Rights Reserved.
 */

// 1.防抖

function debounce(func, delay = 200) {
  return function (...args) {
    let timer = null;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
// function debounce(func, delay = 200, immediate) {
//   return function (...args) {
//     let timer = null;
//     if (timer) clearTimeout(timer);

//     if (immediate && !timer) func.apply(this, args);
//     timer = setTimeout(() => {
//       func.apply(this, args);
//     }, delay);
//   };
// }

let debounceFunInstance = debounce(() => {
  console.log('防抖');
}, 1000);

// document.addEventListener('click', debounceFunInstance);

// 2.节流
// (1)
// function throttle(func, wait) {
//   let timer = null;
//   return function (...args) {
//     if (!timer) {
//       timer = setTimeout(() => {
//         func.apply(this, args);
//         timer = null;
//       }, wait);
//     }
//   };
// }

// (2)
function throttle(func, wait) {
  let lastTime = 0;
  return function (...args) {
    let now = new Date();
    if (now - lastTime > wait) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}

let throttleFunInstance = throttle(() => {
  console.log('节流');
}, 1000);

// document.addEventListener('click', throttleFunInstance);

// 3.instanceOf

function _instance(example, classFun) {
  if (example === null || typeof example !== 'object') return false;
  let proto = example.__proto__;
  while (true) {
    if (proto == null) return false;
    if (proto == classFun.prototype) return true;
    proto = proto.__proto__;
  }
}

// console.log('-----_instance------', _instance([], Array));

// 4.new
function myNew(Func, ...args) {
  let newObj = Object.create(Func.prototype);
  let res = Func.apply(newObj, args);
  if (typeof res == 'object') return res;
  return newObj;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// Person.prototype.say = function () {
//   console.log(this.age);
// };
// let p1 = myNew(Person, 'poety', 18);
// console.log(p1.name);
// console.log(p1);
// p1.say();

// 5.call
Function.prototype.myCall = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new Error('type Error');
  }

  let key = Symbol('key');
  context[key] = this;

  let result = context[key](...args);
  delete context[key];
  return result;
};

function f(a, b) {
  console.log(a + b);
  console.log(this.name);
}
let obj = {
  name: 'mycall()',
};
f.myCall(obj, 1, 2); //否则this指向window
