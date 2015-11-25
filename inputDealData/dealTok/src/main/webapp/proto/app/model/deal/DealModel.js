/**
 * Deal Model 
 */
Ext.define('Rnx.model.deal.DealModel',{
	extend: 'Ext.data.Model',
	
	config: {
		//fields: [ 'did', 'title' ]
		fields: [ 
			{name : 'did', type : 'int'},				//고유번호
			{name : 'dealImg', type : 'string'},		//이미지 경로
			{name : 'title', type : 'string'},			//상품명
			{name : 'content', type : 'string'},		//상품 설명
			{name : 'regDate', type : 'string'},		//생성일
			{name : 'link', type : 'string'},			//구매 페이지 URL
			{name : 'time_start', type : 'string'},		//판매 시작 시간
			{name : 'time_end', type : 'string'},		//판매 종료 시간
			{name : 'price_original', type : 'string'},	//기존 가격
			{name : 'price_now', type : 'string'},		//판매 가격
			{name : 'sale_percent', type : 'string'},	//할인율
			{name : 'sell_count', type : 'string'},		//판매수량
			{name : 'count_min', type : 'string'},		//최소 할인 가능 수량
			{name : 'count_max', type : 'string'},		//최대 할인 가능 수량
			{name : 'area', type : 'string'},			//지역
			{name : 'category', type : 'string'},		//분류
			{name : 'shop', type : 'string'},			//판매처
			{name : 'tel', type : 'string'},			//연락처
			{name : 'addr', type : 'string'},			//주소
			{name : 'latitude', type : 'string'},		//위도
			{name : 'longitude', type : 'string'},		//경도
			{name : 'seller', type : 'string'}			//판매처
		]
	}
});
