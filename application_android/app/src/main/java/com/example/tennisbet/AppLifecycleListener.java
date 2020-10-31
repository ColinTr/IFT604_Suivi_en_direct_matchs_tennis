package com.example.tennisbet;

import android.util.Log;

import androidx.lifecycle.Lifecycle;
import androidx.lifecycle.LifecycleObserver;
import androidx.lifecycle.OnLifecycleEvent;

public class AppLifecycleListener implements LifecycleObserver {

    public static boolean isApplicationBackground = false;

@OnLifecycleEvent(Lifecycle.Event.ON_START)
    public void onMoveToForeground() {
        Log.d("node", "foreground");
        isApplicationBackground = false;
    }

@OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    public void onMoveToBackground() {
        Log.d("node", "background");
        isApplicationBackground = true;
    }
}