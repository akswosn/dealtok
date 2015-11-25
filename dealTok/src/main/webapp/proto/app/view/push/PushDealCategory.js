/**
 * 
 */
 
Ext.define('Rnx.view.push.PushDealCategory',{
	extend: 'Ext.form.Panel',
	xtype: 'pushDealCategory',
	
	config: {
		id: 'pushDealCategory',
		items: [
			{
				xtype: 'fieldset',
				defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                instructions: 'PUSH DEAL 설정할 카테고리를 모두 Check하세요.',
                items: [
                	{
						xtype: 'checkboxfield',
						id: 'health',
						name: 'health',
						label: '건강/레저',
						value: false
					},
                	{
						xtype: 'checkboxfield',
						id: 'culture',
						name: 'culture',
						label: '공연/전시/문화',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'education',
						name: 'education',
						label: '교육/취미',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'food',
						name: 'food',
						label: '맛집/카페',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'online',
						name: 'online',
						label: '모바일/온라인',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'life',
						name: 'life',
						label: '뷰티/생활',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'travel',
						name: 'travel',
						label: '여행/숙박',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'event',
						name: 'event',
						label: '이벤트/기타',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'party',
						name: 'party',
						label: '주점/파티',
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
	                	action: 'btn_PushDealCategory_Confirm'
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
