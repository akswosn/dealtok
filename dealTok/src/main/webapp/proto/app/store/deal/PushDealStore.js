/**
 * PushDeal Store
 */
Ext.define('Rnx.store.deal.PushDealStore', {
	extend: 'Ext.data.Store',
	xtype: 'PushDealStore',
	
	config: {
		storeId: 'PDStore',
		model: 'Rnx.model.deal.DealModel',
		
		
		proxy : {
			type: 'rest',
			url : Rnx.app.serverBaseUrl + '/rnxApi/deal/pushDeal/1/0/5',

			reader: {
			    type: 'json',
			    rootProperty: 'list'
			}
		},
		
		autoLoad : false
		
	}
});
