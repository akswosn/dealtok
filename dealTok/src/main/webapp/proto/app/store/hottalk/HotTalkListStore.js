/**
 * Hot Talk List Store 
 */

Ext.define('Rnx.store.hottalk.HotTalkListStore',{
	extend : 'Ext.data.Store',
	
	config : {
		storeId : 'hotTalkListStore',
		model : 'Rnx.model.hottalk.HotTalkListModel',
		proxy : {
			type: 'ajax',
			/* 상용 */
			url : Rnx.app.serverBaseUrl + '/rnxApi/hottok/hotTalkList',
			/* local
			url : 'http://112.220.201.202:58081/dealTok/rnxApi/hottok/hotTalkList',
			 * */
			reader: {
			    type: 'json',
			    rootProperty: 'data.htList'
			}     
		},
		autoLoad : false
	}
});
