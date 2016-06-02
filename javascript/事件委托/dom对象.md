# DOM是什么

Document Object Modal(文档对象模型)

我们在页面中看到的div,span,p,h1 等等元素或文字
在 javascript 眼中都是一个对象

# 从一个web应用的开发说起

第一步，从页面中去选取一个元素出来
当我们的代码在浏览器中去运行时，
浏览器已经帮我们创建了很多对象，
对象中有很多方法，供我们使用，
这些东西都在一个叫window的全局变量里

window对象中的属性，可以省略window. 去调用

选取元素，我们使用 window.document 开始

## 选取元素的方式

快速从document中取出一个DOM对象的办法

* document.body
* document.head
* document.title
* document.documentElement  代表了整个html标签的一个DOM对象

* var el = document.querySelector()
* document.getElementById()

* document.querySelectorAll()
* document.getElementsByClassName()
* document.getElementsByTagName()
* document.getElementsByName()

这些方法的返回结果是什么？
前两个的返回结果是一个代表页面中某个元素的对象，我们把它叫做DOM对象

后四个的返回结果是一个类数组对象，我们把它叫做DOM集合
```javascript
var obj = {
0：DOM对象，
1：DOM对象,
......
length : 12;
}
```

## DOM对象中的常用的属性和方法

### Object

* toString()
* valueOf()

### EventTarget

* addEventListerner()
* removeEventListener()
* dispatchEvent()

### Node

所有的DOM对象都是一个‘节点’， 这三个属性用来描述节点
* nodeName
* nodeType
* nodeValue

我们能从每个DOM对象身上取到自己的相邻或父或子节点
* childNodes     DOM集合( NodeList )
* firstChild     DOM对象
* lastChild      DOM对象

* parentElement
* parentNode

* nextSibling
* previousSibling

取节点的文本内容（会过滤掉标签）
* textContent

每个DOM对象中都提供了一些操作节点的方法


采用 父DOM对象，xxx(DOM对象)这种方式的
* appendChild()    box.appendChild(el).style.color = 'red';
* insertBefore()   返回值 你插入的那个DOM对象
* replaceChild()   返回值 替换成的那个DOM对象 
* removeChild()    返回值 被移除的那个DOM对象

```javascript
var tmp = box.removeChild(el);
```

* contains()       返回值 布尔类型 //判断一个节点中包不包含另外一个节点
* hasChildNodes()  返回值 布尔类型 // el.children.length

* cloneNode()      返回值 DOM对象
(true:里面的东西都会复制出来,false：只复制标签)


### Element

‘元素’ 和 ’节点‘ 的区别’、

带标签都既是元素，又是节点
不带标签的，比如div内容的文字，比如它们只是节点，不是元素

从一个DOM对象开始 获取子，父，兄弟元素
* children     取一个DOM对象的所有子‘元素’
* firstElementChild
* lastElementChild

* nextElementSibling
* previousElementSibling

对元素属性的操作  (HTML元素的属性，就是头标签里的那些 k="" 中的　ｋ)
* classList    add remove toggle contains
* className      可读写
* id             可读写
* getAttribute()     $0.getAttribute('data-role')
* setAttribute()     没有返回值，只是做一个操作
* hasAttribute()     判断元素头标签中不没有某个属性  布尔值
* removeAttribute()  没有返回值，只是做一个操作

* outerHTMl
* tagName

获取该元素的视窗坐标，或者其他和位置相关的信息
* getBoundingClientRect()   返回值 
{top:1,left:1,bottom:1;width:1,height:1}
* scrollLeft
* scrollTop    可读写的
* clientWidth  一般用来结合 document.documentElement.clientWidth
* clientHeight

从某个DOM对象开始，可以缩小范围继续去查找元素

* getElementsByClassName()
* getElementsByTagName()
* querySelector()
* querySelectorAll()

### HTMLElement

* innerHTML      可读写的  能设置某个DOM对象内部的html结构
warning: 不要用这种方式追加元素 el.innerHTML += '<div></div>'
* innerText      剥离标签，直接获取文本

实时获取元素信息

* offsetHeight
* offsetLeft
* offsetWidth
* offsetTop
* offsetParent  具有定位属性（非static）的祖先元素，得到DOM对象

操作元素行内样式
* style     可读写的 读的时候实时获取元素行内样式的值，不会去计算css文件中定义的属性

## HTML xxx Element

* value
* checked
* src

##  添加事件的两种方式用及其区别

事件  事件对象  添加事件的方式  不同方式之间的区别  事件流  
事件默认行为  阻止事件流  事件委托（事件委派）

我们给DOM对象的onclick属性赋值，值为一个函数
这次赋值和普通的对象赋值不太一样
js 会告诉浏览器，密切关注这个元素，如果有人点击它帮我把这个函数运行一下
运行函数的时候给我传一个参数，参数为一个对象
对象中要详细的记录这次点击的一些信息 这个对象被称为事件对象

```javascript
// 1 使用  onxx
var el = document.getElementById('box')
el.style.color = 'red';
el.onclick = function(){
   
}
// 2 使用 addEventListener
el.addEventListener('click',function(e){
	console.log(e)
},false);
// false 可以省略不写

```
区别：
  1. 一些H5事件并没有onxx这个版本
  2. onxx 再赋值一次，会覆盖上次赋值的那个函数，addEventListener没有这个问题，它可以给一个事件添加多个函数，事件触发的时候，按照添加顺序，逐个调用处理函数；

### 自定义事件
click dblclick => threeclick
```javascript
var threeclick = new Event('threeclick');
var box = document.querySelector('.box');
box.addEventListener('threeclick',function(){
	console.log(1);
})
box.dispatchEvent(threeclick)
```
### 阻止冒泡事件
    1. 从页面结构上去调整， 让元素之间不再是包含关系
    2. 使用事件对象身上的 stopPropagation() 这个函数
    不要给自定义事件调用 stopPropagation()

### 阻止事件的默认行为
    要从事件的根源去阻止默认行为
    preventDefault()

## 回调函数
   当我们把函数x作为参数传给函数y
   函数y内部有对函数x的调用
   我们把函数x叫做回调函数

如果就是数组，我们遍历的时候可以使用
var arr = [1,2,3,4,5];
arr.forEach(function(v){
	console.log(v);
})

如果是类数组对象，我们遍历的时候可以使用
var arr = [];
forEach = arr.forEach;
filter = arr.filter;
var els = document.querySelentorAll('div');
forEach.call(els,function(v){
	console.log(v)  v就是dom集合中的dom对象
})