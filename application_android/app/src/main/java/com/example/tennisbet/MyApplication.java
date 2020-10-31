/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet;

import android.app.Application;
import android.content.Context;

import androidx.lifecycle.ProcessLifecycleOwner;

import com.example.tennisbet.modele.Utilisateur;

public class MyApplication extends Application {

    private static MyApplication instance;
    public Utilisateur utilisateur;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        ProcessLifecycleOwner.get().getLifecycle().addObserver(new AppLifecycleListener());
    }

    public static Context getAppContext() {
        return instance;
    }
}