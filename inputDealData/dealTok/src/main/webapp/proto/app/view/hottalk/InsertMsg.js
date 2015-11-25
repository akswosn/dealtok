/**
 * HOT TALK 입력(STEP. 2) MSG Panel
 */


Ext.define("Rnx.view.hottalk.InsertMsg" ,{
	extend : 'Ext.Panel',
	xtype : 'insertHotTalkMsg',
	paramDealId : '',
	config : {
		showAnimation : 'slide',
		items : [{
				xtype : 'fieldset',
				title : 'Hot Talk Content'
			
			},
		    {
		    	xtype : 'textareafield',
		    	id:'hotContent',
		    	name: 'content',
                ui : 'textarea',
                maxHeight : '6',
                style : 'background:white;border:1px solid red'
		    },
		    {
		    	xtype : 'toolbar',
				docked : 'bottom',
				layout : {
					type : 'hbox',
					pack : 'center'
				},
				items : [
			         {
			        	 xtype : 'button',
			        	 text : '확인',
			        	 id : 'okBtn_2'
			         },
			         {
			        	 xtype : 'button',
			        	 text : '취소',
			        	 id : 'cancleBtn_2'
			         }
				]
		    }
		]
	}
});
