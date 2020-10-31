/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.services;

import android.app.IntentService;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.example.tennisbet.AppLifecycleListener;
import com.example.tennisbet.R;

public class InformationsPartiesService extends IntentService {

    public static String BROADCAST_ACTION = "com.example.tennisbet.activities.UPDATELISTEPARTIES";

    private int applicationId = 1468748744;
    private final int INTERVAL = 10 * 1000;

    public InformationsPartiesService() {
        super("informationsPartiesService");
    }

    // On utilise onHandleIntent car un crée un thread worker séparé du main thread
    @Override
    protected void onHandleIntent(Intent workIntent) {
        // Gets data from the incoming Intent
        String dataString = workIntent.getDataString();

        do {
            try {
                if (!AppLifecycleListener.isApplicationBackground) {
                    Log.d("node", "sending broadcast");
                    // Broadcast pour que l'activité des listes de parties s'actualise
                    Intent broadcast = new Intent();
                    broadcast.setAction(BROADCAST_ACTION);
                    sendBroadcast(broadcast);
                } else {
                    // Création d'une notification si l'application n'est pas en premier plan
                    Log.d("node", "sending notification");
                    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);
                    NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "Default")
                            .setSmallIcon(R.mipmap.ic_launcher)
                            .setContentTitle("My notification")
                            .setContentText("Much longer text that cannot fit one line...")
                            .setStyle(new NotificationCompat.BigTextStyle()
                                    .bigText("Much longer text that cannot fit one line..."))
                            .setPriority(NotificationCompat.PRIORITY_DEFAULT);
                    notificationManager.notify(applicationId, builder.build());
                }

                Thread.sleep(INTERVAL);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } while (true);
    }
}