var 
//tbody表格
tbody = document.querySelector('.table tbody'),
//thead表头
thead = document.querySelector('.table thead'),
//增加按钮
add = document.querySelector('.add'),
//删除按钮
remove = document.querySelector('.remove'),
//全选按钮
togglecheck = document.querySelector('.togglecheck'),
//数据
students = (localStorage.students) ? JSON.parse(localStorage.students) : [];

/*  添加一个学生开始  */
add.onclick = function(e){
	//数据
	var xuehao = (students.length) ? (students[students.length-1].id+1) : 1001;
	var stu = {id:xuehao,name:'',sex:'',age:''};
	students.push(stu);
	localStorage.students = JSON.stringify(students);

	//界面
	var tr = document.createElement('tr');
	tr.setAttribute('data-id',xuehao);
	tr.innerHTML = '<td>'+stu.id+'</td><td data-role="name">'+stu.name+'</td><td data-role="sex">'+stu.sex+'</td><td data-role="age">'+stu.age+'</td><td><input type="checkbox" class="ck" value="'+stu.id+'"></td>';
	tbody.appendChild(tr);
}

/*  添加一个学生结束  */

/*  渲染数据并在页面中绘制开始  */
var render = function(){
	tbody.innerHTML = '';
	for(var i in students){
		var stu = students[i];
		var tr = document.createElement('tr');
		tr.setAttribute('data-id',stu.id);
		tr.innerHTML = '<td>'+stu.id+'</td><td data-role="name">'+stu.name+'</td><td data-role="sex">'+stu.sex+'</td><td data-role="age">'+stu.age+'</td><td><input type="checkbox" class="ck" value="'+stu.id+'"></td>';
		tbody.appendChild(tr);
	}
}
render()
/*  渲染数据并在页面中绘制结束  */
/*  删除学生开始  */

//找回ck
var cks = document.querySelectorAll('.ck');
//单击删除按钮从页面和数据中删除
remove.onclick=function(e){
   for(var i=0;i<cks.length;i++){
         var el = cks[i];
         if(el.checked){
         	
         	tbody.removeChild(el.parentElement.parentElement);
            deletstudents(Number(el.value));
         }
         togglecheck.checked = false;
         remove.classList.remove('activeR');
	}
}
//删除函数
var deletstudents = function(id){
	var _s = [];
	for(var i in students){
        if(students[i].id !== id){
        	_s.push(students[i])
        }
	}
	students = _s;
	localStorage.students=JSON.stringify(students);
}

//全选/反选
togglecheck.onclick = function(e){
	for(var i=0;i<cks.length;i++){
		var el = cks[i];
		if(togglecheck.checked){
			remove.classList.add('activeR')
			el.checked = true;
		}else{
			el.checked = false;
			remove.classList.remove('activeR');
		}
	}
}

//全选/反选与下面按钮的逻辑交互处理函数
var zhhandel = function(){
	for(var i=0,j=0;i<cks.length;i++){
		var el = cks[i];
		if(el.checked){
			remove.classList.add('activeR');
			j+=1;
		}else{
			remove.classList.remove('activeR');
		}

	}
	togglecheck.checked = (j === students.length);
}

//编辑函数
var toggleEdit = function(tr){
	var els = tr.querySelectorAll('td[data-role]');
	if(tr.classList.contains('editing')){
		for(var i=0,el,tmp;i<els.length;i++){
			el = els[i];
			tmp = el.querySelector('.text').value;
			el.innerHTML=tmp;

		}
		tr.classList.remove('editing');
		
	}else {
		for(var i=0,el,tmp;i<els.length;i++){
			
			el = els[i];
			tmp = el.innerHTML;
			el.innerHTML='<input class="text" type="text" value="'+tmp+'">';
		}
		tr.classList.add('editing');
		
	}
}

//函数的分发
tbody.onclick = function(e){
	var el = e.target;
	if(el.classList.contains('ck')){
		zhhandel.call(el,e)
	}else if(el.nodeName === 'TD'){
		if(tbody.querySelector('.editing')){
			toggleEdit(tbody.querySelector('.editing'))
		}
		toggleEdit(el.parentElement)
	}
}
/*  删除学生结束  */
/*  实时保存数据  */
var baocun=function(xuehao,key,value){
	xuehao=parseInt(xuehao);
	for(var i=0;i<students.length;i++){
		if(xuehao===students[i].id){
			students[i][key]=value;
			localStorage.setItem('students',JSON.stringify(students)); 
		}
	}

}


var timeId;
tbody.onkeyup=function(e){
	var 
	el = e.target,
	xuehao = el.parentElement.parentElement.getAttribute('data-id'),

	key = el.parentElement.getAttribute('data-role'),
	value = el.value;
	console.log(xuehao,key,value)
	clearTimeout(timeId);
	timeId=setTimeout(function(){
		baocun(xuehao,key,value);

	},1000)
	
}	  

/*var thead = document.querySelector('.table thead');

thead.onclick=function(e){
	var el = e.target;
	if(el.nodeName === 'TH'){
		var sortKey = el.getAttribute('data-role');
		var state = (el.getAttribute('flag')==='true')?true:false;
		el.setAttribute('flag',!state);

		students = students.sort(function(x,y){
			return state ? (x[sortKey] < y[sortKey]) : (x[sortKey] > y[sortKey]);

		})
		render();
	}
	
	
}*/