
package cn.nanhuaren.visitingcard.util;

import java.util.Random;

public class WXUtil {

	public static String getNonceStr() {
		Random random = new Random();
		return String.valueOf(random.nextInt(10000));
	}

	public static long getTimeStamp() {
		return System.currentTimeMillis() / 1000;
	}
}
