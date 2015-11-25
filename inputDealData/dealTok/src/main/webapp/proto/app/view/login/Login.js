/**
 *
 */

Ext.define('Rnx.view.login.Login', {
	extend : 'Ext.Panel',

	xtype:'login',

	config : {

		store : {},

		layout : {
			type:'vbox',
			pack:'center',
			align:'center'
		},

		items: [
	        {
	            xtype: 'fieldset',
	            title: 'DealTok LoginPage!!',
	            instructions:'Rionnex.Co',
	            items: [
	                {
	                    xtype: 'selectfield',
	                    id : 'userSeq',
	                    label: '사용자 선택',

	                    options: []
	                },
	                {
	                	margin : '10 0 0 0',
	                	xtype:'button',
	                	text:'Login',
	                	action:'login'
	                }
	            ]
	        }
   		],

   		listeners:{
   			activate:function(loginPanel){
   				var selectBox = loginPanel.down('#userSeq');
   				var store = Ext.data.StoreManager.lookup('userStore');

   				var users = [];

   				store.on('load', function(store){

   					var options = [];
   					store.each(function(record, idx){

   						options.push({text: record.raw.nickName,  value: idx});
   					});

   					selectBox.setOptions(options);


   				});

   				store.load();

   				this.setStore(store);
   			}
   		}
	}
});