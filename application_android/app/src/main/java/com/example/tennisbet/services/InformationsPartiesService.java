/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.services;

import android.app.IntentService;
import android.content.Intent;
import android.util.Log;

import com.example.tennisbet.AppLifecycleListener;
import com.example.tennisbet.NotificationEvenementsBuilder;

public class InformationsPartiesService extends IntentService {

    public static String BROADCAST_ACTION = "com.example.tennisbet.activities.UPDATELISTEPARTIES";

    private final int INTERVAL = 10 * 1000;

    public InformationsPartiesService() {
        super("informationsPartiesService");
    }

    // On utilise onHandleIntent car un crée un thread worker séparé du main thread
    @Override
    protected void onHandleIntent(Intent workIntent) {
        do {
            try {
                if (!AppLifecycleListener.isApplicationBackground) {
                    // Broadcast pour que l'activité des listes de parties s'actualise
                    Intent broadcast = new Intent();
                    broadcast.setAction(BROADCAST_ACTION);
                    sendBroadcast(broadcast);
                } else {
                    // Création d'une notification si l'application n'est pas en premier plan
                    NotificationEvenementsBuilder.sendUpToDateEvenementsNotification();
                }

                Thread.sleep(INTERVAL);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } while (true);
    }
}