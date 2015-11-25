/*
 * com.rnx.common.FileUploadUtil
 * 
 * Created on 2012. 12. 3.
 * 
 * Copyright (c) 2010 RionNex Co., Ltd. All Rights Reserved.
 */

package com.rnx.common;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * 
 * 클래스에 대한 설명을 여기에 쓴다.
 * 
 * Create Date 2012. 12. 3.
 * @version	1.00 2012. 12. 3.
 * @since   1.00
 * @see
 * @author	Keun-su Lim(akswosn@rionnex.com)
 * Revision History
 * who			when        	what
 * Keun-su		2012. 12. 3.			최초.
 */

public class FileUploadUtil
{
	public static void writeToFile(
			InputStream uploadedInputStream
			, String uploadedFileLocation)throws IOException {

		OutputStream out = new FileOutputStream(new File(uploadedFileLocation));
		int read = 0;
		byte[] bytes = new byte[1024];

		out = new FileOutputStream(new File(uploadedFileLocation));
		while((read = uploadedInputStream.read(bytes)) != -1){
			out.write(bytes, 0, read);
		}
		out.flush();
		out.close();
	}
}
