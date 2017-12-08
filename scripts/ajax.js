function ajax(url,fnSuc,fnFail){
			//创建Ajax对象
	var oAjax  = new XMLHttpRequest();
	//用Ajax建立连接
	oAjax.open('GET',url,true);
	//用Ajax对象发送请求
	oAjax.send();
	//用ajax对象接受数据
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){
		
		if(oAjax.status == 200){
			fnSuc(oAjax.responseText);
			}else{
				if(fnFail){
					fnFail(oAjax.status);
				}
			}
		}
	}
}