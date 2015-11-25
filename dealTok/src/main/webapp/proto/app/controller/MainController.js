/**
 * Main Controller
 */
Ext.define('Rnx.controller.MainController',{
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			main : 'main',
			mainView: 'mainView',
			
			//intro Controller
			intro : 'intro',
			btn_join : 'intro #btn_join',
			btn_login : 'intro #btn_login',
			
			//가입 폼 Controller
			joinForm : 'joinForm',
			btn_joinform_reset : 'joinForm #btn_joinform_reset',
			btn_joinform_save : 'joinForm #btn_joinform_save',
			btn_joinform_idChk : 'joinForm #btn_joinform_idChk',
			 
			login : 'login',
			tokCt: 'tokCt',
			main_deal_Button: '#main_deal_Button',
			main_tolk_Button: '#main_tolk_Button',
			listTest: 'listTest',
			mainSubMenu : 'main #subMenu',
			profile : 'profile',
			myFriend : 'myFriend'
		},
		
		control: {
			'button[action="goIntro"]' : {
				tap : function(){
					Ext.Viewport.setActiveItem(-1, {type: 'slide', direction: 'left'});
				}
			},
			//join
			btn_join : {
				tap : 'goUserJoin'
			},
			btn_login : {
				tap : 'goUserLogin'
			},
			btn_joinform_reset : {
				tap : 'joinFormReset'
			},
			btn_joinform_save : {
				tap : 'joinFormSubmit'
			},
			btn_joinform_idChk : {
				tap : 'idCheck'
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
					var loginData = this.login.getValues(true, true);
					console.log(loginData);
					//로그인
					Ext.Ajax.request({
			            url: Rnx.app.serverBaseUrl + '/rnxApi/user/userLogin/',
			            
			            method : 'POST',
			            params : loginData,
			            success: function(response, opts) {
			            	var user = JSON.parse(response.responseText).user;
			            	if(user){
			            		Rnx.app.setLoginUser(user);
			            		
			            		if(!Rnx.controller.MainController.main){
			            			Rnx.controller.MainController.main = Ext.widget('main');
					    		}
								//Ext.Msg.alert("Login","성공적으로 로그인이 되었습니다.");
								Ext.Viewport.setActiveItem(Rnx.controller.MainController.main);
			            	}
			            	else {
			            		Ext.Msg.alert('Login', '로그인이 실패하였습니다.');
			            	}
			            },
			            failure : function(response, opts){
			            	Ext.Msg.alert('Login', '로그인이 실패하였습니다.');
			            }
					});
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
	//In Tolk List를 보여준다.
	goTolkMain: function() {
		
		if(!this.tolkMain){
			this.tolkMain = Ext.widget('tokMain');
		}
		
		this.getMainView().push(this.tolkMain);
		//this.getMain().setActiveItem(tolkMain);
	},
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
	// 로그인 창
	goUserLogin : function(){
		if(!this.login){
			this.login = Ext.create('Rnx.view.login.Login');
		}
		Ext.Viewport.setActiveItem(this.login);
	},
	//화원 가입 창 show
	goUserJoin : function(e){
		if(!this.joinForm){
			this.joinForm = Ext.create('Rnx.view.login.JoinForm');
		}
		//this.joinForm.show();
		Ext.Viewport.setActiveItem(this.joinForm);
	},
	//id 중복 check
	idCheck : function(e){
		var uid = this.joinForm.getValues(true, true).uid;
		
		if(!uid){
			Ext.Msg.alert('Join','아이디 입력후 실행해 주세요');
		}
		var form = this.joinForm;
		Ext.Ajax.request({
            url: Rnx.app.serverBaseUrl + '/rnxApi/user/idCheck/' + uid,
            method : 'POST',
            success: function(response, opts) {
            	console.log(response);
            	result = response.responseText;
            	if(result == 'true'){
            		Ext.Msg.alert('Join','사용 가능한 아이디 입니다.');
            		form.setValues({
            			isIdCheck : 'true'
            		});
            	}
            	else {
            		Ext.Msg.alert('Join','사용중인 아이디가 존재합니다.');
            		form.setValues({
            			isIdCheck : 'false'
            		});
            	}
            }
		});
		
	},
	//회원 폼 reset 
	joinFormReset : function(e){
		this.joinForm.reset();
	},
	joinFormSubmit : function(e){
		
		//var f = document.forms[1];	//이미지 전송 폼
		//console.log(f);
		//회원 가입 진행
		//입력 확인
		var formData = this.joinForm.getValues(true, true);
		
		//form 유효성 체크 1 (공백체크)
		if(!formData.uid){
			Ext.Msg.alert('Join','아이디를 입력해주세요');
		}
		else if(!formData.nickName){
			Ext.Msg.alert('Join','이름을 입력해주세요');
		}
		else if(!formData.passwd || !formData.passwdConfirm){
			Ext.Msg.alert('Join','비밀번호를 입력해주세요');
		}
		else {
			//form 유효성 체크 2
			if(formData.isIdCheck == 'false'){
				Ext.Msg.alert('Join','아이디 중복 체크 확인후 이용해주세요');
			}
			else if(formData.passwd != formData.passwdConfirm){
				Ext.Msg.alert('Join','입력하신 비밀번호가 다릅니다.');
			}
			else {
				//가입 실행
				Ext.getDom('joinForm').enctype = 'multipart/form-data';
				Ext.getDom('joinForm').target = 'hiddenFrame';
				var form = Ext.getCmp('joinForm');
				console.log(form.getValues().genderRadio);
				if(form.getValues().genderRadio == '1'){
					console.log('남자');
					form.setValues({
						gender : '1'
					});
				}else {
					console.log('여자');
					form.setValues({
						gender : '0'
					});
				}
				console.log(form.getValues().gender);
				
				var result = form.submit({
					url : Rnx.app.serverBaseUrl + '/rnxApi/user/userJoin/',
					waitMsg : 'wait ...',
					success: function(response, opts) {
						console.log(response.responseText);
					}
				});
				if(result){
					Ext.Msg.alert('Join','로그인후 이용해주세요', function(){
						//성공후 첫페이지로 이동
						window.location.href = './index.html';
					});
				}
			}
		}
	}
});