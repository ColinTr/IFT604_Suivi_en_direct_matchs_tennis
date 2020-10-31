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
import android.widget.TextView;
import android.widget.Toast;

import com.example.tennisbet.MatchListAdapter;
import com.example.tennisbet.MyApplication;
import com.example.tennisbet.R;
import com.example.tennisbet.modele.Partie;
import com.example.tennisbet.httpUtils.HttpRecupererPartiesDuJourOperation;
import com.example.tennisbet.services.InformationsPartiesService;

import java.util.ArrayList;

public class ListeParties extends AppCompatActivity {

    private static final String TAG = "ListeMatchs";

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_liste_matchs);
        ListView listView = findViewById(R.id.lv_matchs);

        Log.d(TAG, "onCreate: Started.");

        rafraichirListeMatch(null);

        TextView tv_nom_uti = findViewById(R.id.tv_nom_uti);
        tv_nom_uti.setText(((MyApplication) getApplicationContext()).utilisateur.getNomUtilisateur());


        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Partie partie = (Partie) adapterView.getItemAtPosition(position);

                switch(partie.getEtat_partie()) {
                    case 1 :
                        Intent intent = new Intent(ListeParties.this, ResumePartie.class);
                        intent.putExtra("partie", partie);
                        startActivity(intent);
                        break;
                    case 2 :
                        Intent intent2 = new Intent(ListeParties.this, ResumePartieTermine.class);
                        intent2.putExtra("partie", partie);
                        startActivity(intent2);
                        break;
                    case 0 :
                        Intent intent3 = new Intent(ListeParties.this, ResumePartieAVenir.class);
                        intent3.putExtra("partie", partie);
                        startActivity(intent3);
                        break;
                }
            }
        });
    }

    public void rafraichirListeMatch(View view) {
        Toast.makeText(getApplicationContext(), "Mise à jour de la liste des parties...", Toast.LENGTH_LONG).show();

        new HttpRecupererPartiesDuJourOperation(new HttpRecupererPartiesDuJourOperation.AsyncResponse(){
            @Override
            public void processFinish(ArrayList<Partie> listParties){
                //Here we receive the result fired from async class of onPostExecute(result) method.
                MatchListAdapter adapter = new MatchListAdapter(MyApplication.getAppContext() ,R.layout.list_matchs_layout, listParties);
                ListView list = findViewById(R.id.lv_matchs);
                list.setAdapter(adapter);
            }
        }).execute();
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