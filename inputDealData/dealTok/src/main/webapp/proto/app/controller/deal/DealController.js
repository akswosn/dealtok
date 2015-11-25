/**
 * Deal Controller
 */
Ext.define('Rnx.controller.deal.DealController', {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			mainView: 'mainView',
			dealList: 'dealList',
			dealDetail: 'dealDetail',
			friendList: 'friendList',
			dealMessage: 'dealMessage',
			msg_send_button: 'dealMessage #msg_send_button',
			searchDealList: 'searchDealList',
			searchCategory: 'searchCategory',
			searchArea: 'searchArea',
			searchShop: 'searchShop',
			friendStore: 'friendStore',
			
			//button
			btn_DealDetail_DealTok: 'dealDetail #btn_DealDetail_DealTok',
			btn_DealDetail_Detail: 'dealDetail #btn_DealDetail_Detail',
			btn_DealDetail_Review: 'dealDetail #btn_DealDetail_Review',
			btn_DealDetail_Shared: 'dealDetail #btn_DealDetail_Shared',
			btn_DealDetail_Map: 'dealDetail #btn_DealDetail_Map',
			btn_SearchToolBar_All: 'searchToolBar #btn_SearchToolBar_All',
			btn_SearchToolBar_Category: 'searchToolBar #btn_SearchToolBar_Category',
			btn_SearchToolBar_Area: 'searchToolBar #btn_SearchToolBar_Area',
			btn_SearchToolBar_Shop: 'searchToolBar #btn_SearchToolBar_Shop',
			btn_DealMessage_Send: 'dealMessage #btn_DealMessage_Send',
			btn_SearchCategory_Confirm: 'searchCategory #btn_SearchCategory_Confirm',
			btn_SearchCategory_Cancel: 'searchCategory #btn_SearchCategory_Cancel',
			btn_SearchArea_Confirm: 'searchArea #btn_SearchArea_Confirm',
			btn_SearchArea_Cancel: 'searchArea #btn_SearchArea_Cancel',
			btn_SearchShop_Confirm: 'searchShop #btn_SearchShop_Confirm',
			btn_SearchShop_Cancel: 'searchShop #btn_SearchShop_Cancel',
			btn_FriendList_Reset: 'friendList #btn_FriendList_Reset',
			btn_FriendList_Complete: 'friendList #btn_FriendList_Complete',
			btn_Shared_Twitter : '#btn_Shared_Twitter',
			btn_Shared_Facebook : '#btn_Shared_Facebook'
			
		},
		
		control: {
			dealList: {
				
				// dealList store load 추가
				initialize:function(list){
					if(!this.dealStore){
						this.dealStore = list.getStore();
						this.dealStore.on("beforeload", 
							function(store, oper){
								store.getProxy().setUrl(Rnx.app.serverBaseUrl + '/rnxApi/deal/dealList' + '/' + store.getCount() + '/' + 5);	
							}
						);
					}
				},
				show : function(list){
					this.dealStore.load();
				},
				itemtap: 'onDealSelect'
			},
			
			searchDealList: {
				
				// dealList store load 추가
				initialize:function(list){
					if(!this.searchDealStore){
						console.log('searchDealList initialize'),
						this.searchDealStore = list.getStore();
						this.searchDealStore.on("beforeload", 
							function(store, oper){
								if(list.baseURL != 'N'){
									store.getProxy().setUrl(list.baseURL + store.getCount() + '/' + 5);	
								}	
							}
						);
					}
				},
				show : function(list){
					console.log('searchDealList show'),
					this.searchDealStore.load();
				},
				itemtap: 'onDealSelect'
			},
			
			btn_DealDetail_DealTok: {
				tap: 'onFriendList'
			},
			btn_DealMessage_Send: {
				tap: 'sendMsg'
			},
			btn_DealDetail_Detail : {
				tap: 'onDetailBtn'
			},
			btn_DealDetail_Review : {
				tap: 'onReviewBtn'
			},
			btn_DealDetail_Shared : {
				tap: 'onSharedBtn'
			},
			btn_DealDetail_Map : {
				tap: 'onMapBtn'
			},
			btn_SearchToolBar_Category: {
				tap: 'onSearchCategory'
			},
			btn_SearchToolBar_Area: {
				tap: 'onSearchArea'
			},
			btn_SearchToolBar_Shop: {
				tap: 'onSearchShop'
			},
			btn_SearchCategory_Cancel: {
				tap: 'onBack'
			},
			btn_SearchArea_Cancel: {
				tap: 'onBack'
			},
			btn_SearchShop_Cancel: {
				tap: 'onBack'
			},
			btn_SearchCategory_Confirm: {
				tap: 'onCategoryList'
			},
			btn_SearchArea_Confirm: {
				tap: 'onAreaList'
			},
			btn_SearchShop_Confirm: {
				tap: 'onShopList'
			},
			'button[action="btn_FriendList_Complete"]': {
				tap:'onFriendSelect'
			},
			'button[action="btn_FriendList_Reset"]': {
				tap:'deSelectFriend'
			},
			btn_Shared_Facebook: {
				tap: 'onSharedFacebook'
			},
			btn_Shared_Twitter: {
				tap: 'onSharedTwitter'
			}
		}
	},
	
	//선택한 Deal 상세화면을 보여준다.
	onDealSelect: function(list, index, node, record) {
		
		if(!this.dealDetail) {
			this.dealDetail = Ext.create('Rnx.view.deal.DealDetail');
		}
		this.dealDetail.latitude = record.get('latitude');
		this.dealDetail.longitude = record.get('longitude');
		
		
		this.dealDetail.config.dealDid =  record.get('did');
		this.dealDetail.setRecord(record);
		this.getMainView().push(this.dealDetail);
	},
	
	//Deal Tolk 친구 선택 화면을 보여준다.
	onFriendList: function() {
		Ext.Ajax.request({
			url: Rnx.app.serverBaseUrl + '/rnxApi/deal/friendList/' + Rnx.app.loginSeq,
			success: function(response, opts) {
				var JsonData = JSON.parse(response.responseText);
				this.friendStore = new Ext.data.Store({
					data: JsonData.list
				});
				
				Ext.getCmp('friendList').setStore(this.friendStore);
			}
		});
		
		if(!this.friendList) {
			this.friendList = Ext.create('Rnx.view.deal.FriendList');
		}
		
		this.getMainView().push(this.friendList);
	},
	
	//선택한 Friend에게 보낼 메세지 작성화면을 보여준다.
	onFriendSelect: function() {
		
		var selectRecords = this.friendList.getSelection();
		var friends_seq = "";
		var friends_name = "";
		Ext.Array.each(selectRecords, function(friend, idx, friendList){
			if(idx > 0) {
				friends_seq += ',';
				friends_name += ',';
			}
			friends_seq += friend.get('friend_seq'); 
			friends_name += friend.get('nickname');
		});
		
		this.dealMessage = Ext.create('Rnx.view.deal.DealMessage', {
			listeners:{
				deactivate:function(form){
					form.destroy();
				}
			}
		});
		
		this.dealMessage.config.friend_seq = friends_seq;
		this.dealMessage.setRecord(friends_name);
		Ext.getCmp('msgBody').setTitle(friends_name+'에게..');
		this.getMainView().push(this.dealMessage);
		
	},
	
	//친구목록 초기화
	deSelectFriend: function() {
		this.friendList.deselectAll();
	},
	
	//메세지를 보내고 Deal 상세화면을 보여준다.
	sendMsg: function() {
		
		Ext.Msg.confirm('확인','메세지를 보내겠습니까?', function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
					url: Rnx.app.serverBaseUrl + '/rnxApi/deal/sendMsg/' + Rnx.app.loginSeq + '/' 
					+ this.dealMessage.config.friend_seq + '/' + this.dealDetail.config.dealDid + '/' + Ext.getCmp("deal_msg").getValue(),
					scope:this,
					success: function(response, opts) {
						Ext.Msg.alert('성공','메세지를 보냈습니다.');
						this.getMainView().pop(2);
					},
					failure: function(response, opts) {
						Ext.Msg.alert('성공','메세지를 보내는데 실패했습니다.');
					}
				});	
			}
			
		}, this);
	},
	
	//Deal Detail 상세보기
	onDetailBtn : function(e){
		var link = this.dealDetail.getRecord().get('link')
		window.open('moveToCommerce.jsp?link='+escape(link),'new','scrollbars=yes,toolbar=yes,resizable=yes');
	},
	onReviewBtn : function(){
		var title = this.dealDetail.getRecord().get('title');
		window.open('http://cafeblog.search.naver.com/search.naver?where=post&sm=tab_jum&ie=utf8&query='+title,'new','scrollbars=yes,toolbar=yes,resizable=yes');
	},
	onSharedBtn : function(e){
		console.log(this.dealDetail.sharedPopup);
		this.dealDetail.sharedPopup.showBy(e);
	},
	onMapBtn : function(btn){
		if(this.dealDetail.map.getHidden()){
			btn.setText('지도닫기');
			this.dealDetail.map.setHidden(false);
		}
		else {
			btn.setText('지도보기');
			this.dealDetail.map.setHidden(true);
		}
	},
	onSharedFacebook : function(e){
		var link = this.dealDetail.getRecord().get('link');
		var title = this.dealDetail.getRecord().get('title');
		var dealImg = this.dealDetail.getRecord().get('dealImg');
		var url = 'http://www.facebook.com/share.php?s=100&p[url]='+encodeURIComponent(link)
			+'&p[images][0]='+encodeURIComponent(dealImg)
			+'&p[title]='+encodeURIComponent('DealTok ' + title);
		window.open(url, 'facebook', 'new', 'scrollbars=yes,toolbar=yes,resizable=yes');
	},
	onSharedTwitter : function(e){
		var link = this.dealDetail.getRecord().get('link');
		var title = this.dealDetail.getRecord().get('title');
		var url = 'https://twitter.com/share?url='+encodeURIComponent(link) 
			+ '&text='+ encodeURIComponent('DealTok '+title, 'new', 'scrollbars=yes,toolbar=yes,resizable=yes');
		
		window.open(url, 'twitter');
	},
	//Category 검색화면을 보여준다.
	onSearchCategory : function(list, index, node, record){
		if(!this.searchCategory){
			this.searchCategory = Ext.create('Rnx.view.deal.SearchCategory', {
				title : '카테고리 검색'
			});	
		}
		
		this.getMainView().push(this.searchCategory);
	},
	//지역 검색화면을 보여준다.
	onSearchArea : function(list, index, node, record){
		if(!this.searchArea){
			this.searchArea = Ext.create('Rnx.view.deal.SearchArea', {
				title : '지역 검색'
			});	
		}
		
		this.getMainView().push(this.searchArea);
	},
	//판매처 검색화면을 보여준다.
	onSearchShop : function(list, index, node, record){
		if(!this.searchShop){
			this.searchShop = Ext.create('Rnx.view.deal.SearchShop', {
				title : '판매처 검색'
			});	
		}
		this.getMainView().push(this.searchShop);
	},
	
	//back
	onBack : function(){
		this.getMainView().pop(1);
	},
	
	//카테고리 목록화면을 보여준다.				
	onCategoryList : function(list, idx, target, record) {
		var formValues = this.searchCategory.getValues();
		
		if(!this.searchDealMain) {
			this.searchDealMain = Ext.create('Rnx.view.deal.SearchDealMain');
		}
		
		var searchDealList = this.searchDealMain.down('#searchDealList');
		
		this.getSearchDealList().baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/searchDealList/'
			+formValues.health+'/'+formValues.culture+'/'+formValues.education+'/'
			+formValues.food+'/'+formValues.online+'/'+formValues.life+'/'+formValues.travel+'/'
			+formValues.event+'/'+formValues.party + '/';
			
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		
		if(!this.searchDealMain){
			this.searchDealMain = Ext.create('Rnx.view.deal.SearchDealMain', {
				title : '카테고리 목록'
			});
		}
		
		this.getMainView().push(this.searchDealMain);
	},
	//지역 목록화면을 보여준다.
	onAreaList : function() {
		var formValues = this.searchArea.getValues();
		
		if(!this.searchDealMain) {
			this.searchDealMain = Ext.create('Rnx.view.deal.SearchDealMain');
		}
		
		var searchDealList = this.searchDealMain.down('#searchDealList');
		
		this.getSearchDealList().baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/searchDealList/'
			+formValues.gangwon+'/'+formValues.gyeonggi+'/'+formValues.gyeongnam+'/'+formValues.gyeongbuk+'/'
			+formValues.gwangju+'/'+formValues.daegu+'/'+formValues.daejeon+'/'+formValues.busan+'/'
			+formValues.seoul+'/'+formValues.ulsan+'/'+formValues.incheon+'/'+formValues.jeonnam+'/'
			+formValues.jeonbuk+'/'+formValues.jeju+'/'+formValues.chungnam+'/'+formValues.chungbuk+'/';
		
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		
		if(!this.searchDealMain){
			this.searchDealMain = Ext.create('Rnx.view.deal.SearchDealMain', {
				title : '지역 목록'
			});
		}
		
		this.getMainView().push(this.searchDealMain);
	},
	//판매처 목록화면을 보여준다.
	onShopList : function() {
		var formValues = this.searchShop.getValues();
		
		if(!this.searchDealMain) {
			this.searchDealMain = Ext.create('Rnx.view.deal.SearchDealMain');
		}
		
		var searchDealList = this.searchDealMain.down('#searchDealList');
		
		this.getSearchDealList().baseURL = Rnx.app.serverBaseUrl + '/rnxApi/deal/searchDealList/'
			+formValues.groupon+'/'+formValues.wemakeprice+'/'+formValues.ticketmonster+'/';
			
		searchDealList.getStore().removeAll();
		searchDealList.getStore().load();
		
		if(!this.searchDealMain){
			this.searchDealMain = Ext.create('Rnx.view.deal.SearchDealMain', {
				title : '판매처 목록'
			});
		}
	}
});
	