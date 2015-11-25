/**
 * 
 */
 
Ext.define('Rnx.controller.tok.Tok', {
	extend: 'Rnx.controller.tok.Main',
	
	config : {
		refs : {
			tokList : 'tokMainTab #tokListTap',
			sendTokBtn : 'button[action="sendTok"]',
			tokDetail : 'tokDetailCt'
		},	
		control : {
			
			tokList : {
				itemtap : 'showTokDetail',
				activate:function(list){
					
					list.getStore().getProxy()._url = Rnx.app.serverBaseUrl + '/rnxApi/tok/tokGroupList/' + Rnx.app.loginSeq;
					
					list.getStore().load();
					
					console.log(list.getStore().getProxy()._url);
				}
			},
			
			sendTokBtn : {
				tap : function(btn){
					var cdate = Ext.util.Format.date(new Date(), 'Y/m/d H:i');
					
					var loginUser = Rnx.app.getLoginUser();
					
					var tokForm = btn.getParent();
					
					var msgField = tokForm.down('#tokMsgField');
					
					var msg = msgField.getValue();
					
					var data = {
						profileImg : loginUser.userImg,
						nickName : loginUser.nickName,
						userSeq : Rnx.app.loginSeq,
						message : msg,
						createTime : cdate
					}
					
					var socket = Rnx.app.tokSocket;
					
					socket.emit('chatMsg', data);
					
					msgField.setValue('');
					
					//console.log(data);
				}
			},
			
			tokDetail :{
				activate: 'detailActive',
				deactivate: 'detailDeActive'
			},
			
			'button[action="toggleDetailInfo"]':{
				tap:'toggleDetailInfo'
			}
		}
	},
	
	showTokDetail:function(list, idx, target, record){
			
			var nickName = record.get('nickName');
			var tokGrpId = record.get('tokGroupId');
			var dealImg  = record.get('dealImg');
			var dealSummary = record.get('dealSummary');
			console.log(record);
			var loginUser = Rnx.app.getLoginUser();
			
			if(!this.getTokDetail()){
				this.config.tokDetail = Ext.widget('tokDetailCt');
				
				this.getTokDetail().down('#tokList')._itemTpl =
					Ext.create('Ext.XTemplate',
							'<div>',
							'	<tpl if="userSeq == \'' + loginUser.userSeq + '\'">',
							'		<p class="triangle-right right"><span class="nickname">{nickName} :</span> {message}</p>',
							'		<img class="tok-img-owner" src="resources/images/headshots/{profileImg}" />',
							'		<p class="cdate">{createTime}</p>',
							'	</tpl>',
							'	<tpl if="userSeq != \'' + loginUser.userSeq + '\'">',
							'		<img class="tok-img-other" src="resources/images/headshots/{profileImg}" />',
							'		<p class="triangle-right left"><span class="nickname">{nickName} :</span> {message}</p>',
							'		<p class="cdate other">{createTime}</p>',
							'	</tpl>',
							'</div>');
				
				console.log(this.getTokDetail().down('#tokList'));
				
				/*var tokList = this.getTokDetail().down('#tokList');
				var store = tokList.getStore();
				var tokDetail = this.getTokDetail();
				
				store.on('load', function(){
					tokDetail.unmask();
				});*/
			}
			
			/*this.getTokDetail().mask({
				xtype:'loadmask',
				message:''
			});*/
			
			var tokList = this.getTokDetail().down('#tokList'); 
			var store = tokList.getStore();
			
			store.getProxy()._url = Rnx.app.serverBaseUrl + '/rnxApi/tok/tokList/' + tokGrpId;
			store.load();
			
			this.getTokDetail().setTitle(nickName);
			this.getTokDetail().setTokItem(record.data);
			
			var dealItem = this.getTokDetail().down('#dealDetail #dealItem');
			dealItem.setHtml(
					'<table><tr height="30px"><td rowspan="4" width="200px"><img width="200px" height="120px" src="'+ dealImg +'"/></td>'
					+ '<td colspan="2">'+record.get('title')+'</td></tr>'
					+'<tr height="30px"><td width="200px">원가격</td><td align="right" width="100px">할인가격</td></tr>'
					+'<tr height="30px"><td style="color:#999999">'+record.get('price_original')+'%</td><td align="right">'
					+ '<span style="color:red">[ '+record.get('sale_percent')+'% ]</span> '+record.get('price_now')+'</td></tr>'
					+ '<tr ><td colspan="2"> 지역 : '+record.get('addr')+'</td></tr></table>'
			);
			
			
			if(!this.userStore){
				var userImgPanel = this.getTokDetail().down('#userImgPanel');
				this.userStore = Ext.create('Ext.data.Store', {
					fields : ['userSeq','nickName','profileImg'],
					
					proxy:{
						type:'ajax',
						url : ' ',
						reader:{
							type:'json',
							rootProperty:'users'
						}
					},
					
					autoLoad:false,
					
					listeners:{
						load:function(store, records){
							Ext.Array.each(records, function(data, idx){
								if(idx == 0){
									userImgPanel.removeAll();
									console.log('removeAll');
								}
								userImgPanel.add(
									/*Ext.create('Ext.Img',{
										src:'resources/images/headshots/' + data.get('profileImg'),
										width:70,
										height:70
									})*/
									/*{
										xtype:'image',
										src : 'resources/images/headshots/' + data.get('profileImg'),
										width:70,
										height:70
									}*/
									{
										html:'<img src="resources/images/headshots/' + data.get('profileImg') + '" width="70" height="70"/>&nbsp;'
									}
								);
								
								console.log(userImgPanel);
							});
						}
					}
				});
			}
			
			this.userStore.getProxy()._url = Rnx.app.serverBaseUrl + '/rnxApi/tok/tokUserList/' + tokGrpId;
			this.userStore.load();
			
			
			console.log(this.getTokDetail().getTitle());
			
			this.showDetailView(this.getTokDetail());
	},
	
	detailActive : function(tokDetail){
		var socket = Rnx.app.tokSocket;
		var tokGroupId = tokDetail.getTokItem().tokGroupId;
		
		console.log('Join tokGroupId : ' + tokGroupId);
		
		socket.emit('joinChat', tokGroupId);
		
		if(!this.chatOn){
			this.chatOn = true;
			
			var chatMsg = this.chatMsg;
			
			socket.on('chatMsg', function(data, callback){
				
				chatMsg(tokDetail, data);
			});
			
		}
	},
	
	chatMsg : function(tokDetail, data){
		var list = tokDetail.down('#tokList');
				
		var store = list.getStore();
		
		//store.add(data);
		
		store.insert(0, data);
		
		//var msgField = this.getTokDetail().getBottom();
		
		var scroll = tokDetail.getScrollable();
		//scroll.getScroller().scrollToEnd();
		scroll.getScroller().scrollTo(0,0);
	},
	
	detailDeActive : function(tokDetail){
		var socket = Rnx.app.tokSocket;
		var chatGroupId = tokDetail.getTokItem().chatGroupId;
		
		var list = tokDetail.down('#tokList');
		list.getStore().removeAll(false);
		
		socket.emit('leaveChat', chatGroupId);
	},
	
	toggleDetailInfo:function(btn){
		var dealDetail = btn.getParent().down('#dealDetail');
		
		if(dealDetail.isHidden()){
			dealDetail.show();
		}else{
			dealDetail.hide();
		}
	}
}); 