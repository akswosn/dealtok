/**
 * 
 */
Ext.define('Rnx.view.user.FriendSearchForm', {
	extend : 'Ext.form.FormPanel',
	xtype:'friendSearchForm',
	fullscreen: true,
	config : {
		id : 'friendSearchForm',
		showAnimation: {
			type:'slide'
		},
		defaults: {
            required: true,
            labelAlign: 'left',
            labelWidth: '30%'
        },
		items : [{
		    xtype: 'textfield',
		    name: 'nickName',
		    label: '닉네임'
		},{
		    xtype: 'textfield',
		    name: 'uid',
		    label: 'ID'
		},{
		    xtype: 'numberfield',
		    name: 'phone',
		    label: '전화번호'
		},{
            xtype: 'fieldset',
            title: '성별',
			items : [{
				xtype: 'radiofield',
			    name: 'gender',
			    label: '남성',
			    value : '1',
			    checked: true
			},{
				xtype: 'radiofield',
			    name: 'gender',
			    label: '여성',
			    value : '0'
			}]
		},{
			xtype : 'button',
			text : '친구찾기',
			ui : 'confirm',
			id : 'btn_userSearch_submit',
			action : 'search_user'
		}]
	}
});