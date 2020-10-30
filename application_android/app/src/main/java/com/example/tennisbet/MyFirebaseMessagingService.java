package com.example.tennisbet;

import android.content.Context;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    @Override
    public void onNewToken(String token) {
        Log.d("firebase", "Refreshed token: " + token);

        getSharedPreferences("_", MODE_PRIVATE).edit().putString("fb", token).apply();

        sendRegistrationToServer(token);
    }

    public static String getToken(Context context) {
        return context.getSharedPreferences("_", MODE_PRIVATE).getString("fb", "empty");
    }

    public void sendRegistrationToServer(String token){
        // TODO Envoyer le token au serveur
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d("firebase", "remoteMessage : " + remoteMessage);
        super.onMessageReceived(remoteMessage);
        notify(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
    }

    public void notify(String title, String message) {
        Log.d("firebase", "notify message : " + message);
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "notification_channel")
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentTitle(title)
                .setContentText(message)
                .setAutoCancel(true);
        NotificationManagerCompat managerCompat = NotificationManagerCompat.from(this);
        managerCompat.notify(123, builder.build());
    }
}