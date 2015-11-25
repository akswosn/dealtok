/**
 * SearchDeal Store
 */
Ext.define('Rnx.store.deal.SearchDealStore', {
	extend: 'Ext.data.Store',
	xtype: 'searchDealStore',
	
	config: {
		storeId: 'SDStore',
		model: 'Rnx.model.deal.DealModel',
		
		
		proxy : {
			type: 'rest',
			url : Rnx.app.serverBaseUrl + '/rnxApi/deal/dealList/1/5',

			reader: {
			    type: 'json',
			    rootProperty: 'list'
			}
		},
		
		autoLoad : false
		
	}
});
