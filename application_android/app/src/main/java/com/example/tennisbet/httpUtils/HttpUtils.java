/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.httpUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpUtils {

    static final int READ_TIMEOUT = 15000;
    static final int CONNECTION_TIMEOUT = 15000;
    static final String SERVER = "http://10.0.2.2:3000";

    public static HttpURLConnection getConnection(String apiService, String requestMethod) throws IOException {
        URL myURL = new URL(HttpUtils.SERVER + apiService);
        HttpURLConnection connection = (HttpURLConnection) myURL.openConnection();
        connection.setRequestMethod(requestMethod);
        connection.setReadTimeout(HttpUtils.READ_TIMEOUT);
        connection.setConnectTimeout(HttpUtils.CONNECTION_TIMEOUT);
        return connection;
    }

    /**
     * @param in      : buffer with the nodejs result
     * @param bufSize : size of the buffer
     * @return : the string corresponding to the buffer
     */
    public static String InputStreamToString(InputStream in, int bufSize) {
        final StringBuilder out = new StringBuilder();
        final byte[] buffer = new byte[bufSize];
        try {
            for (int ctr; (ctr = in.read(buffer)) != -1; ) {
                out.append(new String(buffer, 0, ctr));
            }
        } catch (IOException e) {
            throw new RuntimeException("Cannot convert stream to string", e);
        }
        return out.toString();
    }

    /**
     * @param in : buffer with the nodejs result
     * @return : the string corresponding to the buffer
     */
    public static String InputStreamToString(InputStream in) {
        return InputStreamToString(in, 1024);
    }

}