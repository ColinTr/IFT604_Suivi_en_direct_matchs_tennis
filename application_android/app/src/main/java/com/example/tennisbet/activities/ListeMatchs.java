/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.activities;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.R;
import com.example.tennisbet.modele.Partie;
import com.example.tennisbet.httpUtils.HttpRecupererPartiesDuJourOperation;
import com.example.tennisbet.services.InformationsPartiesService;

public class ListeMatchs extends AppCompatActivity {

    private static final String TAG = "ListeMatchs";

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_liste_matchs);
        ListView list = findViewById(R.id.lv_matchs);

        Log.d(TAG, "onCreate: Started.");

        HttpRecupererPartiesDuJourOperation partieGetter = new HttpRecupererPartiesDuJourOperation(this, list);
        partieGetter.execute();

        Button btn_nom_uti = findViewById(R.id.btn_nom_uti);
        btn_nom_uti.setText(((MyApplication) getApplicationContext()).utilisateur.getNomUtilisateur());

        ListView listView = findViewById(R.id.lv_matchs);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Partie partie = (Partie) adapterView.getItemAtPosition(position);
                if (partie.getEtat_partie() != 0) {
                    Intent intent = new Intent(ListeMatchs.this, ResumePartie.class);
                    intent.putExtra("partie", partie);
                    startActivity(intent);
                }
            }
        });
    }

    public void rafraichirListeMatch(View view) {
        ListView list = findViewById(R.id.lv_matchs);
        Toast.makeText(getApplicationContext(), "Mise à jour de la liste des parties...", Toast.LENGTH_LONG).show();
        HttpRecupererPartiesDuJourOperation partieGetter = new HttpRecupererPartiesDuJourOperation(this, list);
        partieGetter.execute();
    }

    public void deconnexionUtilisateur(View view) {
    }

    public void afficherlisteParies(View view) {
    }

    @Override
    protected void onResume() {
        IntentFilter filter = new IntentFilter();
        filter.addAction(InformationsPartiesService.BROADCAST_ACTION);
        registerReceiver(myBroadcastReceiver, filter);
        super.onResume();
    }

    @Override
    protected void onPause() {
        unregisterReceiver(myBroadcastReceiver);
        super.onPause();
    }

    private BroadcastReceiver myBroadcastReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            rafraichirListeMatch(null);
        }
    };
}