/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.activities;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.R;
import com.example.tennisbet.httpUtils.HttpEnvoyerParis;
import com.example.tennisbet.httpUtils.HttpRecupererPartie;
import com.example.tennisbet.modele.Partie;
import com.example.tennisbet.services.InformationsPartiesService;

public class ResumePartieAVenir extends AppCompatActivity {

    private static Partie partie;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resume_partie_a_venir);

        Intent intent = getIntent();

        partie = (Partie) intent.getSerializableExtra("partie");

        ((TextView) findViewById(R.id.tv_joueur1)).setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom());
        ((TextView) findViewById(R.id.tv_joueur2)).setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom());

        miseAJourAffichage();

        MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(partie.getId());
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(-1);
    }

    public static Partie getPartie() {
        return partie;
    }

    public static void setPartie(Partie partie) {
        ResumePartieAVenir.partie = partie;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void miseAJourAffichage() {
        switch (partie.getEtat_partie()) {
            case 1:
                Intent intent = new Intent(this, ResumePartie.class);
                intent.putExtra("partie", partie);
                startActivity(intent);
                MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(partie.getId());
                break;
            case 2:
                Intent intent2 = new Intent(this, ResumePartieTermine.class);
                intent2.putExtra("partie", partie);
                startActivity(intent2);
                break;
            case 0:
                miseAJourInformationPartie();
                break;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void miseAJourInformationPartie() {
        ((TextView) findViewById(R.id.tv_heure_match)).setText(partie.getDatetime_debut_partie().getHour() + ":" + partie.getDatetime_debut_partie().getMinute());
        ((TextView) findViewById(R.id.tv_age_joueur_1)).setText(String.valueOf(partie.getJoueur_1().getAge()));
        ((TextView) findViewById(R.id.tv_age_joueur_2)).setText(String.valueOf(partie.getJoueur_2().getAge()));
        ((TextView) findViewById(R.id.tv_rang_joueur_1)).setText(String.valueOf(partie.getJoueur_1().getRang()));
        ((TextView) findViewById(R.id.tv_rang_joueur_2)).setText(String.valueOf(partie.getJoueur_2().getRang()));
        ((TextView) findViewById(R.id.tv_pays_joueur_1)).setText(partie.getJoueur_1().getPays());
        ((TextView) findViewById(R.id.tv_pays_joueur_2)).setText(partie.getJoueur_2().getPays());
    }

    public void rafraichirMatch(View view) {
        Toast.makeText(getApplicationContext(), "Mise à jour de la partie en cours ...", Toast.LENGTH_LONG).show();

        new HttpRecupererPartie(new HttpRecupererPartie.AsyncResponse(){
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void processFinish(Partie partie){
                ResumePartieAVenir.setPartie(partie);

                miseAJourAffichage();
            }
        }).execute();
    }

    public void parierSurJoueur1(View view) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = this.getLayoutInflater();
        View mView = inflater.inflate(R.layout.dialog_parie, null);
        final EditText montant = mView.findViewById(R.id.et_montant_pari);
        ((TextView) mView.findViewById(R.id.tv_dialog)).setText("Parier sur " + partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom());
        builder.setView(mView)
                // Add action buttons
                .setPositiveButton("Valider", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        HttpEnvoyerParis creation_paris = new HttpEnvoyerParis(((MyApplication) getApplicationContext()).utilisateur.getId(), partie.getId(), partie.getJoueur_1().getId(), Integer.parseInt(String.valueOf(montant.getText())));
                        creation_paris.execute();
                    }
                })
                .setNegativeButton("Annuler", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                    }
                });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void parierSurJoueur2(View view) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = this.getLayoutInflater();
        View mView = inflater.inflate(R.layout.dialog_parie, null);
        final EditText montant = mView.findViewById(R.id.et_montant_pari);
        ((TextView) mView.findViewById(R.id.tv_dialog)).setText("Parier sur " + partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom());
        builder.setView(mView)
                // Add action buttons
                .setPositiveButton("Valider", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        HttpEnvoyerParis creation_paris = new HttpEnvoyerParis(((MyApplication) getApplicationContext()).utilisateur.getId(), partie.getId(), partie.getJoueur_2().getId(), Integer.parseInt(String.valueOf(montant.getText())));
                        creation_paris.execute();
                    }
                })
                .setNegativeButton("Annuler", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                    }
                });
        AlertDialog dialog = builder.create();
        dialog.show();
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
            rafraichirMatch(null);
        }
    };
}