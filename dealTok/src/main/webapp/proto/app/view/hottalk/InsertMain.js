/**
 * HOT TALK 입력 메인 Panel
 */


Ext.define("Rnx.view.hottalk.InsertMain" ,{
	extend : 'Ext.NavigationView',
	xtype : 'hotTalkInsertMain',
	fullscreen : true,
	//childPanel [Step1_xtype, Step2_xtype]
	childPanel : ['dealList',  'insertHotTalkMsg'],
	
	config : {
		layout : 'card',
		navigationBar : false
	},
	
	
	setChildInext : function(inx){
		this.childInext = idx;
	},
	
	getChildInext : function(){
		return this.childInext;
	},
	
	//화면 변경 Method
	setChildPanel : function(index){
		this.setItems({
			xtype : this.childPanel[index]
		});
	}
});
