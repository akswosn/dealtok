/**
 * Hot Talk List Store 
 */

Ext.define('Rnx.store.user.UserStore',{
	extend : 'Ext.data.Store',
	
	config : {
		storeId : 'userStore',
		model : 'Rnx.model.user.UserModel',
		proxy : {
			type: 'ajax',
			url : Rnx.app.serverBaseUrl + '/rnxApi/user/userList',
			reader: {
			    type: 'json',
			    rootProperty: 'userList'
			}     
		}
	}
});
