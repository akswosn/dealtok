/**
 * 
 */
 
Ext.define('Rnx.view.tok.MainTab', {
	extend : 'Ext.tab.Panel',
	
	xtype : 'tokMainTab',
	
	config : {
		
		tabBarPosition: 'bottom',
		
		items : [
			{
				title : 'InTok',
				iconCls : 'chat',
				id : 'inTokList',
				xtype : 'tokList'
			},
			{
				title : 'OutTok',
				iconCls : 'chat_black2',
				id : 'outTokList',
				xtype : 'tokList'
			},
			{
				title : 'HotTok',
				iconCls : 'list',
				id : 'hotTokList',
				xtype : 'hotTalkList'
			}
		]
	}
});