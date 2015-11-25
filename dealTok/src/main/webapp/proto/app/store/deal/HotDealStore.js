/**
 * HotDeal Store
 */
Ext.define('Rnx.store.deal.HotDealStore', {
	extend: 'Ext.data.Store',
	xtype: 'HotDealStore',
	
	config: {
		storeId: 'HDStore',
		model: 'Rnx.model.deal.DealModel',
		
		
		proxy : {
			type: 'rest',
			url : Rnx.app.serverBaseUrl + '/rnxApi/deal/hotDeal/latest/1/5',

			reader: {
			    type: 'json',
			    rootProperty: 'list'
			}
		},
		
		autoLoad : false
		
	}
});
