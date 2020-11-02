/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet;

import android.app.Application;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.lifecycle.ProcessLifecycleOwner;

import com.example.tennisbet.modele.Utilisateur;

public class MyApplication extends Application {

    private static MyApplication instance;
    public static Utilisateur utilisateur;

    private static int idPartieDontLUtilisateurRegardeLesDetails;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        ProcessLifecycleOwner.get().getLifecycle().addObserver(new AppLifecycleListener());
        idPartieDontLUtilisateurRegardeLesDetails = -1;

        // On enregistre la channel de notification afin d'être certain de recevoir les notifications
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel("Default", "Default channel", importance);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    public static Context getAppContext() {
        return instance;
    }

    public static int getIdPartieDontLUtilisateurRegardeLesDetails() {
        return idPartieDontLUtilisateurRegardeLesDetails;
    }

    public static void setIdPartieDontLUtilisateurRegardeLesDetails(int idPartieDontLUtilisateurRegardeLesDetails) {
        MyApplication.idPartieDontLUtilisateurRegardeLesDetails = idPartieDontLUtilisateurRegardeLesDetails;
    }
}