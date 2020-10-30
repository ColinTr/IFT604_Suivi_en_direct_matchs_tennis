package com.example.tennisbet;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ListView;

import com.example.tennisbet.models.Joueur;
import com.example.tennisbet.models.Manche;
import com.example.tennisbet.models.Partie;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;

public class ListeMatchs extends AppCompatActivity {

    private static final String TAG = "ListeMatchs";

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_liste_matchs);
        ListView list = (ListView) findViewById(R.id.lv_matchs);

        Log.d(TAG, "onCreate: Started.");

        HttpGetParties partieGetter = new HttpGetParties(this, list);
        partieGetter.execute();
    }

    public void rafraichirListeMatch(View view) {
        ListView list = (ListView) findViewById(R.id.lv_matchs);

        HttpGetParties partieGetter = new HttpGetParties(this, list);
        partieGetter.execute();
    }
}