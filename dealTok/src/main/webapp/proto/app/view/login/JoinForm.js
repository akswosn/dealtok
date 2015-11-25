/**
 *
 */

Ext.define('Rnx.view.login.JoinForm', {
	extend : 'Ext.form.FormPanel',
	xtype:'joinForm',
	config : {
		id : 'joinForm',
        standardSubmit: true,
        html : '<iframe name="hiddenFrame" border="0" width="0" height="0"></frame>',
        showAnimation: {
			type:'pop',
			duration : 500
		},
		autoScroll : true,
        items : [
		{
			 xtype: 'fieldset',
			 title: 'Deal Tok Join',
			 defaults: {
			     required: true,
			     labelAlign: 'left',
			     labelWidth: '40%'
			 }
		},{
			xtype: 'fieldset',
			width : '100%',
			defaults: {
				 required: true,
			     labelAlign: 'left',
			     labelWidth: '54%'
			 },
			 layout : {
				type : 'hbox'
			 },
			 items:[{
				    xtype: 'textfield',
				    name: 'uid',
				    label: 'ID',
				    flex : 4
				},{
					xtype : 'button',
					pack : 'center',
					html : '<span style="font-size:14px">중복<span>',
					id : 'btn_joinform_idChk',
					ui : 'round decline',
					width : '68px',
					height : '30px',
					margin : '7 7 0 0',
					//text : 'ID 중복 확인',
					flex : 1
			}]
		},{
			xtype: 'fieldset',
			width : '100%',
			defaults: {
				 required: true,
			     labelAlign: 'left',
			     labelWidth: '40%'
			 },
			 items : [{
					xtype: 'passwordfield',
		            name: 'passwd',
		            label: '비밀번호'
				},{
					xtype: 'passwordfield',
		            name: 'passwdConfirm',
		            label: '비밀번호확인'
				},{
					xtype: 'textfield',
		            name: 'nickName',
		            label: '이름(닉네임)'
				},{
		            xtype: 'numberfield',
		            name: 'phone',
		            label: '휴대폰번호'
		        },
		        {
	        		xtype : 'textfield',
	        		name : 'age',
	        		id : 'joinFormAge',
	        		label : '나이',
	        		value : '0',
	        		readOnly : true,
	        		listeners  : {
	        			focus : function(obj, e, eOpts){
	        				console.log(obj);
	        				console.log(e);
	        				console.log(eOpts);
	        				console.log(Ext.getCmp('agePicker'));
	        				//this.parent.parent.picker.show();
	        				Ext.getCmp('agePicker').show();
	        			}
	        		}
	            }]
		},{
			xtype: 'fieldset',
			title: '성별 ',
			defaults: {
			     required: true,
			     labelAlign: 'left',
			     labelWidth: '40%'
			},
			items : [{
				xtype : 'radiofield',
				id : 'genderMan',
				name : 'genderRadio',
				label : '남자',
				checked : true,
				value : '1',
				listeners : {
					check : function( obj, e, eOpts ){
						console.log(this);
						console.log(Ext.getCmp('genderValue'));
					}
				}
			},{
				xtype : 'radiofield',
				name : 'genderRadio',
				id : 'genderWoman',
				label : '여자',
				value : '0',
				listeners : {
					check : function( obj, e, eOpts ){
						console.log(this);
						console.log(Ext.getCmp('genderValue'));
					}
				}
			}]
			
		},{
			xtype: 'fieldset',
			defaults: {
			     required: true,
			     labelAlign: 'left',
			     labelWidth: '40%'
			},
			items : [{
				xtype : 'textfield',
	    		name : 'address',
	    		id : 'joinFormLocation',
	    		label : '지역',
	    		readOnly : true,
	    		listeners  : {
	    			focus : function(obj, e, eOpts){
	    				//this.parent.parent.picker.show();
	    				Ext.getCmp('locationPop').show();
	    			}
	    		}
			},{
	            xtype: 'textfield',
	            name: 'greeting',
	            label: '남기는말'
	        }]
		},{
			xtype : 'panel',
			html : '<b>프로필이미지</b> <input style="width:50%;" type="file" name="profileImg" id="profileImg"/>'
		},{
 			xtype: 'textfield',
 			id : 'genderValue',
 			name: 'gender',
 			readOnly : true
 		},{
 			xtype: 'hiddenfield',
 			name: 'isIdCheck',
 			value : 'false'
 		},{
			xtype: 'toolbar',
            docked: 'bottom',
            layout : {
            	type : 'hbox',
				pack : 'center'
            },
            items : [{
	               	 xtype: 'button',
	            	 text: 'Home',
	            	 ui: 'back decline',
	            	 action : 'goIntro'
	             },
                 {
                	 xtype: 'button',
                     text: 'Reset',
                     id : 'btn_joinform_reset'
                 },
                 {
                	 xtype: 'button',
                     text: 'Save',
                     ui: 'confirm',
                     id : 'btn_joinform_save'
                 }
            ]
		}],
		agePicker : null,
		locationPopup : null
	},
	initialize : function(){
		this.agePicker = Ext.create('Ext.Picker', {
			id : 'agePicker',
			cancelButton : false,
			hidden : true,
		    toolbar: {
		        title: '나이'
		    },
		    slots: [
		        {
		            name : 'age',
		            title : '나이를 입력하세요',
		            data : [
		                {text: '비공개', value: '0'}
		                ,{text: '10대', value: '10'}
		                ,{text: '20대', value: '20'}
		                ,{text: '30대', value: '30'}
		                ,{text: '40대', value: '40'}
		                ,{text: '50대', value: '50'}
		                ,{text: '60대', value: '60'}
		                ,{text: '----', value: null}
		           ]
		        }
		    ],
		    listeners : {
		    	pick : function( obj, The, slot, eOpts ){
					console.log(The.age);
					console.log(Ext.getCmp('joinForm'));
					Ext.getCmp('joinFormAge').setValue( The.age );
				}
		    }
		});
		Ext.Viewport.add(this.agePicker);
		this.locationPopup = Ext.create('Ext.form.Panel', {
			id : 'locationPop',
			centered : true,
			fullscreen: true,
            modal:true,
            hidden : true,
            hideOnMaskTap:true,
			width : '80%',
			height : '80%',
			items : [{
				xtype : 'toolbar',
				title : '활동지역',
				docked: 'top'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '서울',
				value : '서울'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '강남',
				value : '강남'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '서초',
				value : '서초'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '중구',
				value : '중구'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '종로',
				value : '종로'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '마포',
				value : '마포'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '강북/중량/노원/도봉',
				value : '강북,중량,노원,도봉'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '동대문/성북/성동',
				value : '동대문,성북,성동'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '용산/서대문/은평',
				value : '용산,서대문,은평'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '영등포/동작',
				value : '영등포,동작'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '관악/강서',
				value : '관악,강서'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '강동/광진',
				value : '강동,광진'
			},{
				xtype : 'radiofield',
				name : 'location',
				label : '구로/금천/양천',
				value : '구로,금천,양천'
			},{
				xtype : 'toolbar',
				docked: 'bottom',
				layout : {
	            	type : 'hbox',
					pack : 'center'
	            },
				items : [{
	               	 xtype: 'button',
	                 text: '확인',
	                 handler : function(){
	                	 console.log(this.parent.parent.getValues());
	                	 Ext.getCmp('joinFormLocation').setValue(this.parent.parent.getValues().location);
	                	 this.parent.parent.hide();
	                 }
	             },
	             {
	            	 xtype: 'button',
	                 text: '취소',
	                 ui: 'confirm',
	                 handler : function(){
	                	 this.parent.parent.hide();
	                 }
	             }]
			}]
		});
	}
});
