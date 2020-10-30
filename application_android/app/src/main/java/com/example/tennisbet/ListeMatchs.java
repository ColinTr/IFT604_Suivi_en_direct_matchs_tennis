package com.example.tennisbet;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
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

        Intent intent = getIntent();
        if (intent != null){
            if (intent.hasExtra("nomUtilisateur")) {
                Button btn_nom_uti = (Button) findViewById(R.id.btn_nom_uti);
                btn_nom_uti.setText(intent.getStringExtra("nomUtilisateur"));
            }
        }

        ListView listView = (ListView) findViewById(R.id.lv_matchs);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener()
        {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Partie partie = (Partie) adapterView.getItemAtPosition(position);
                if(partie.getEtat_partie() != 0) {
                    Intent intent = new Intent(ListeMatchs.this, ResumePartie.class);
                    intent.putExtra("partie", partie);
                    startActivity(intent);
                }
            }
        });
    }

    public void rafraichirListeMatch(View view) {
        ListView list = (ListView) findViewById(R.id.lv_matchs);

        HttpGetParties partieGetter = new HttpGetParties(this, list);
        partieGetter.execute();
    }

    public void deconnexionUtilisateur(View view) {
    }

    public void afficherlisteParies(View view) {
    }
}