/**
 *
 */

Ext.define('Rnx.view.login.Login', {
	extend : 'Ext.form.Panel',

	xtype:'login',

	config : {
		layout : {
			type:'vbox',
			pack:'center',
			align:'center'
		},
		showAnimation: {
			type:'slide'
		},
		items: [
	        {
	            xtype: 'fieldset',
	            title: 'DealTok LoginPage!!',
	            instructions:'Rionnex.Co',
	            items: [
	                {
	                    xtype: 'textfield',
	                    name : 'uid',
	                    label: 'ID'
	                },
	                {
	                	xtype: 'passwordfield',
	                	name : 'passwd',
	                	label: 'PASSWORD'
	                },
	                {
	                	margin : '10 0 0 0',
	                	xtype:'button',
	                	text:'Login',
	                	action:'login'
	                },
	                {
	                	 xtype: 'button',
	                	 text: 'Home',
	                	 ui: 'decline',
	                	 action : 'goIntro'
	                }
	            ]
	        }
   		],

   		listeners:{
   			/*
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
   			 * */
   		}
	}
});