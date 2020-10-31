/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.services;

import android.app.IntentService;
import android.content.ComponentName;
import android.content.Intent;
import android.util.Log;

import com.example.tennisbet.activities.ListeMatchs;

public class ForegroundInformationsPartiesService extends IntentService {

    public ForegroundInformationsPartiesService() {
        super("informationsPartiesService");
    }

    @Override
    protected void onHandleIntent(Intent workIntent) {
        // Gets data from the incoming Intent
        String dataString = workIntent.getDataString();

        do {
            Log.d("node js", "Récupération foreground des dernières informations des parties...");

            // ListeMatchs.rafraichirListeMatch();

            try {
                Thread.sleep(5 * 1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } while (true);
    }

    @Override
    public ComponentName startService(Intent service) {
        return super.startService(service);
    }

    @Override
    public boolean stopService(Intent name) {
        return super.stopService(name);
    }
}