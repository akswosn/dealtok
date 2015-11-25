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
				height : 50,
				padding : 5,
				docked : 'top',
				layout: {
					type:'hbox'
				},
				style: 'background-color: #5E99CC',
				hidden:true,
				
				items : [
					{
						xtype :'button',
						iconMask:true,
						iconCls:'home',
						action : 'goHome'
					},
					{
						xtype :'button',
						id : 'myProfile',
						iconMask:true,
						iconCls:'user',
						text : 'Profile'
					},
					{
						xtype :'button',
						id : 'logout',
						iconMask:true,
						iconCls:'action',
						text : 'Logout'
					}
				]
			},
			{
				xtype: 'mainView'
			}
		]
	}

});