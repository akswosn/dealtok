/**
 * Deal Store
 */
Ext.define('Rnx.store.deal.DealStore', {
	extend: 'Ext.data.Store',
	xtype: 'dealStore',
	
	config: {
		storeId: 'dealStore',
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
