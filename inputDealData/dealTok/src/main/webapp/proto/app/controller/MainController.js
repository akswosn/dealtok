/**
 * Main Controller
 */
Ext.define('Rnx.controller.MainController',{
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			main : 'main',
			mainView: 'mainView',
			tokCt: 'tokCt',
			main_deal_Button: '#main_deal_Button',
			main_tolk_Button: '#main_tolk_Button',
			listTest: 'listTest',
			mainSubMenu : 'main #subMenu',
			myProfile : 'myProfile'
		},
		
		control: {
			main_deal_Button: {
				tap: 'goDealMain'
			},
			main_tolk_Button: {
				tap: 'goTolkMain'
			},
			'button[action="showMainSubMenu"]':{
				tap:function(){
					var subMenu = this.getMainSubMenu();
					if(subMenu.isHidden()){
						this.getMainSubMenu().show();
					}else{
						this.getMainSubMenu().hide();
					}
				}
			},
			
			'button[action="goHome"]':{
				tap:function(btn){
					
					// 홈으로 보내기..
					this.getMainView().pop(20);
				}
			},
			
			// Login
			'button[action="login"]':{
				tap:function(btn){
					
					var userSeq = btn.getParent().down('#userSeq').getValue();
					Rnx.app.setLoginUser(btn.getParent().getParent().getStore().getAt(userSeq).raw);
					
					if(!this.config.main){
						this.config.main = Ext.widget('main');
					}
					
					//Ext.Msg.alert("Login","성공적으로 로그인이 되었습니다.");
					Ext.Viewport.setActiveItem(this.getMain());
				}
			}
			//overlay show!!
			,'main #myProfile' :{
				tap : function(btn){
					if(!this.config.myProfile){
						this.config.myProfile = Ext.widget('myProfile');
					}
					
					this.getMyProfile().showBy(btn);
				}
			}
			//Logout
			, 'main #logout' : {
				tap : function(){
					Ext.Msg.alert("Logout","성공적으로 로그아웃 되었습니다.",function(){
						window.location.href='./index.html';
					});
					/*
					this.getMainView().reset(); //NavigationView 초기화
					Ext.Viewport.setActiveItem({xtype : 'login'});
					 * */
				}
			}
		}
	},
	
	//Deal List를 보여준다.
	goDealMain: function(list, idx, target, record) {
		
		if(!this.dealMain){
			this.dealMain = Ext.create('Rnx.view.deal.DealMain', {
				title : '상품 목록'
			});
		}
		
		var dealList = this.dealMain.down('#dealList');
		
		dealList.getStore().removeAll();
		dealList.getStore().load();
		this.getMainView().push(this.dealMain);
	},
	
	//In Tolk List를 보여준다.
	goTolkMain: function() {
		
		if(!this.tolkMain){
			this.tolkMain = Ext.widget('tokMain');
		}
		
		this.getMainView().push(this.tolkMain);
		//this.getMain().setActiveItem(tolkMain);
	}
	/*user 정보 스토리지에 저장
	, getUserInfo: function(userSeq){
		Ext.Ajax.request({
            url: Rnx.app.serverBaseUrl + '/rnxApi/user/login/' + userSeq,
            
            method : 'GET',
            success: function(response, opts) {
            	console.log(JSON.parse(response.responseText).user);
            }
		});
	}*/
	
	
});