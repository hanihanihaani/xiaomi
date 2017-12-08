//封装对象
function $(selector){
	var s = selector[0];
	var lquery = new LQuery();
	var regHtml = /^<[^<>]+>/g;
	var regHtmlName = /[a-z1-6]+/i;

	if(s == "#"){
		var id = selector.substring(1);
		var oEle = document.getElementById(id);
		lquery.date.push(oEle);
	}else if(s == "."){
		var className = selector.substring(1);
		// var reg = /(^|\s)box1(\s|$)/i;
		var reg = eval("/(^|\\s)"+ className + "(\\s|$)/ig");
		// console.log(reg);
		var aEle  = document.getElementsByTagName("*");
		for(var i=0;i<aEle.length;i++){
			if(reg.test(aEle[i].className)){
				lquery.date.push(aEle[i]);
			}
		}
	}
	//将html标签转化为lquery对象的Dom节点
	//0、判断传进来的是否为标签
	else if(regHtml.test(selector)){
		//1、取得标签名称
		var htmlName = selector.match(regHtmlName)[0];
		// console.log(htmlName);
		//2、根据标签名称创建Dom节点
		var oEle = document.createElement(htmlName);
		//3、取得标签的内容
		var iStart = selector.indexOf(">")+1;
		var iEnd = selector.lastIndexOf("<");
		var content = selector.substring(iStart,iEnd);
		//4、把内容加进新创建的Dom节点
		oEle.innerHTML = content;
		//5、将新创建的动漫dom节点添加到lquery对象中
		lquery.date.push(oEle);
	}

	else{
		var aEle = document.getElementsByTagName(selector);
		for(var i=0;i<aEle.length;i++){
			lquery.date.push(aEle[i]);
		}
	}
	return lquery;
}

// ajax
$.ajax  = function(obj){
	var oAjax = new XMLHttpRequest();
	oAjax.open(obj.method,obj.url,true);
	oAjax.send();
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){
			if(oAjax.status == 200){
				obj.sucess(oAjax.responseText);
			}else{
				obj.err(oAjax.status);
			}
		}
	}
}
function LQuery(){
	this.date = [];
}

LQuery.prototype = {

	constructor:LQuery,

	//获取Dom节点的个数
	size:function(){
		return this.date.length;
	},

	//获取对应索引的Dom节点
	get:function(index){
		if(this.date.length != 0){
			return this.date[index];
		}
	},

	//筛选元素，模拟过滤器
	eq:function(index){
		if(this.date.length !=0){
			var tmp = this.date[index];	
			this.date.length = 0;
			this.date.push(tmp);
		}
		return this;
	},

	// 如果有参数，把Lquery对象中的所有Dom节点的value值变成参数值
	// 如果没有参数，就返回lQUery对象的第一个dom节点值。
	html:function(content){
		if(content){
			for(var i=0;i<this.date.length;i++){
				this.date[i].innerHTML = content;
			}
		}else{
			if(this.date.length = !0){
				return this.date[0].innerHTML;
			}
		}	
	},

	//input
	// 如果有参数，把Lquery对象中的所有Dom节点的value值变成参数值
	// 如果没有参数，就返回lQUery对象的第一个dom节点值。
	val:function(value){
		if(value){
			for(var i=0;i<this.date.length;i++){
				this.date[i].value = value;
			}
		}else{
			if(this.date.length !=0){
				return this.date[0].value;
			}
		}
	},

	//attr(name,[value])
	// 如果两个参数都有，即设置Lquery对象所有dom节点的值
	// 如果只有一个参数，即返回Lquery对象中第一个dom节点的值

	attr:function(name,value){
		if(name && value){
			for(var i=0;i<this.date.length;i++){
				this.date[i][name] = value;
			}
		}else{
			if(this.date.length !=0){
				return this.date[0][name];
			}
			
		}
	},

	// 给Lquery对象中的所有的dom节点添加类，注意：追加

	addClass:function(className){
		for(var i=0;i<this.date.length;i++){
			this.date[i].className = this.date[i].className + " " +className;
		}
	},

	// 删除Lquery对象中的dom节点的类
	// 首先找到所有的类
	// 然后删除类。
	removeClass:function(className){
		var reg = eval("/(^|\\s)"+ className + "(\\s|$)/i");
		for(var i=0;i<this.date.length;i++){
			this.date[i].className = this.date[i].className.replace(reg," ").trim();
		}
	},

	// css(name,[value])
	// 如果两个参数都有，即设置Lquery对象所有dom节点的值
	// 如果只有一个参数，即返回Lquery对象中第一个dom节点的值
	// {name1:value1,name2:value2}
	css:function(){

			if(typeof arguments[0] == "string"){
				if(arguments.length == 2){
					for(var i=0;i<this.date.length;i++){
						this.date[i].style[arguments[0]] = arguments[1];
					}
					return this;
				}
			else{
				if(this.date.length !=0){
					return this.date[0].style[arguments[0]];
				}
			}
		}	
		else{
			var obj = arguments[0];
			for(var i=0;i<this.date.length;i++){
				for(key in obj){
					this.date[i].style[key] = obj[key];
				}
			}
			return this;
		}
	},

	// dom操作
	// $(a).append(b);
	//把b插入到a中
	// parentNode.appendChild(childNode)
	append:function(obj){
		var srcEle = obj.date[0];
		var tagEle = this.date[0];
		tagEle.appendChild(srcEle); 
	},

	// $(a).append(b)
	//把a插入到b中
	appendTo:function(obj){
		var srcEle = this.date[0];
		var tagEle = obj.date[0];
		tagEle.appendChild(srcEle); 
	},

	// $(a).append(b)
	// 把a插入到b的前面
	// parentNode.insertBefore(newELe,oldEle)
	before:function(obj){
		var newELe = this.date[0];
		var oldEle = obj.date[0];
		var parentEle = oldEle.parentNode;
		parentEle.insertBefore(newELe,oldEle);
	},

	// 删除节点$(a),将a删除
	// parentNode.removeChild(childNode)
	remove:function(obj){
		var removeNode = this.date[0];
		var parentEle = removeNode.parentNode;
		parentEle.removeChild(removeNode);
	},

	// $(a),bind(eventName,function)
	// addEventListener("click",function(){},false)
	bind:function(ev,fn){
		for(var i=0;i<this.date.length;i++){
			this.date[i].addEventListener(ev,fn,false);
		}
	},

	// slideUp
	slideUp:function(duration){
		var d = duration || 300;
		var ele = this.date[0];
		var height = ele.offsetHeight;
		var speed = (height*30)/d;//?
		// console.log(speed);
		var timer = setInterval(function(){
			if(ele.offsetHeight <= speed){
				ele.style.height = "0px";
				ele.style.display = "none";
				ele.style.height = height + "px";
				clearInterval(timer);
			}else{
				ele.style.height = ele.offsetHeight - speed + "px";
			}
			
		},30);
	},

	// slideDown
	slideDown:function(duration){
		var d = duration || 300;
		var ele = this.date[0];
		var height = parseInt(ele.style.height);
		// console.log(height);//300;
		ele.style.display = "block";
		ele.style.height = "0px";
		var speed = (height*30)/d;
		// console.log(speed);
		
		var timer = setInterval(function(){
			
			if(height - ele.offsetHeight <=speed){
				ele.style.height = height + "px";
				clearInterval(timer);
			}else{
				ele.style.height = ele.offsetHeight + speed + "px";
			}
		},30)
	}
}