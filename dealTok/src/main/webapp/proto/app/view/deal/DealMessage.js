/**
 * Deal Message
 */
Ext.define('Rnx.view.deal.DealMessage', {
	extend: 'Ext.Container',
	xtype: 'dealMessage',
	
	config: {
		title: '메세지 작성',
		items: [
			{
				id: 'msgBody', 
				xtype: 'fieldset',
				title: '메세지 작성',
                instructions: '내용을 입력하세요.',
				items: [
					{
						xtype: 'textareafield',
						id: 'deal_msg',
						name: 'deal_msg',
						height: 150
					}
				]
			},
			{
				xtype: 'button',
				id: 'btn_DealMessage_Send',
				name: 'btn_DealMessage_Send',
				text: '보내기'
			}
		]
	}
});