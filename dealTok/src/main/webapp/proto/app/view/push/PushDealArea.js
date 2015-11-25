/**
 * 
 */
 
Ext.define('Rnx.view.push.PushDealArea',{
	extend: 'Ext.form.FormPanel',
	xtype: 'pushDealArea',
	
	config: {
		id: 'pushDealArea',
		items: [
			{
				xtype: 'fieldset',
				defaults: {
                    required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                instructions: 'PUSH DEAL 설정할 지역을 모두 Check하세요.',
                items: [
                	{
						xtype: 'checkboxfield',
						id: 'gangwon',
						name: 'gangwon',
						label: '강원',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'gyeonggi',
						name: 'gyeonggi',
						label: '경기',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'gyeongnam',
						name: 'gyeongnam',
						label: '경남',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'gyeongbuk',
						name: 'gyeongbuk',
						label: '경북',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'gwangju',
						name: 'gwangju',
						label: '광주',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'daegu',
						name: 'daegu',
						label: '대구',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'daejeon',
						name: 'daejeon',
						label: '대전',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'busan',
						name: 'busan',
						label: '부산',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'seoul',
						name: 'seoul',
						label: '서울',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'ulsan',
						name: 'ulsan',
						label: '울산',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'incheon',
						name: 'incheon',
						label: '인천',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'jeonnam',
						name: 'jeonnam',
						label: '전남',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'jeonbuk',
						name: 'jeonbuk',
						label: '전북',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'jeju',
						name: 'jeju',
						label: '제주',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'chungnam',
						name: 'chungnam',
						label: '충남',
						value: false
					},
					{
						xtype: 'checkboxfield',
						id: 'chungbuk',
						name: 'chungbuk',
						label: '충북',
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
	                	action: 'btn_PushDealArea_Confirm'
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
