# canvas常用API	

## 形状

> 矩形

* ctx.fillRect()     填充矩形
* ctx.strokeRect()   框线矩形

> 圆

* ctx.arc()      圆
* ctx.arcTo()    圆弧

> 线

* ctx.beginPath()    开始一个路径
* ctx.moveTo()       移动画笔到某点
* ctx.lineTo()       让路径中`拥有`(并不会直接绘制) 一条到某点的线
* ctx.rect()         让路径中`拥有`(并不会直接绘制) 一个矩形
* ctx.fill()         填充当前路径
* ctx.stroke()       描边当前路径
* ctx.closePath()    结束一个路径

* ctx.quadraticCurveTo( cp1x,cp1y,x,y )
  二次贝塞尔
* ctx.bezierCurveTo( cp1x,cp1y,cp2x,cp2y,x,y)
  三次贝塞尔

// 从画布中清除矩形区域
// 画布的特点，绘制上的元素无法更改
* ctx.clearRect();

清理画布的两种方式
```javascript
document.onclick = function(){
	canvas.width = canvas.height = 600;
	ctx.clearRect( 0,0,600,600 );
}
```
画布的编程

## 样式

* ctx.fillStyle = 'rgba(0,0,0,.8)';
* ctx.strokeStyle = '#1b2888';
* ctx.globalAlpha = 0.2; 全局透明度

* ctx.lineWidth
* ctx.lineCap
* ctx.lineJoin
* ctx.miterlimit
* ctx.getLineDash()
* ctx.setLineDash()
* ctx.lineDashOffset()

* createLinearGradient(x1, y1, x2, y2)
* createRadialGradient(x1, y1, r1, x2, y2, r2)
* gradient.addColorStop(position, color)

* createPattern(image, type)

* shadowOffsetX = float
* shadowOffsetY = float


## 位移( 挪动画布 )
只保存画布(包含画笔)状态，不保存任何图像
* ctx.save()
* ctx.restore()

* ctx.translate()
* ctx.rotate()
* ctx.scale()