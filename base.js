//移除某个类名--参数为元素和要移除的类名
 function removeClass(element,value){
 	if(element.classList){
        element.classList.remove(value);
 	}else{
	 	var classNames=element.className.split(/\s+/);
	 	var pos=-1,
	 	    i,
	 	    len;
	 	for(i=0,len=classNames.length;i<len;i++){
	 		if(classNames[i]==value){
	 			pos=i;
	 			break;
	 		}
	 	}
	 	classNames.splice(i,1);
	 	element.className=classNames.join(" ");
    }
}
//增加某个类名--参数为元素和要增加的类名
 function addClass(element,value){
 	if(element.classList){
 		element.classList.add(value);
 	}else{
	 	if(!element.className){
	 		element.className=value;
	 	}else{
	 		var newClass=element.className;
	 		var newClassArr=newClass.split(/\s+/);

	 		if(newClassArr.indexOf(value)==-1){
	           newClass+=" ";
	 		   newClass+=value;
	 		   element.className=newClass;
	 		}    	 		   	 		
	 	}
    }
}
//判断元素是否有某个类名--参数为元素和要判断的类名
function containsClass(element,value){
	if(element.classList){
		return element.classList.contains(value);
	}else{
		return element.className.split(/\s+/).indexOf(value)!=-1?true:false;
	}   
}
//切换元素的类名--参数为元素和切换的类名
function toggleClass(element,value){
	if(element.classList){
		if(element.classList.contains(value)){
			element.classList.remove(value);
		}else{
			element.classList.add(value);
		}
	}else{
	 	if(containsClass(element,value)){
	        removeClass(element,value);
	 	}else{
	 		addClass(element,value);
	 	}
    }
}
//找到所有class为sClass的元素--参数为在oParent下面开始查找,查找的class
function getAllClass(oParent,sClass){
	if(typeof oParent.getElementsByClassName=='function'){
	 	return oParent.getElementsByClassName(sClass);
	}else{
	 	var aClass=[];
	 	var aChildNode=oParent.getElementsByTagName("*");
	 	for(var i=0,len=aChildNode.length;i<len;i++){
	 		if(aChildNode[i].className==sClass){
	           aClass.push(aChildNode[i]);
	 		}
	 	}
	 	return aClass;
	}
}
//在目标元素之后插入元素--参数为插入的元素和目标元素
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//判断一个节点是不是参考节点的后代--参数为参考节点和要判断的节点
function nodeContains(refNode,otherNode){
	 if(typeof refNode.contains=="function"){
	 	return refNode.contains(otherNode);
	 }else if(typeof refNode.compareDocumentPosition=="function"){
	 	return !!(refNode.compareDocumentPosition(otherNode) & 16);
	 }else{
	 	var node=otherNode.parentNode;
	 	do{
	 		if(node===refNode){
	 			return true;
	 		}else{
	 			node=node.parentNode;
	 		}
	 	}while(node!=null);
	 	return false;
	 }
}
//获得元素的文本值--参数为该元素
function getInnerText(element){
  	return (typeof element.textContent=='string') ? element.textContent : element.innerText;
}
//设置元素的文本值--参数为该元素和要设置的文本值
function setInnerText(element,text){
  	if(typeof element.textContent=='string'){
  		element.textContent=text;
  	}else{
  		element.innerText=text;
  	}
}
//获取元素的样式--参数为该元素
function computedStyle(element){
   var computedStyle=null;
   if(document.defaultView && typeof document.defaultView.getComputedStyle=='function'){
   	computedStyle=document.defaultView.getComputedStyle(element,null);
   }else{
   	computedStyle=element.currentStyle;
   }
   return computedStyle;
}
//获取元素的左边偏移量--参数为该元素
function getElementLeft(element){
	var actualLeft=element.offsetLeft;
	var current=element.offsetParent;
	while(current!=null){
		actualLeft+=current.offsetLeft;
		current=current.offsetParent;
	}
	return actualLeft;
}
//获取元素的上边偏移量--参数为该元素
function getElementTop(element){
	var actualTop=element.offsetTop;
	var current=element.offsetParent;
	while(current!=null){
		actualTop+=current.offsetTop;
		current=current.offsetParent;
	}
	return actualTop;
}
//得到浏览器视口大小
function getViewport(){
	if(document.compatMode=='BackCompat'){
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}
//确定文档的总高度和总宽度
function docSize(){
	if(document.compatMode=='CSS1Compat'){
		return{
			docHeight:Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight),
			docWidth:Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth)
		};
	}else{
		return{
			docHeight:Math.max(document.body.scrollHeight,document.body.clientHeight),
			docWidth:Math.max(document.body.scrollWidth,document.body.clientWidth)
		};
	}
}
//事件
var EventUtil={
	 //增加事件处理程序--参数为该元素，事件类型，事件处理程序
	addHandler:function(element,type,handler){
	  	if(element.addEventListener){
            element.addEventListener(type,handler,false);
	  	}else if(element.attachEvent){
	  	    element.attachEvent("on"+type,handler);
	  	}else{
	  		element["on"+type]=handler;
	  	}
	},
	//获取事件对象
	getEvent:function(event){
        return event ? event : window.event;
	},
	//获取目标元素
	getTarget:function(event){
        return event.target || event.srcElement;
	},
	//获取页面坐标位置
	getPagePosition:function(event){
        return {
        	pageX:event.pageX ? event.pageX : event.clientX+(document.body.scrollLeft || document.documentElement.scrollLeft),
        	pageY:event.pageY ? event.pageY : event.clientY+(document.body.scrollTop || document.documentElement.scrollTop)
        };
	},
	//获取mouseover和mouseout事件的相关元素
	getRelatedTarget:function(event){
        if(event.relatedTarget){
        	return event.relatedTarget;
        }else if(event.toElement){
        	return event.toElement;
        }else if(event.formElement){
        	return event.formElement;
        }else{
        	return null;
        }
	},
	//获取mousedown和mouseup事件的鼠标按钮键(0,1,2-从左到右)
	getButton:function(event){
        if(document.implementation.hasFeature("MouseEvents","2.0")){
        	return event.button;
        }else {
        	switch(event.button){
        		case 0:
        		case 1:
        		case 3:
        		case 5:
        		case 7:
        		    return 0;
        		case 2:
        		case 6:
        		    return 2;
        		case 4:
        		    return 1;
        	}
        }
	},
	//鼠标滚轮事件（mousewheel) 滚轮向前为正，滚轮向后为负
	getWheelDelta:function(event){
        if(event.wheelDelta){
        	return event.wheelDelta;
        }else{
        	return -event.detail*40;
        }
	},
	//得到keypress事件的字符编码
	getCharCode:function(event){
       if(typeof event.charCode=='number'){
       	    return event.charCode;
       }else{
       	    return event.keyCode;
       }
	},
	//获取剪切板里面的文本
	getClipboardText:function(event){
        var clipboardData=(event.clipboardData || window.clipboardData);
      	    return clipboardData.getData("text");
	},
	//设置剪切板里面的文本（不可用)
	setClipboardText:function(event,value){
        if(event.clipboardData){
            return event.clipboardData.setData("text/plain",value);
        }else if(window.clipboardData){
            return window.clipboardData.setData("text",value);
        }
	},
	//阻止默认行为
	preventDefault:function(event){
        if(event.preventDefault){
        	event.preventDefault();
        }else{
        	event.returnValue=false;
        }
	},
	//取消冒泡行为
	stopPropagation:function(event){
        if(event.stopPropagation){
        	event.stopPropagation();
        }else{
        	event.cancelBubble=true;
        }
	},
	//移除事件处理程序--参数为该元素，事件类型，事件处理程序
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
		    element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
		    element.detachEvent("on"+type,handler);
		}else{
		    element["on"+type]=null;
		}
	}
};
//取得文本框select事件时选择的文本--参数为该文本框
function getSelectedText(element){
	if(typeof element.selectionStart=="number"){
		return element.value.substring(element.selectionStart,element.selectionEnd);
	}else if(document.selection){
		return document.selection.createRange().text;
	}
}
//取得文本框部分文本并选中--参数为该文本框，要选择字符的开始位置，要选择字符的结束位置
function selectText(element,startIndex,endIndex){
	if(element.setSelectionRange){
  		element.setSelectionRange(startIndex,endIndex);
  	}else if(element.createTextRange){
  		var range=element.createTextRange();
  		range.collapse(true);
  		range.moveStart("character",startIndex);
  		range.moveEnd("character",endIndex);
  		range.select();
  	}
  	element.focus();
}
//设置表单元素获取焦点--参数为form元素，和类型值（设置元素在表单中的位置或name属性值）
function selectFocus(form,typed){
 if(typeof typed =="number"){
 	var element=form.elements[typed];
 	if(element.type&&element.type=="hidden" || computedStyle(element).display=="none" || computedStyle(element).visibility=="hidden"){
 		selectFocus(form,typed+1);
 	}else{
 		if(element.autofocus!==true){
 			element.focus();
 		}
 	}
 }else{
 	var element=form.elements[typed];
 	if(element.type&&element.type=="hidden" || computedStyle(element).display=="none" || computedStyle(element).visibility=="hidden"){
 		for(var i=0,len=form.elements.length;i<len;i++){
 			if(form.elements[i].name==typed){
 				selectFocus(form,i+1);
 				break;
 			}
 		}		
 	}else{
 		if(element.autofocus!==true){
 			element.focus();
 		}
 	}
 }
}
//获取选择框全部选中的项--参数为该选择框
function getSelectedsOption(selectbox){
	var result=new Array();
	var option=null;
	for(var i=0,len=selectbox.options.length;i<len;i++){
		option=selectbox.options[i];
		if(option.selected){
			result.push(option);
		}
	}
	return result;
}
//清除选择框的所有项
function clearSelectbox(selectbox){
	for(var i=0,len=selectbox.options.length;i<len;i++){
	 	selectbox.remove(0); //每移除一项，后续选项会上移一项
	}
}
//表单序列化--参数为该表单
function serialize(form){
	var parts=[],
	    field=null,
	    i,
	    len,
	    j,
	    optlen,
	    option,
	    optValue;
	for(i=0,len=form.elements.length;i<len;i++){
		field=form.elements[i];
		switch(field.type){
			case "select-one":
			case "select-multiple":
			if(field.name.length){
				for(j=0,optlen=field.options.length;j<optlen;j++){
					option=field.options[j];
					if(option.selected){
						optValue='';
						if(option.hasAttribute){
							optValue=(option.hasAttribute("value") ? option.value : option.text);
						}else{
							optValue=(option.attributes("value").specified ? option.value : option.text);
						}
						parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(optValue));
					}
				}
			}
			break;
            
            case undefined:  //字段集
            case "file":     //文件输入
            case "submit":   //提交按钮
            case "reset":    //重置按钮
            case "button":   //自定义按钮
            break;

            case "radio":
            case "checkbox":
            if(!field.checked){
            	break;
            }
            /*执行默认操作*/
            default:
            //不包含没有名字的表单字段
            if(field.name.length){
                parts.push(encodeURIComponent(field.name)+"="+encodeURIComponent(field.value));
            }
		}
	}
	return parts.join("&");
}
//向现有的URL末尾添加查询字符串参数--参数为url,名称，值
function addURLParam(url,name,value){
	url+=(url.indexOf("?")==-1 ? "?" : "&");
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
	return url;
}
//查询字符串参数
function getQueryStringArgs(){
	var qs=(location.search.length>0 ? location.search.substring(1) : ""),
	    args={},
	    items=qs.length ? qs.split("&") : [],
	    item=null,
	    name=null,
	    value=null,
	    i=0,
	    len=items.length;
	for(i=0;i<len;i++){
		item=items[i].split("=");
		name=decodeURIComponent(item[0]);
		value=decodeURIComponent(item[1]);
		if(name.length){
			args[name]=value;
		}
	}
	return args;
}
//检测是不是原生数组--参数为要检测的值
function isArray(value){
	return Object.prototype.toString.call(value)=='[object Array]';
}
//类数组转换为数组
function convertToArray(nodes){
	var array=null;
	try{
		array=Array.prototype.slice.call(nodes,0);
	}catch(ex){
		array=new Array();
		for(var i=0,len=nodes.length;i<len;i++){
			array.push(nodes[i]);
		}
	}
	return array;
}
//函数节流自动进行定时器的设置和清除--参数为要执行的函数和在哪个作用域中执行
function throttle(method,context){
	clearTimeout(method.tId);
	method.tId=setTimeout(function(){
		method.call(context);
	},100);
}
//cookie对象
var CookieUtil={
   //获取cookie属性的值--参数为要获取具体的属性
   get:function(name){
		var cookieName=encodeURIComponent(name)+"=",
		   cookieStart=document.cookie.indexOf(cookieName),
		   cookieValue=null;
		if(cookieStart>-1){
			  var cookieEnd=document.cookie.indexOf(",",cookieStart);
			  if(cookieEnd==-1){
			  	  cookieEnd=document.cookie.length;
			  }
			  cookieValue=decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd));
		}
		return cookieValue;
   },
   //设置cookie--参数为名称，值，失效时间，路劲，域名，安全标识
   set:function(name,value,expires,path,domain,secure){
		var cookieText=encodeURIComponent(name) + "=" + encodeURIComponent(value);
		if(expires instanceof Date){
			  cookieText += "; expires=" + expires.toGMTString();
		}
		if(path){
			  cookieText += "; path=" + path;
		}
		if(domain){
			  cookieText += "; domain=" + domain;
		}
		if(secure){
			  cookieText += "; secure";
		}
		document.cookie=cookieText;
   },
   //删除cookie--参数为名称，路劲，域名，安全标识
   unset:function(name,path,domain,secure){
        this.set(name,"",new Date(0),path,domain,secure);
   }
}
//子cookie
var SubCookieUtil={
    //获取单个子cookie--参数为cookie的名称和子cookie的名称
 	get:function(name,subName){
        var subCookies=this.getAll(name);
        if(subCookies){
        	return subCookies[subName];
        }else{
        	return null;
        }
 	},
    //获取全部子cookie--参数为cookie的名称
 	getAll:function(name){
        var cookieName=encodeURIComponent(name)+"=",
            cookieStart=document.cookie.indexOf(cookieName),
            cookieVlaue=null,
            cookieEnd,
            subCookies,
            i,
            parts,
            result={};

        if(cookieStart>-1){
            cookieEnd=document.cookie.indexOf(";",cookieStart);
            if(cookieEnd==-1){
            	cookieEnd=document.cookie.length;
            }
            cookieVlaue=document.cookie.substring(cookieStart+cookieName.length,cookieEnd);
            if(cookieVlaue.length>0){
            	subCookies=cookieVlaue.split("&");
            	for(i=0,len=subCookies.length;i<len;i++){
            		parts=subCookies[i].split("=");
            		result[decodeURIComponent(parts[0])]=decodeURIComponent(parts[1]);
            	}
            	return result;
            }
        }
        return null;
 	},
    //设置单个子cookie--参数cookie的名称,子cookie的名称,子cookie的值,失效时间,路径,域名,安全标识
 	set:function(name,subName,value,expires,path,domain,secure){
        var subcookies=this.getAll(name) || {};
        subcookies[subName]=value;
        this.setAll(name,subcookies,expires,path.domain,secure);
 	},
    //设置全部子cookie--参数为cookie的名称,子cookie对象,失效时间,路径,域名,安全标识
 	setAll:function(name,subcookies,expires,path,domain,secure){
        var cookieText=encodeURIComponent(name)+"=",
            subcookieParts=new Array(),
            subName;
        for(subName in subcookies){
        	if(subName.length>0 && subcookies.hasOwnProperty(subName)){
        		subcookieParts.push(encodeURIComponent(subName)+"="+encodeURIComponent(subcookies[subName]));
        	}
        }
        if(subcookieParts.length>0){
        	cookieText+=subcookieParts.join("&");
        	if(expires instanceof Date){
        		cookieText+=";expires="+expires.toGMTString();
        	}
        	if(path){
        		cookieText+=";path="+path;
        	}
        	if(domain){
        		cookieText+=";domain="+domain;
        	}
        	if(secure){
        		cookieText+=";secure";
        	}
        }else{
        	cookieText+=";expires="+(new Date(0)).toGMTString();
        }
        document.cookie=cookieText;
 	},
    //删除单个子cookie--参数为cookie的名称,子cookie的名称,路径,域名,安全标识
 	unset:function(name,subName,path,domain,secure){
 	 	var subcookies=this.getAll(name);
 	 	if(subcookies){
 	 		delete subcookies[subName];
 	 		this.setAll(name,subcookies,null,path,domain,secure);
 	 	}
 	},
 	//删除全部的子cookie--参数为cookie的名称,路径,域名,安全标识 
 	unsetAll:function(name,path,domain,secure){
 	 	this.setAll(name,null,new Date(0),path,domain,secure);
 	}
}
//完美运动框架--参数为当前物体,属性对象,回调函数
/*
function startMove(obj,json,fnEnd){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop=true;
        for(var attr in json){
            var cur=0;
            if(attr=='opacity'){
                cur=Math.round(parseFloat(computedStyle(obj)[attr])*100);
            }else{
                cur=parseInt(computedStyle(obj)[attr]);
            }
            var speed=(json[attr]-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(json[attr]!=cur)
                bStop=false;
            if(attr=='opacity'){
            cur+=speed;
        	obj.style.filter='alpha(opacity:'+cur+')';
            obj.style.opacity=cur/100;
            }else{
                obj.style[attr]=cur+speed+'px';
            }
        }
        if(bStop){
            clearInterval(obj.timer);
            if(fnEnd){
                fnEnd();
            }
        }
    },30);
}*/