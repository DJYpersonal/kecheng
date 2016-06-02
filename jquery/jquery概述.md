# jQuery

前端开发在开始写代码之前，一般首先要解决的两个问题
1.解决js标准本身的兼容性问题       es5shim.js
2.解决DOM扩展部分的兼容性问题      jQuery

```html
第一个引入的js库用来解决兼容性问题
<script src = "jquery.js"></script>
<script scr = "index.js"></script>
```
分开引用的js文件一定要解决的一个问题
不能污染全局作用域

```javascript
// jQuery.js
var getElement = function(selector){
	if(document.querySelector){
	return document.querySelector(selector);
}else{
    console.warnning('浏览器不支持');
	console.error('请更换浏览器');
}
}

```

```javascript
var el = getElement('.abc');
var getElement = function(){
	
}
```

上面这种写法的两个问题
1. 用户需要学习一门全新的语法
2. 用户需要避开那个库中的所有全局变量

## 实现原理
DOM 对象
```javascript
var el = {
	offsetWidth:12,
	_proto_:(HTMLDivElement)
	  title:'aa',
	  _proto_:HTMLElement
	    src:'xxx.png'
	    _proto_:Element
	      getAttribute:fn,
          _proto_:Node
           nodeName:'IMG',
}

```

DOM 集合
```javascript
var els = {
	0:el,
	1:el,
	2:el,
	3:el,
	length:4,
	_proto_:(并没有多少有价值的方法或属性)
}

```

jQuery 对象
```javascript
var jquery = {
	0:div,
	1:div,
	2:div,
	3:div,
	length:4,
	_proto_:
	  addClass:fn,
	  removeClass:fn,
	  toggleClass:fn,
	  css:fn,
	  prop:fn
	  ...
}
```
jQuery 是一个javascrip库
库可以简单理解成一堆以某种方式组织起来的，方便，易用的函数的集合

jQuery库的优点
1. 全面解决PC端的兼容性问题
2. 语法精炼，性能好，插件库庞大

jQuery版本号之间的区别
1.xx -> 1.12    支持ie6-8
2.0             彻底的放弃了对ie<10的支持，转向移动端


## jquery 原理
$().addClass('red');
1. new 的时候究竟发生了什么
2. 对象的原型链
3. 函数的对象身上一个属性(prototype)和一个方法(call)
4. this的指向
```javascript
(function(){
    var jQuery = function(selector){
       var els = document.querySelectorAll(selector);
       for(var i=0; i<els.length; i++){
          this[i] = els[i]
       }
       this.length = els.length;
    }
    jQuery.prototype.addClass = function(str){
      for(var i=0; i<this.length; i++){
         this.classList.add(str)
      }
    }
    var _j = function(selector){
       return new jQuery(selector;)
}
	window.$ = _j;
})();
```
jquery中的大多数方法都会返回一个jquery集合
* 操作集合的方法返回的就是原集合
* 对集合做过过滤或者导致集合改变的一些方法返回改变后的jquery集合
* $ .append 这一类方法，当涉及到创建dom对象时，他们会返回创建完成后的一个jquery集合

所以在jquery中链式调用很常见
```javascript
$('#selectors h1')
.width(100)
.height(200)
.css({color:'whidte'})
.positon();  // 链条在这里断
```

$函数能接受的参数类型以及对应的返回值

* null jQuery对象
* 数组，对象  处理过的jQuery对象
* 选择器
* html标签
* DOM对象
* DOM集合
* 函数

## jquery中能使用的选择器

jquery中选择器使用一个叫sizzle.js的库
.a p > a .item
从后往前找 (在树中，找父元素只是一次查找，找子元素需要遍历)

* parent > child  子选择器  父元素下的直接子元素
* A B             后代选择器
* prev + next     相邻一个选择器
* prev ~ next     相邻所有选择器


在找到的集合中筛选
$('.header div:first')
* :animated       所有正在执行的jquery动画的元素
* :eq()           下标等于几的元素  从0开始
* :lt()           下标小于几的元素  从0开始
* :gt()           下标大于几的元素  从0开始
* :first          第一个
* :last           最后一个
* :even           偶数元素
* :odd            奇数元素
* :not()          接受简单选择器，从选中的元素中剔除符合规则的

* :header         找h1-h6标签 $(this).find('*:header')
* :lang()         找出属性中的有lang的元素
                  $(this).find('div:lang(spanish)')
                  <div lang="spanish">
* :root()         找html元素
* :target         index.html#A

* :contains       过滤内容中包含某个字符的元素
* :empty          $('p:empty')  没有内容的元素
* :has()          括号中可以接受一个简单选择器
                  判断已选中的元素的子元素中是否包含某个规则的元素
* :parent()       选中元素中包含子元素的

* :visible        留下选中元素中可见的元素
* :hidden         留下选中元素中不可见的元素


* [attr]          筛选出有attr这个属性的
* [attr=aa]       精确等于aa
* [attr != aa]    baac
* [attr |= aa]    aa || aa-xxx  精确等于aa或以aa-开头的
* [attr *= aa]    baac  无论在任何位置，只要有这个字符串就可以
* [attr ^= aa]    aabbc  aa-cc  aa-a1    以这个字符串开头的
* [attr ~= aa]    class="xx yy zz"   yy  空格隔开，有这个字符串的
* [attr $= aa]    xxx-data  yyy-data    以这个字符串结尾的

* :nth-child()       判断依据：选中的元素是不是父元素下的第几个
* :nth-last-child()  反着数
* :first-child 
* :last-child     
* :nth-of-type()     判断依据：选中的元素是不是父元素下同类元素的第几个
* :nth-last-of-type()父元素下同类型的倒数第几个
* :first-of-type
* :last-of-type
* :only-child        孤独的孩子
* :only-of-type

* :text  
* :disabled         在所有的input标签中，可以禁用它

# jQuery 中的方法

jQuery中的方法分两类：
1.直接出现在是jQuery函数对象身上，是一些基础性质的工具函数
2.出现在jQuery.fn函数对象的原型链上，用来批量(或单个)操作jQuery集合中的dom元素

大部分方法重载很严重
```javascript
$('li').css('width');  //取出选中集合中第一个元素的宽度 +px
$('li').css('width',200)  //设置集合中的所有元素宽度为 200 px
$('li').css({width:200,height:300,border:'1px solid black'});
//给选中集合中所有的元素加上传入对象中的所有css样式

//给集合中的每一个元素，添加'width'这个属性
//每一个元素的'width'属性的值由第二个参数传入的函数来计算
//也应当意味着，jQuery会对集合中的每一个元素调用用户传入的回调函数
//调用的时候会传入两个参数，一个是当前元素在集合中的位置(0,1,2,3,4),另外一个是当前元素现在的'width'值：
$('li').css('width',function(){
	return Math.random();
})
var colors = ['red','blue','green'];
$('li').css({
   width:function(){return Math.random();},
   height:function(){return Math.random();},
   backgroundColor:function(i){return colors[i];}
})
```

jQuery库设计理念
1. 解决兼容性问题
2. 让从页面中查找元素变得更轻松
3. 提供很多内置方法 使对dom集合的操作 变得更轻松
css
addClass 这些方法通过内置的遍历去操作每一个dom 元素

遍历的两种情况
1. 给集合中的每一个dom元素设置同样的值或行为
2. 给集合中的每一个dom元素设置不同的值或行为 

jQuery不希望我们在循环中使用这些内置方法：
```javascript
var colors = ['red','blue','orange','black'];
var els = document.querySelectorAll('.item');
for(var i=0;i<els.length;i++){
	els[i].classList.add(colors[li]);
//////////////////////////////////////////////////////
var colors = ['red','blue','orange','black'];
$('.item').each(function(i,el){
	$(el).addClass(colors[i]);
});
$('.item').addClass(function(i,c){
	return colors[i]
})
}
```

1. $('li').attr('data-id');
2. $('li').attr('data-id','12');
3. $('li').attr('data-id',function(i,e){
	return Math.random();
});
4. $('li').attr({data-id:12,data-src:'img.png'});
5. $('li').attr({
	data-id:function(){
	  return Math.random();
	},
	data-src:'img.png'
});
6. 以空格分割开的字符串 addClass('a b c')

节点操作
.clone()  拷贝后得到对象父元素等信息会丢失

参数：dom对象 dom集合 html规则的字符串 jQuery对象
可以接收回调函数，不能接收选择器
返回值：谁调用的返回谁

给jQuery对象中的元素添加子元素
* .append()    添加到最后一个子元素之后
* .prepend()   添加到第一个子元素之前

给jQuery对象中的元素添加兄弟元素
* .after()     添加到自己之后
* .before()    添加到自己之前 


参数： dom  dom集合 jQuery对象  `选择器`
不可以接收函数
返回值： 谁调用返回谁

把jQuery对象作为子元素添加到某个元素中去
* .appendTo()
* .prependTo()

把jQuery对象作为兄弟元素添加到某个元素向前或身后
* .insertAfter()    
* .insertBefore()

on 添加事件的重载

```javascript
$('.item').on('click',function(){
	console.log(1);
})
$('.item').on('click mouseleave mouseenter',clickHandler);
```

```javascript
var fn1 = function(){};
var fn2 = function(){};
var fn3 = function(){};
$('.item').on({
	'click':fn1,
	'mouseleave':fn2,
	'mouseenter':fn3
})
```

```javascript
//事件委托的方式
$('#ul').on('click','li',function(){
	
});
//事件委托的另外一种方式
$('#ul').delegate('li','click',function(){
	
})
```

jQuery事件中的注意事项：

1. on()  的几种添加方式
   * 一次绑定多个事件  用同一个处理函数
   * 一次绑定多个事件  用不同的处理函数
2. 事件委托的添加方式( 只能使用 on 和 delegate 方法)
3. mouseover mouseout 方法由于事件冒泡带来的多次触发
   一般我们使用 mouseenter 和 mouseleave
   以及hover (hover 是对 mouseenter mouseleave 的封装)
4. focus blur  =>  focusin focusout 同上  后面的两个不会冒泡
5. ready() 事件一般用 $(function(){}) 来代替
   内部的处理方式是 document.addEventListener('DOMContentLoaded');
   如果文档结构(不包含图片，脚本等)已经加载完成，直接运行函数
   如果还没有加载完成 ，把函数绑定到 'DOMContentLoaded' 事件
6. trigger() 会模仿浏览器触发事件 (会冒泡)  triggerHandler 不会
7. 所有事件添加函数的返回值都是要绑定事件的那个jQuery对象，所以可以继续链式调用$('.item').click(function(){console.log(1)}).css();

jQuery中的事件对象

继承自原生的事件对象  e.keyCode  e.altKey  e.target  e.clientX

* e.currentTarget
* e.data
```javascript
var xs = function(){
	var bb = {x:1,y:2};
	$('li:lt(3)').on('click',bb,function(e){
	  e.preventDefault();
	  console.log(e.data);
	})
	setInterval(function(){
	  bb = {a:Math.random(),b:Math.random()};
	},1000);
}

$('li').on('click',{x:1,y:2},function(e){
	console.log(e.data)
})
$('li').click({x:1,y:2},function(e){
	console.log(e.data)
})
```
* e.namespace
```javascript
$('li').on({
	'click':function(){console.log(1);};
	''
})
```

### 同步
* 正常的函数
* 正常的赋值
* 正常的逻辑运算，普通运算

### 异步
* 事件
* 动画(setInterval setTimeout)
* Ajax(发送网络请求)