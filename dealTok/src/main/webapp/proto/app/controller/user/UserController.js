/**
 * User Controller
 */
Ext.define('Rnx.controller.user.UserController',{
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			mainView : 'mainView',
			myFriend : 'myFriend',
			friendSearchForm : 'friendSearchForm',
			friendSearchList : 'friendSearchList',
			friendSearch : 'friendSearch',
			btn_add_friend : 'friendSearchList #btn_add_friend',
			btn_cancle_friend : 'friendSearchList #btn_cancle_friend',
			btn_userSearch_submit : 'friendSearchForm #btn_userSearch_submit',
			friendSearchStore : 'friendSearchStore',
			profile : 'profile',
			profileUpdate : 'profileUpdate',
			btn_profile_ok : 'profile #btn_profile_ok',
			btn_profile_update : 'profile #btn_profile_update',
			btn_profileUpdate_ok : 'profileUpdate #btn_profileUpdate_ok',
			btn_profileUpdate_cancel : 'profileUpdate #btn_profileUpdate_cancel'
		},
		
		control: {
			'button[action="search_user"]' : {
				tap : 'onUserSearch'
			},
			btn_add_friend : {
				tap : 'addFriend'
			},
			btn_cancle_friend : {
				tap : function(){
					this.getMainView().pop(1);
				}
			},
			btn_profile_ok : {
				tap : function(){
					this.getMainView().pop(1);
				}
			},
			btn_profileUpdate_ok : {
				tap : function(){
					Ext.getCmp('userSeqHidden').setValue(Rnx.app.loginSeq);
					Ext.getDom('profileUpdate').enctype = 'multipart/form-data';
					Ext.getDom('profileUpdate').target = 'profileUpdateFrame';
					var form = Ext.getCmp('profileUpdate');
					var result = form.submit({
						url : Rnx.app.serverBaseUrl + '/rnxApi/user/profileUpdate/',
						waitMsg : 'wait ...',
						success: function(response, opts) {
							console.log(response.responseText);
						}
					});
					
					if(!this.profile){
						this.profile = Ext.create('Rnx.view.user.Profile',{
							title : '내 프로필'
						});
					}
					else {
						this.getMainView().remove(this.profile);
						this.profileStore.removeAll();
						this.profile.destroy();
						this.profile = Ext.create('Rnx.view.user.Profile',{
							title : '내 프로필'
						});
					}
					this.profile.add({
						xtype:'button',
						text : '수정',
						id : 'btn_profile_update',
						ui : 'confirm'
					});
					var mainNavView = this.getMainView();
					var profileView = this.profile;
					if(result){
						Ext.Msg.alert('Profile','수정 되었습니다', function(){
							mainNavView.pop(1);
							mainNavView.push(profileView);
						});
						//this.getMainView().pop(1);
						//this.getMainView().push(this.profile);
					}
				}
			},
			btn_profileUpdate_cancel : {
				tap : function(){
					this.getMainView().pop(1);
				}
			},
			btn_profile_update : {
				tap : function(){
					var profileData = Ext.getCmp('profile').getStore().getData().items[0].data;
					if(!this.profileUpdate){
						console.log('profileUpdate create!!!!');
						this.profileUpdate = Ext.create('Rnx.view.user.ProfileUpdate',{
							title : '내 프로필 수정'
						});
					}
					this.profileUpdate.profileObj = profileData;
					this.getMainView().push(this.profileUpdate);
				}
			},
			'main #myFriend' : {
				tap : function(){
					if(!this.myFriend){
						this.myFriend = Ext.create('Rnx.view.user.MyFriend');
					}
					this.getMainView().push(this.myFriend);
				}
			},
			'myFriend #searchMyFriend_field' : {
                keyup: 'onSearchKeyUp',
            	clearicontap : 'onSearchClearIconTap'
			},
			'button[action="friendSearchForm"]' : {
				tap : function(){
					if(!this.friendSearch){
						this.friendSearch = Ext.create('Rnx.view.user.FriendSearch');
					}
					this.getMainView().push(this.friendSearch);
				}
			},
			//overlay show!!
			'#myProfile' :{
				tap : function(btn){
					Rnx.app.setProfileSeq(Rnx.app.loginSeq);
					if(!this.profile){
						this.profile = Ext.create('Rnx.view.user.Profile',{
							title : '내 프로필'
						});
					}
					else {
						this.getMainView().remove(this.profile);
						this.profileStore.removeAll();
						this.profile.destroy();
						this.profile = Ext.create('Rnx.view.user.Profile',{
							title : '내 프로필'
						});
					}
					this.profile.add({
						xtype:'button',
						text : '수정',
						id : 'btn_profile_update',
						ui : 'confirm'
					});
					this.getMainView().push(this.profile);
				}
			},
			myFriend : {
				activate : function(){
					console.log(Ext.getCmp('myFriendList'));
					var myFriendList = Ext.getCmp('myFriendList');
					myFriendList.addListener( 'itemtap', this.friendProfile, this);
				}
			},
			profile : {
				initialize : function(list){
					var param = Rnx.app.profileSeq;
					if(!this.profileStore){
						this.profileStore = list.getStore();
					}
					this.profileStore.on("beforeload", 
						function(store, oper){
							store.getProxy().setUrl(Rnx.app.serverBaseUrl + '/rnxApi/user/profile/' + param);	
						}
					);
				},
				show : function(list){
					list.getStore().load();
				}
			},
			profileUpdate : {
				show : function(){
					Ext.getCmp('profileFormAge').setValue(this.profileUpdate.profileObj.age); 
					Ext.getCmp('profileU_nickName').setValue(this.profileUpdate.profileObj.nickname);
					Ext.getCmp('profileU_greeting').setValue(this.profileUpdate.profileObj.greeting);
				}
			}
		}
	},
	//친구 검색
	onUserSearch : function(){
		var data = this.getFriendSearchForm().getValues(true, true);
		
		if(!this.friendSearchList){
			this.friendSearchList = Ext.create('Rnx.view.user.FriendSearchList');
		}
		
		Ext.Ajax.request({
            url: Rnx.app.serverBaseUrl + '/rnxApi/user/friendSearch/',
            method : 'POST',
            params : {
            	nickName: data.nickName, 
            	uid: data.uid,
            	phone: data.phone, 
            	gender: data.gender, 
            	userSeq: Rnx.app.loginSeq
            },
            success: function(response, opts) {
            	var friendList = JSON.parse(response.responseText).friendSearch;
            	this.friendSearchStore = new Ext.data.Store({
					data: friendList
				});
            	
            	Ext.getCmp('friendSearchList').setStore(this.friendSearchStore);
            }
		});
		this.getMainView().push(this.friendSearchList);
	},
	addFriend : function(){
		var selectRecords = this.friendSearchList.getSelection();
		var userSeqList = '';
		console.log(selectRecords);
		console.log(selectRecords.length);
		
		if(selectRecords.length == 0){
			Ext.Msg.alert('친구선택후 이용해주세요');
		}
		else {
			//josn array create
			Ext.Array.each(selectRecords, function(user, idx, friendSearchList){
				if(idx > 0) {
					userSeqList += ',';
				}
				userSeqList += user.get('user_seq'); 
			});
			console.log(userSeqList);
			var chk;
			Ext.Ajax.request({
				url: Rnx.app.serverBaseUrl + '/rnxApi/user/addFriend/',
				method : 'POST',
				params : {
					myUserSeq : Rnx.app.loginSeq,
					userSeqList : userSeqList
				},
				success: function(response, opts) {
					console.log(response);
					chk = true;
				}
			});
			
			var interval = setInterval(function(){
				if(chk){
					clearInterval(interval);
				}
			}, 2000);
		}
		
		this.getMainView().pop(2);
	},
	//검색 관련 Function
	onSearchKeyUp: function(field) {
        var value = field.getValue();
        var store = this.myFriend.friendStore;
        
        store.clearFilter();

        if (value) {
            var searches = value.split(' '),
                regexps = [],
                i;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;

                regexps.push(new RegExp(searches[i], 'i'));
            }

            store.filter(function(record) {
                var matched = [];

                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i],
                        didMatch = record.get('nickName').match(search);

                    matched.push(didMatch);
                }

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    return matched[0];
                }
            });
        }
    },
	onSearchClearIconTap : function(){
		this.myFriend.friendStore.clearFilter();
	},
	friendProfile : function(obj, index, target, record, e, eOpts ){
		Rnx.app.setProfileSeq(record.getData().userSeq);
		console.log(Rnx.app.profileSeq);
		console.log(record.getData());
		var name = record.getData().nickName;
		if(!this.getProfile()){
			this.profile = Ext.create('Rnx.view.user.Profile',{
				title : name + '님 프로필'
			});
		}
		else {
			this.getMainView().remove(this.profile);
			this.profileStore.removeAll();
			this.profile.destroy();
			this.profile = Ext.create('Rnx.view.user.Profile',{
				title : name + '님 프로필'
			});
		}
		this.profile.add({
			html : '<div style="padding:15px;width:100%;text-align:center;background-color:#34862E;color:#fff;font-weight:bold;">내 친구<div>'
		});
		
		this.getMainView().push(this.profile);
	}

});
