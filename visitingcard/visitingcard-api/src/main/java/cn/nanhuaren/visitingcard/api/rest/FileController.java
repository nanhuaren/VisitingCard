
package cn.nanhuaren.visitingcard.api.rest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import cn.nanhuaren.visitingcard.api.bean.ResultBody;

@RestController
@RequestMapping("/file")
public class FileController {

	private Logger logger = LoggerFactory.getLogger(FileController.class);

	@Value("${wechat.upload:/usr/share/nginx/html/upload/}")
	private String upload;

	@ResponseBody
	@RequestMapping(value = "/upload", method = { RequestMethod.POST, RequestMethod.GET })
	public ResultBody upload(HttpServletRequest request, HttpServletResponse response) {
		ResultBody resultBody = new ResultBody();
		response.addHeader("Access-Control-Allow-Origin", "*");
		try {
			List<String> imageList = new ArrayList<String>();
			if (request instanceof MultipartHttpServletRequest) {
				MultipartHttpServletRequest req = (MultipartHttpServletRequest) request;
				Iterator<String> fileNames = req.getFileNames();
				while (fileNames.hasNext()) {
					String fileName = fileNames.next();
					List<MultipartFile> ffs = req.getFiles(fileName);
					for (MultipartFile ff : ffs) {
						String fileId = UUID.randomUUID().toString().replaceAll("-", "");
						String filePath = upload + fileId;
						BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
						out.write(ff.getBytes());
						out.close();
						imageList.add(fileId);
					}
				}
			}
			resultBody.setData(imageList);
		} catch (IOException e) {
			logger.error("上传文件失败", e);
		}
		return resultBody;
	}

}
