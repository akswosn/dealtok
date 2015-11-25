/**
 * 
 */
 
Ext.define('Rnx.view.push.PushDealMain',{
	extend: 'Ext.Panel',
	xtype: 'pushDealMain',
	config: {
		id: 'pushDealMain',
		layout : {
			type : 'card',
			
			animation : {
				type : 'slide',
				duration : 300
			}
		},
		
		items: [
			{
				xtype: 'pushToolBar'	
			},
			{
				xtype: 'pushDealList'	
			}
		]
	}
});