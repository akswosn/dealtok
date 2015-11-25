/**
 * Hot Talk List Store 
 */

Ext.define('Rnx.store.user.ProfileStore',{
	extend : 'Ext.data.Store',
	
	config : {
		storeId : 'profileStore',
		fields: [ 
			{name : 'userSeq', type : 'int'},		
			{name : 'nickname', type : 'string'},		
			{name : 'gender', type : 'string'},		
			{name : 'age', type : 'string'},			
			{name : 'greeting', type : 'string'},			
			{name : 'profile_img', type : 'string'},		
			{name : 'area', type : 'string'},	
			{name : 'seller', type : 'string'},		
			{name : 'category', type : 'string'}
		],
		proxy : {
			type: 'ajax',
			url : null,
			reader: {
			    type: 'json',
			    rootProperty: 'profile'
			}     
		}
	}
});
