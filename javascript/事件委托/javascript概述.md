> 程序语言

# 程序语言是什么

> 和计算机交流的语言

# 计算机是什么？能做什么？

> 计算机就是用来做计算的

程序语言就是一条条的人类可读的指令，告诉计算机怎么去做计算

程序语言就像一份指令或者一份菜谱，详细的描述了计算机应该怎么去计算

一门程序语言必须具备一些能力，才能和计算机交流明白

# 必须能很清楚的告诉计算机，怎样去存储数据
# 必须能很清楚的告诉计算机，怎样去做逻辑操作

## javascript中的逻辑操作
*  运算符: {+ - * % && || ！}
{=== !=== >= <= > <  (esLint)}
*  if(){}
*  if(){}else{}
*  if(){}else if(){}else if(){}else if(){}
* switch(val){
case 1;XXXXX;break; case2;XXXXX;break;
}
* for(var i = 0; i<100; i++){

}
* while(i < 200){
console.log(1);
i++;
}
* do{
console.log(12);
i++;
}while(i<300)

## 数据存储
### 单个存储
* var _v = 1;              Number
* var _v = undefined;      undefined
* var _v = null;           null
* var _v = true;           Boolean

### 以类似表单形式存储
* var _v = 'aad你好';      String
* var -v = [1,2,3,'aa'];   Array
* var _v = {a:3,b:2,c:1};  Object
* var _v = function(){};   function

console.dir()
javascript中用类似于‘表’的形式来存储数据（对象）

## 从函数这个对象说起
var fn=function(){
alert(1);
return 5;
}

* 写在函数体中的代码去哪里了？

> 函数对象会用一个不可见的属性‘调用’来存储函数体中的代码
> ｛ '调用'：'alert(1);return5' }

* 函数这个对象相比其他对象的特殊之处在于它可以被调用
* 函数名+() 可以调用函数

* 定义函数的时候发生了什么？

> 要把代表函数的那张表构建完全
> 1.‘调用’这个属性要赋值，函数体内部的字符串
> 2.需要把当前可见范围内的所有的变量，由近到远的记录到一个链条中，形成一条作用域链

* 调用函数的时候发生了什么？

> 函数对象会去读取自己身上'调用'这个属性的值，取出来一些字符串，
> 把这些字符串交给js解析器去当做javascript代码去执行。
> 与此同时还会取出函数的作用域链，用来辅助这段代码的执行

* 在函数中 this 是什么？

> 只有在函数中才有this这个东西
> 函数体内部的this值不是固定不变的

> 函数在定义的时候,this 什么都不是
>函数在调用的时候，根据调用的不同情况，来决定this变成什么

* 到底有哪些不同的调用情况？
```javascript

var da=function(){
  var fn=function(){
    console.log(this)
  }
  fn();
}
da();
// 正常的定义一个函数(不把函数作为某个对象的属性)
// 正常的调用一个函数(使用()的方式调用函数)
// this是指向widow对象
```

```javascript
var obj = {
	a: 1,
	b: 2,
	c: function(){
	console.log(this);
    }
}
obj.c()
// this 指向obj对象，指向它的宿主对象
```

```javascript
//如果我们需要把this换成任何我们想要的对象
// 我们需要借助函数对象身上的call
var obj = {a:1,b:2};
obj.c = function(){
	console.log(this);
} 
obj.c();// this依然指向obj对象

obj.c.call( [1,2,3,5] )  // this指向数组
```

* 当我们写好一份程序之后，计算机在处理的过程中发生了什么？
> 对照代码，从上往下解析

# 用在展示信息的web页面中
# 用在web app中