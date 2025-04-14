package com.sahan.Hotel.Management.Utils;

import javax.sql.rowset.serial.SerialBlob;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;

public class PhotoUtils {
    public static byte[] convertBlobToBytes(Blob blob) throws SQLException {
        if (blob == null) {
            return null;
        }
        return blob.getBytes(1, (int) blob.length());
    }

    public static String convertBytesToBase64(byte[] bytes) {
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        return Base64.getEncoder().encodeToString(bytes);
    }

    public static Blob convertByteToBlob(byte [] photoByte) throws SQLException {
        if (photoByte != null && photoByte.length >0){
            return new SerialBlob(photoByte);
        }
        else return null;
    }

    public static byte[] convertBase64ToByte(String photoBase64){
        if(photoBase64 != null && !photoBase64.isEmpty()){
            return Base64.getDecoder().decode(photoBase64);
        }
        else return null;
    }
}
