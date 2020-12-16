package com.ingtech.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;

public class EncryptionUtils {

    private static String encrypt(String key, String initVector, String value) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

            byte[] encrypted = cipher.doFinal(value.getBytes());
            // System.out.println("encrypted string: " + Base64.encodeBase64String(encrypted));

            return Base64.encodeBase64String(encrypted);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    private static String decrypt(String key, String initVector, String encrypted) {
        try {
            IvParameterSpec iv = new IvParameterSpec(initVector.getBytes("UTF-8"));
            SecretKeySpec skeySpec = new SecretKeySpec(key.getBytes("UTF-8"), "AES");

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

            byte[] original = cipher.doFinal(Base64.decodeBase64(encrypted));

            return new String(original);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    private static final String KEY = "B9_YNWA2018-2019"; // 128 bit key
    private static final String INIT_VECTOR = "YouWillNeverWalk"; // 16 bytes IV

    public static String encrypt(String value) {
        return encrypt(KEY, INIT_VECTOR, value);
    }

    public static String decrypt(String encrypted) {
        return decrypt(KEY, INIT_VECTOR, encrypted);
    }

    public static void main(String[] args) {

        System.out.println(decrypt(KEY, INIT_VECTOR, encrypt(KEY, INIT_VECTOR, "pass")));

        System.out.println(decrypt(KEY, INIT_VECTOR, "yQYU3jo4iLUaS3kS7puCbQ=="));
    }

}
