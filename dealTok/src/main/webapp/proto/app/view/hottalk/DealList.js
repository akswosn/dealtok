/**
 * HOT TALK ���(STEP. 2). Dealist Panel
 */



Ext.define("Rnx.view.hottalk.DealList" ,{
	extend : 'Ext.List',
	xtype : 'hotTalkDealList',
	fullscreen : true,
	paramDealId : '',
	
	config : {
		showAnimation : 'slide',
		store : 'HDStore',
		plugins: [
            {
            	xclass: 'Ext.plugin.ListPaging',
            	loadTpl: '<div align="center"><b>&nbsp;<br>더보기<br>&nbsp;</b></div>'
            }
        ],
		itemTpl : '<tpl for="."><table width="100%">'+
			'<tr height="10%"><td align="center"><img src="{dealImg}" width="60%" height="80%"/></td></tr>'+
			'<tr><td>{content}</td></tr>'+
			'<tr style="background-color:#000000;color:#ffffff"><td>{regDate}</td>'+
			'</tr><table></tpl>',
    	items : [{
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
		        	 id : 'okBtn_1'
		         },
		         {
		        	 xtype : 'button',
		        	 text : '취소',
		        	 id : 'cancleBtn_1'
		         }
			]
    	}]
	}
});
