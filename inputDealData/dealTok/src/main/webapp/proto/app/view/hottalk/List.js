/**
 * HOT TALK List Panel
 */

Ext.define("Rnx.view.hottalk.List" ,{
	extend : 'Ext.List',
	xtype : 'hotTalkList',
	fullscreen : true,
	config : {
		
		layout : {
			type : 'vbox',
			align : 'middle'
		},
		showAnimation : 'pop',
		store : 'hotTalkListStore',
		/*
		plugins: [
		          //{ xclass: 'Ext.plugin.ListPaging' },
                  { xclass: 'Ext.plugin.PullRefresh' }
        ],
		 * */
		itemTpl : '',
    	items : [
    	     {
    	    	 xtype : 'panel',
    	    	 
    	    	 docked : 'top',
      	 		 layout : {
    				type : 'vbox',
    				align : 'middle'
    			 },
    	    	 items : [
    	    	 {html : 'HOT TALK'}
    	    	 ,{
    	    		xtype : 'button',
					id : 'moveToInsert',
					width : '80%',
					text : '+',
					ui : 'confirm'
    	    	 }]
    	     }
    	    
    	     /*
			{
				html : 'HOT TALK',
				height : '30px'
			},
			{
				xtype : 'button',
				id : 'moveToInsert',
				width : '80%',
				text : '+'
			}
    	      * */
    	]
	}
});
