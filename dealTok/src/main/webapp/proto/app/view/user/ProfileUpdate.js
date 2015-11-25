/**
 * 
 */
 
Ext.define('Rnx.view.user.ProfileUpdate', {
	extend : 'Ext.form.FormPanel',
	
	xtype:'profileUpdate',
	config : {
		id : 'profileUpdate',
		standardSubmit: true,
		showAnimation: {
			type:'pop',
			duration : 500
		},
		html : '<iframe name="profileUpdateFrame" border="0" width="0" height="0"></frame>',
		items : [{
			 xtype: 'fieldset',
			 title: 'Profile Update',
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
		     labelWidth: '40%'
		 },
		 items : [{
				xtype: 'textfield',
	            name: 'nickName',
	            label: '닉네임',
	            id : 'profileU_nickName'
			},{
				xtype: 'textfield',
	            name: 'greeting',
	            label: '인삿말',
	            id : 'profileU_greeting'
			},{
        		xtype : 'textfield',
        		name : 'age',
        		id : 'profileFormAge',
        		label : '나이',
        		readOnly : true,
        		listeners  : {
        			focus : function(obj, e, eOpts){
        				Ext.getCmp('ageUpdatePicker').show();
        			}
        		}
            },{
    			xtype : 'panel',
    			html : '<b>프로필이미지</b><br/>'+
    				   '<img width="80%" height="120px" src="'+Rnx.app.serverBaseUrl+'/proto/resources/images/headshots/{profile_img}"/>'+
    				   '<input style="width:50%;" type="file" name="userImg" id="userImg"/>'
    		},{
     			xtype: 'textfield',
     			id : 'userSeqHidden',
     			name: 'userSeq',
     			readOnly : true
     		}]},{
			xtype : 'toolbar',
			docked: 'bottom',
			layout : {
				 type: 'hbox',
				 pack : 'middle'
			},
			items : [{
				text : '수정',
				id : 'btn_profileUpdate_ok',
				ui : 'confirm'
			},{
				text : '취소',
				id : 'btn_profileUpdate_cancel',
				ui : 'confirm'
			}]
		}],
		profileObj : null
	},
	initialize : function(){
		this.ageUpdatePicker = Ext.create('Ext.Picker', {
			id : 'ageUpdatePicker',
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
		                {text: '비공개', value: 0}
		                ,{text: '10대', value: 10}
		                ,{text: '20대', value: 20}
		                ,{text: '30대', value: 30}
		                ,{text: '40대', value: 40}
		                ,{text: '50대', value: 50}
		                ,{text: '60대', value: 60}
		                ,{text: '----', value: null}
		           ]
		        }
		    ],
		    listeners : {
		    	pick : function( obj, The, slot, eOpts ){
					Ext.getCmp('profileFormAge').setValue(The.age);
				}
		    }
		});
		Ext.Viewport.add(this.ageUpdatePicker);
	}
});