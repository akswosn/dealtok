/**
 * 
 */
 
Ext.define('Rnx.view.user.MyProfile', {
	extend : 'Ext.Panel',
	
	xtype:'myProfile',
	userData : '',
	fullscreen : false,
	config : {
		width:'300px',
		height:'380px',
		layout : 'vbox',
		showAnimation : 'fade',
		items : {
			xtype:'toolbar',
			docked : 'bottom',
			layout : {
				pack : 'center'
			},
			items : [{
				xtype:'button',
				text : '닫기',
				handler : function(btn){
					btn.getParent().getParent().hide();
				}
			}]
		}
	},
	initialize:function(){
		if(!this.userData){
			this.userData = Rnx.app.getLoginUser();
		}
		
		//resources/images/headshots/{userImg}
		var userData = this.userData;
		var genders = ['여성','남성'];
		
		var viewHtml = ''
			+ '<div style="padding:3px;"><table style="border:1px solid #006400">'
			+ '<tr><td width="30%" align="right" style="color:#fff;background-color:#006400">NickName. </td><td> &nbsp;'+userData.nickName+'</td></tr>'
			+ '<tr><td width="30%" align="right" style="color:#fff;background-color:#006400">UserId. </td><td> &nbsp;'+userData.uid+'</td></tr>'
			+ '<tr><td width="30%" align="right" style="color:#fff;background-color:#006400">age. </td><td> &nbsp;'+userData.age+'</td></tr>'
			+ '<tr><td width="30%" align="right" style="color:#fff;background-color:#006400">Gender. </td><td> &nbsp;'+genders[userData.gender]+'</td></tr>'
			+ '<tr><td width="30%" align="right" style="color:#fff;background-color:#006400">Phone. </td><td> &nbsp;'+userData.phone+'</td></tr>'
			+ '<tr><td width="30%" align="right" style="color:#fff;background-color:#006400">Addr. </td><td> &nbsp;'+userData.address+'</td></tr>'
			+ '</table></div>';
		
		var views = [
             {xtype : 'toolbar',docked:'top',title:'MyProfile'},
		     {
            	 xtype:'panel',
            	 layout:'hbox',
            	 items:[{
            		xtype:'panel',
            		layout:'vbox',
            		items : [{
	            		 html : '<div style="border:1px solid #006400;margin-top:3px;padding-top:3px;text-align:center"><img width="100px" height="90px" src="resources/images/headshots/' +userData.userImg + '"/><div>'
	            	 },
	            	 {
	            		 xtype:'button',
	            		 text : '이미지 변경',
	            		 iconMask:true,
						 iconCls:'compose',
						 ui:'confirm',
	            		 handler : function(){
	            			 Ext.Msg.alert("!Notification","프로토 타입 버전에서 지원되지 않는 기능입니다.");
	            		 }
	            	 }]
            	 }]
		     }
		];
		
		this.setItems(views);
		this.setHtml(viewHtml);
	}
});