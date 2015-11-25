/**
 * 
 */
 
Ext.define('Rnx.view.deal.SearchDealMain',{
	extend: 'Ext.Panel',
	xtype: 'searchDealMain',
	
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
				xtype: 'searchDealList'	
			}
		]
	}
});