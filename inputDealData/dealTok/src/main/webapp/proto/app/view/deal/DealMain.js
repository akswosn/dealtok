/**
 * 
 */
 
Ext.define('Rnx.view.deal.DealMain',{
	extend: 'Ext.Panel',
	xtype: 'dealMain',
	
	config: {
		layout : {
			type : 'card',
			
			animation : {
				type : 'slide',
				duration : 300
			}
		},
		
		items: [
			{
				xtype: 'dealList'	
			},
			{
				xtype: 'searchToolBar'
			}
		]
	}
});