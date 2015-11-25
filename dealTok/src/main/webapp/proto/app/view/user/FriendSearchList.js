/**
 */

Ext.define("Rnx.view.user.FriendSearchList" ,{
	extend : 'Ext.dataview.List',
	xtype : 'friendSearchList',
	fullscreen : true,
	config : {
		title : '친구추가',
		id: 'friendSearchList',
		mode: 'MULTI',
		layout : 'vbox',
		store : 'friendSearchStore',
		itemTpl : new Ext.XTemplate(
			'<tpl for=".">'
			 	+ '<div style="float:left">'
			 		+ '<img style="height:50px;width:50px;" src="'+Rnx.app.serverBaseUrl+'/proto/resources/images/headshots/{userImg}"/>{nickName}'
		 		+ '</div>'
			 	//+ '<div style="float:right">'
			 	//	+ '친구초대'
				 	//+ '친구'
			 	//+ '</div>'
			 	+ '<div style="clear:both"></div>'
			 + '</tpl>'
		),
    	items : [{
    		xtype : 'toolbar',
			docked : 'bottom',
			layout : {
            	type : 'hbox',
            	pack : 'middle'
            },
			items : [
		         {
		        	 xtype : 'button',
		        	 text : '확인',
		        	 id : 'btn_add_friend'
		         },
		         {
		        	 xtype : 'button',
		        	 text : '취소',
		        	 id : 'btn_cancle_friend'
		         }
			]
    	}]
	},
	addFriend : function(userSeq){
		console.log(userSeq);
	},
	show : function(){
		this.callParent();
	}
});
