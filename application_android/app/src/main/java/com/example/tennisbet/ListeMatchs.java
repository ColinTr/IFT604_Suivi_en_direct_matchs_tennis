package com.example.tennisbet;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Build;
import android.os.Bundle;
import android.util.Log;
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

        Joueur gaston = new Joueur(1, "Paul", "Gaston", 18, 35, "France");
        Joueur thiem = new Joueur(2, "Raph", "Thiem", 26, 2, "Espagne");

        Manche manche1 = new Manche(1, 1, 6,0,0,0,false);
        Manche manche2 = new Manche(2, 1, 2,6,0,0,false);
        Manche manche3 = new Manche(3, 1, 6,2,0,0,false);
        Manche manche4 = new Manche(4, 1, 7,5,0,0,false);
        Manche manche5 = new Manche(5, 1, 3,4,0,0,true);
        Manche manche6 = new Manche(6, 1, 2,0,0,0,true);


        Partie partie1 = new Partie(1, gaston, thiem, LocalDateTime.of(2020,10,28,15,30, 0), null,new ArrayList<Manche>(Arrays.asList(manche1, manche2, manche3)),1);
        Partie partie2 = new Partie(2, gaston, thiem, LocalDateTime.of(2020,10,28,19,42, 0), null);
        Partie partie3 = new Partie(3, gaston, thiem, LocalDateTime.of(2020,10,28,18,31, 0), null);
        Partie partie4 = new Partie(4, gaston, thiem, LocalDateTime.of(2020,10,28,16,30, 0), null,new ArrayList<Manche>(Arrays.asList(manche4,manche6)),1);
        Partie partie5 = new Partie(5, gaston, thiem, LocalDateTime.of(2020,10,28,21,29, 0), null,new ArrayList<Manche>(Arrays.asList(manche5)), 1);


        ArrayList<Partie> partieList = new ArrayList<>();
        partieList.add(partie1);
        partieList.add(partie2);
        partieList.add(partie3);
        partieList.add(partie4);
        partieList.add(partie5);


        MatchListAdapter adapter = new MatchListAdapter(this, R.layout.list_matchs_layout, partieList);
        list.setAdapter(adapter);

    }
}