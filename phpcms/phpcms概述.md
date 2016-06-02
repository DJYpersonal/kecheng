# phpcms使用

后台：localhost/admin.php
前台：localhost/index.php

## 什么是内容管理系统？

用来制作动态网站的一个系统
phpcmsv9

把index.php公开给用户去访问
index.php是一段程序
这段程序根据得到的参数决定把哪个页面发送给用户

这段程序会在web服务器上寻找html和脚本，图片，拼接起来之后发送给用户
同时会把数据库中的动态内容写入这些html中

## 在哪里找？

html文件在哪里
phpcms/templates/default/content/

脚本和图片在哪里
statics/css
statics/js
statics/image

## 如果想改样式和结构怎么办？

### 首页
phpcms/templates/default/content/index.html
header.html + index.html + footer.html
修改header.html
body以下都注释掉
<style></style>
```html
<divn class="1_header">
	<ul>
		<li><a href="/">首页</a></li>
		<!-- nav-site -->
		{pc}
		{loop}
		<li><a href="#"></a></li>
		{/loop}
		{/pc}
		<li><a href="#"></a></li>
		<li><a href="#"></a></li>
	</ul>

</div>
```

### 栏目页( 有子栏目的栏目 )
图片模型 category_picture.html
文章模型 category.html
商品模型 category_shangpin.html
教师模型 category_jiaoshi.html

### 栏目页( 没有子栏目的栏目 )
图片模型 list_picture.html
文章模型 list.html

### 内容页
图片模型 show_picture.html
文章模型 show.html

index.html -> category.html -> list.html -> show.html

```php
取一级栏目
{pc:content action="category" catid="0"}
{loop $data $r}
{/loop}
{/pc}
取某个一级栏目下的二级栏目
{pc:content action="category" catid="$catid"}
{loop $data $r}
{/loop}
{/pc}
取栏目下的内容
{pc:content action="lists" catid="$catid"}
{loop $data $r}
{/loop}
{/pc}
取内容中的标题和文章
{title} {content}
```

## 在每个页面中我们能使用哪些php变量
index.html     $CATEGORYS ;
category.html  $CATEGORYS $catid = 点的那个一级栏目的id;
list.html      $CATEGORYS $catid = 点的那个栏目的id;
show.html      $CATEGORYS $catid = 这个内容属于的那个栏目的id;
               数据模型中的字段{$title} {$content}
               