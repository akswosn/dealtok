/**
 * Deal Model 
 */
Ext.define('Rnx.model.user.UserModel',{
	extend: 'Ext.data.Model',
	
	config: {
		fields: [ 
			{name : 'userSeq', type : 'int'},		//user번호
			{name : 'uid', type : 'string'},		//user 아이디
			{name : 'phone', type : 'string'},		//폰번호
			{name : 'age', type : 'int'},			//나이
			{name : 'gender', type : 'string'},		//성별
			{name : 'nickName', type : 'string'},	//별명
			{name : 'passwd', type : 'string'},		//비밀번호
			{name : 'userImg', type : 'string'},	//이미지 파일명
			{name : 'address', type : 'string'},	//주소
		]
	}
});