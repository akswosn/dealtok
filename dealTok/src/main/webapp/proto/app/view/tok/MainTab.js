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
				title : 'TOK',
				iconCls : 'chat',
				id : 'tokListTap',
				xtype : 'tokList'
			},
			{
				title : 'HotTok',
				iconCls : 'list',
				id : 'hotTokListTap',
				xtype : 'hotTalkList'
			}
		]
	}
});