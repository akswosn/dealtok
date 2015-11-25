/**
 * Friend Store 
 */
Ext.define('Rnx.store.deal.FriendStore', {
	extend: 'Ext.data.Store',
	xtype: 'friendStore',
	
	config: {
		storeId: 'fStore',
		model: 'Rnx.model.deal.FriendModel',
		data: []
	}
});