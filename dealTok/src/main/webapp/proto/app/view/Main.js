/**
 * 
 */
 
Ext.define('Rnx.view.Main', {
	
	extend : 'Ext.Panel',
	
	xtype : 'main',
	
	config : {
		
		layout : {
			type:'card',
			animation: 'slide'
		},
		
		items : [
			{
				xtype:'panel',
				id : 'subMenu',
				showAnimation: {
					//type : 'slide',
					//direction : 'right',
					type:'fadeIn',
					duration : 500
				},
				hideAnimation: {
					type : 'fadeOut',
					//direction : 'left',
					duration : 500
				},
				height : 68,
				padding : 5,
				docked : 'top',
				layout: {
					type:'hbox'
				},
				style: 'background-color: #5E99CC',
				hidden:true,
				
				items : [
					{
						xtype : 'button',
						iconMask:true,
						ui : 'plain',
						iconCls:'home',
						text : 'home',
						action : 'goHome',
						iconAlign : 'top'
					},
					{
						xtype : 'button',
						id : 'myProfile',
						ui : 'plain',
						iconMask:true,
						iconCls:'user',
						text : 'Profile',
						iconAlign : 'top'
					},
					{
						xtype : 'button',
						id : 'myFriend',
						ui : 'plain',
						iconMask:true,
						iconCls:'team',
						text : 'Friend',
						iconAlign : 'top'
					},
					{
						xtype : 'button',
						id : 'logout',
						ui : 'plain',
						iconMask:true,
						iconCls:'action',
						text : 'Logout',
						iconAlign : 'top'
					}
				]
			},
			{
				xtype: 'mainView'
			}
		]
	}

});