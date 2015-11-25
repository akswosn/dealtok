/**
 * 
 */
 
Ext.define('Rnx.view.push.PushDealSeller',{
	extend: 'Ext.form.FormPanel',
	xtype: 'pushDealSeller',
	
	config: {
		id: 'pushDealSeller',
		items: [
			{
				xtype: 'fieldset',
				defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                instructions: 'PUSH DEAL 설정할 판매처를 모두 Check하세요.',
                items: [
                	{
						xtype: 'checkboxfield',
						id: 'wemakeprice',
						name: 'wemakeprice',
						label: '위메프',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'coupang',
						name: 'coupang',
						label: '쿠팡',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'ticketmonster',
						name: 'ticketmonster',
						label: '티켓몬스터',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'stylecoupons',
						name: 'stylecoupons',
						label: '스타일쿠폰',
						value: false
					},
                	{
						xtype: 'checkboxfield',
						id: 'groupon',
						name: 'groupon',
						label: '그루폰',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'ilgongil',
						name: 'ilgongil',
						label: '일공일',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'daylect',
						name: 'daylect',
						label: '데이렉트닷컴',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'nowshop',
						name: 'nowshop',
						label: '지금샵',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'chanuri',
						name: 'chanuri',
						label: '차누리',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'tboom',
						name: 'tboom',
						label: '티붐',
						value: false
					}
                ]
			},
			{
				xtype: 'toolbar',
	            docked: 'bottom',
	            defaults: {
					width: '49%'
				},
	            items: [
	                {
	                	text: '확인',
	                	action: 'btn_PushDealSeller_Confirm'
	                },
	                {
	                	text: '취소',
	                	action: 'btn_Cancel'
	                }
	            ]
			}
		]
	}
});
