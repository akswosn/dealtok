/**
 * 
 */
 
Ext.define('Rnx.view.tok.Main', {
	extend : 'Ext.Panel',
	
	xtype : 'tokMain',
	
	
	config : {
		layout : {
			type : 'card',
			
			animation : {
				type : 'slide',
				duration : 300
			}
		},
		
		items : [
			{
				xtype : 'tokMainTab'	
			}
		]
	}
});