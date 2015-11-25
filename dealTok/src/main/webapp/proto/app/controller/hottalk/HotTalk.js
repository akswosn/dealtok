/**
 * Hot Talk List Model 
 */

Ext.define('Rnx.controller.hottalk.HotTalk', {
	extend: 'Ext.app.Controller',
	
	config : {
		
		refs : {
			/* Nav 리스트, 등록  Panel 선언*/
			//mainNav : 'hotTalkMain',
			mainNav: 'mainView',
			mainView : 'hotTalkList',
			insertStep1 : 'hotTalkDealList',
			insertStep2 : 'insertHotTalkMsg',
			/* end 리스트, 등록  Panel*/
			insertBtn : 'hotTalkList #moveToInsert',
			step1_ok : 'hotTalkDealList #okBtn_1',
			step1_cancle : 'hotTalkDealList #cancleBtn_1',
			step2_ok : 'insertHotTalkMsg #okBtn_2',
			step2_cancle : 'insertHotTalkMsg #cancleBtn_2'
		},
		
		control : {
			/* hot talk Load*/
			mainView :{
				initialize:function(list){
					if(!this.hotTalkStore){
						this.hotTalkStore = list.getStore();
					}
					var listItemTpl = '<div><tpl for=".">'+
						'<tpl if="userSeq == '+Rnx.app.loginSeq+'"><table width="100%" style="border:2px solid #ffb0cf;background-color:#ffb0cf">'+
						'<tpl else><table width="100%"></tpl>'+
						'<tr height="20%"><td width="30%" rowspan="3"><img src="resources/images/headshots/{userImg}" width="100" height="70"/></td>'+
						'<td width="70%"><b>{userName}</b></td></tr>'+
						'<tr height="60%"><td valign="middle"><span>{content}<span></td></tr>'+
						'<tr><td align="right" valign="bottom">{regDate}</td></tr>'+
						'<tr><td colspan="2" style="background:#000000;color:#ffffff">'+
						'<b>{dealContent}<b></td></tr>'+
						'<table></tpl><div>';
					list.setItemTpl(listItemTpl);
					
					
				},
				// de
				show : function(){
					this.hotTalkStore.load();
				}
			},
			//hot talkList -> insert 이동 이벤트
			insertBtn : {
				tap : function(){
					
					var afterPanel;
					if(this.getInsertStep1() == null){
						afterPanel = Ext.create('Rnx.view.hottalk.DealList');
					}
					else {
						afterPanel = this.getInsertStep1();
					}
					this.getMainNav().push(afterPanel);
				}
			},
			
			
			insertStep1 : {
				initialize:function(list){
					// dealList store load 추가
					if(!this.dealStore){
						this.hotDealStore = list.getStore();
						this.hotDealStore.on("beforeload", 
							function(store, oper){
								if(list.baseURL != 'N'){
									store.getProxy().setUrl(Rnx.app.serverBaseUrl + '/rnxApi/deal/hotDeal/latest/' + store.getCount() + '/' + 5);	
								}	
							}
						);
					}
				},
				show : function(){
					this.hotDealStore.load();
				},
				itemtap : function(list, index, target, record){
					this.getInsertStep1().paramDealId = record.data.did;
				}
			},
			//step1 OK Button (Step2 ..)
			step1_ok : {
				tap : function(){
					var afterPanel;
					if(this.getInsertStep2() == null){
						afterPanel = Ext.create('Rnx.view.hottalk.InsertMsg');
					}
					else {
						afterPanel = this.getInsertStep2();
					}
					
					//Deal 선택 Check
					if(this.getInsertStep1().paramDealId == ''){
						Ext.Msg.alert("Deal을 선택하여 주십시오.");
					}
					else {
						this.getMainNav().push(afterPanel);
					}
				}
			},
			//step1 Cancle Button (hot talk list)
			step1_cancle : {
				tap : function(){
					this.getMainNav().pop();
				}
			},
			insertStep2 :{
				show : function(){
					//deal no 값 세팅
					this.getInsertStep2().paramDealId = this.getInsertStep1().paramDealId;
				}
			},
			//step2 OK Button (INSERT!!!!)
			step2_ok : {
				tap : function(){
					//서버 전달 DATA LOG
					console.log("form [dealId] : "+this.getInsertStep1().paramDealId);
					console.log("form [content] : "+Ext.getCmp('hotContent').getValue());
					
					var dealId = this.getInsertStep1().paramDealId;
					var content = Ext.getCmp('hotContent').getValue();
					var mainNav = this.getMainNav();
					var mainView = this.getMainView();
					var userSeq = Rnx.app.loginSeq;
					
					
					if(Ext.getCmp('hotContent').getValue() == null || Ext.getCmp('hotContent').getValue() == ''){
						Ext.Msg.alert("내용을 작성하여 주십시오.");
					}
					else {
						
						Ext.Ajax.request({
							/* 상용 */
	                        url: Rnx.app.serverBaseUrl + '/rnxApi/hottok/insertHotTalk/',
	                        
	                        /* local
	                        url: 'http://112.220.201.202:58081/dealTok/rnxApi/hottok/insertHotTalk/',
	                         * */
	                        method : 'POST',
	                        params : {
	                        	userSeq : userSeq,
	                        	dealId : dealId,
	                        	content : content
	                        },
	                        success: function(response, opts) {
                        		Ext.Msg.alert("Hot Talk 등록", "등록이 완료되었습니다.",function(){
                    				mainNav.pop(2);
                    				mainView.getStore().load();
                        		});                      
	                        }
	                    });
						
					}
				}
			},
			//step2 Cancle Button (hot talk list)
			step2_cancle : {
				tap : function(){
					this.getMainNav().pop(2);
				}
			}
			
			
		}
	}
}); 