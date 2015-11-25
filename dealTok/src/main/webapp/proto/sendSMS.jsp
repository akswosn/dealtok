<%@page import="java.net.URLEncoder"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<META HTTP-EQUIV="Content-type" CONTENT="text/html;charset=utf-8"> 
<script type="text/javascript">
	function smsSendInit(){
		//한글깨짐 오류 수정중
		var request = new Request();
		var msg = decodeURIComponent(request.getParameter("msg")); 
		
		console.log('start smsSendInit()');
		var obj;
		obj = window.location.href = 'sms:${param.phone}?body=DealTok 메시지 : '+msg;
		console.log('msg : ' + msg);
		console.log(obj);
		var interval = setInterval(function(){
			if(obj){
				clearInterval(interval);
				window.close();
			}
		}, 2000);
	}
	
	var Request = function() {
		this.getParameter = function( name ) {
		var rtnval = '';
		var nowAddress = unescape(location.href);
		var parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');
		for(var i = 0 ; i < parameters.length ; i++)
			{
				var varName = parameters[i].split('=')[0];
				if(varName.toUpperCase() == name.toUpperCase())
				{
					rtnval = parameters[i].split('=')[1];
					break;
				}
			}
		return rtnval;
		};
	};
</script>
</head>
<body onload = "javascript:smsSendInit()">
</body>
</html>