var contacts = [
{id:001,name:'Jack',phone:18145139242},
{id:002,name:'Alice',phone:18145138242},
{id:003,name:'Luffy',phone:18145137242},
{id:004,name:'July',phone:18145139642},
{id:005,name:'Peter',phone:18145135542},
{id:006,name:'Kitty',phone:18145134542},
{id:007,name:'Bob',phone:1814513242},
{id:008,name:'Bcd',phone:1814513242},
{id:009,name:'Aed',phone:1814513242},
{id:010,name:'Mary',phone:1814513242},
{id:011,name:'Apen',phone:1814513242},
{id:012,name:'Ket',phone:1814513242},
{id:013,name:'Json',phone:1814513242},
];
var dict = {};
contacts.forEach( function(v){
	var k = v.name[0].toUpperCase();
	if(!dict[k]){
		dict[k] = []
	}
	dict[k].push(v);
})

var wordlist = Object.keys(dict).sort();
var $findlist = document.querySelector('.findlist');
var $ul = $findlist.firstElementChild;
var $contacts = document.querySelector('.contacts');

wordlist.forEach(function(v){
	//渲染右侧的字母
	var $li = document.createElement('li');
	$li.innerHTML = '<a href="#'+v+'">'+v+'</a>';
	$ul.appendChild($li);
   //渲染联系人
   var $dt = document.createElement('dt');
   $dt.id = v;
   $dt.innerHTML = v;
   $contacts.appendChild($dt);
   var data = dict[v];
   data.forEach(function(v){
   	var $dd = document.createElement('dd');
   	$dd.setAttribute('data-id',v.id)
   	$dd.innerHTML = '<h5 class="name" data-id="'+ v.id+'">'+v.name+'</h5><h6 class="phone" data-id="'+v.id+'">'+v.phone+'</h6>';
   	$contacts.appendChild($dd);
   })
   
})
$findlist.style.height = $ul.firstElementChild.offsetHeight * wordlist.length + 'px';

var $tips = document.querySelector('.tips');
var $cancle = document.querySelector('.cancle');
var $card = document.querySelector('.card');
var $name = $tips.querySelector('.name');
var $phone = $tips.querySelector('.phone');

$contacts.addEventListener('touchstart',function(e){
	var el = e.target;
	
	if(el.nodeName === 'H5' || el.nodeName === 'H6' || el.nodeName === 'DD'){
		$tips.style.display = 'block';

	}
	var ID = Number(el.getAttribute('data-id'));
	var data = contacts.filter(function(v){
		return v.id === ID

	})
	$name.innerHTML = data[0].name;
    $phone.innerHTML = data[0].phone;
})

$cancle.addEventListener('touchstart',function(){
	$tips.style.display = 'none';
})
$tips.addEventListener('touchstart',function(){
	$tips.style.display = 'none';
})
$card.addEventListener('touchstart',function(e){
	e.stopPropagation()
})

//编辑函数
var toggleEdit = function(ul){
    var els = ul.querySelectorAll('li[data-role]');
    if(ul.classList.contains('editing')){
		for(var i=0,el,tmp;i<els.length;i++){
			el = els[i];
			tmp = el.querySelector('.text').value;
			el.innerHTML=tmp;

		}
		ul.classList.remove('editing');
		tips.innerHTML='保存成功';
	}else {
		for(var i=0,el,tmp;i<els.length;i++){
			
			el = els[i];
			tmp = el.innerHTML;
			el.innerHTML='<input class="text" type="text" value="'+tmp+'">';
		}
		ul.classList.add('editing');
		
	}
}
$tips.addEventListener('click',function(e){
     var el = e.target;
     if(el.nodeName === 'LI'){
     	if($tips.querySelector('.editing')){
     		toggleEdit($tips.querySelector('.editing'))
     	}
     	toggleEdit(el.parentElement)
     }
})






