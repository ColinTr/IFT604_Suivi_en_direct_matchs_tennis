/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet;

import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

public class NotificationEvenementsBuilder {

    private static int notificationId = 123456759;

    public static void sendUpToDateEvenementsNotification() {
        Log.d("node", "creating notification...");
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(MyApplication.getAppContext());
        NotificationCompat.Builder builder = new NotificationCompat.Builder(MyApplication.getAppContext(), "Default")
                .setOngoing(true)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setContentTitle("Événements (points et contestations)")
                .setContentText("Much longer text that cannot fit one line...")
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText("Much longer text that cannot fit one line..."));
        notificationManager.notify(notificationId, builder.build());
    }

    public static void deleteEvenementsNotification() {
        NotificationManagerCompat.from(MyApplication.getAppContext()).cancel(notificationId);
    }
}