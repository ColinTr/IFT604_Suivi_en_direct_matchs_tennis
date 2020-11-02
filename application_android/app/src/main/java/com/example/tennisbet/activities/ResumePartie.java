/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.activities;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import com.example.tennisbet.MyApplication;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import com.example.tennisbet.R;
import com.example.tennisbet.httpUtils.HttpEnvoyerInfosUtilisateurOperation;
import com.example.tennisbet.httpUtils.HttpEnvoyerParis;
import com.example.tennisbet.httpUtils.HttpRecupererPartie;
import com.example.tennisbet.modele.Echange;
import com.example.tennisbet.modele.Jeu;
import com.example.tennisbet.modele.Manche;
import com.example.tennisbet.modele.Partie;
import com.example.tennisbet.modele.Utilisateur;
import com.example.tennisbet.services.InformationsPartiesService;

import java.io.IOException;

public class ResumePartie extends AppCompatActivity {

    private static Partie partie;

    @SuppressLint("SetTextI18n")
    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resume_partie);

        Intent intent = getIntent();

        partie = (Partie) intent.getSerializableExtra("partie");

        TextView tv_joueur1 = findViewById(R.id.tv_joueur1);
        TextView tv_joueur2 = findViewById(R.id.tv_joueur2);
        TextView tv_joueur1_2 = findViewById(R.id.tv_joueur1_2);
        TextView tv_joueur2_2 = findViewById(R.id.tv_joueur2_2);
        tv_joueur1_2.setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom());
        tv_joueur2_2.setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom());

        tv_joueur1.setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom() + " (" + partie.getJoueur_1().getRang() + ")");
        tv_joueur2.setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom() + " (" + partie.getJoueur_2().getRang() + ")");

        miseAJourAfficahge();
        MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(partie.getId());
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(-1);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void miseAJourAfficahge() {

        miseAJourTableauDesScores();

        if (partie.getEtat_partie() == 2) {
            Intent intent = new Intent(this, ResumePartieTermine.class);
            intent.putExtra("partie", partie);
            startActivity(intent);
        }
        else {
            miseAJourInformationPartieEnCours();
        }
    }

    public void miseAJourTableauDesScores() {

        TextView tv_score_set_r1_c1 = findViewById(R.id.tv_score_set_r1_c1);
        TextView tv_score_set_r1_c2 = findViewById(R.id.tv_score_set_r1_c2);
        TextView tv_score_set_r1_c3 = findViewById(R.id.tv_score_set_r1_c3);
        TextView tv_score_set_r2_c1 = findViewById(R.id.tv_score_set_r2_c1);
        TextView tv_score_set_r2_c2 = findViewById(R.id.tv_score_set_r2_c2);
        TextView tv_score_set_r2_c3 = findViewById(R.id.tv_score_set_r2_c3);

        int nb_manches_joue = partie.getScore_manche().size();

        switch (nb_manches_joue) {
            case 1:
                tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_1()));
                if (tv_score_set_r1_c3.getText().equals("6")) {
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                if (tv_score_set_r2_c3.getText().equals("6")) {
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                break;
            case 2:
                tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                tv_score_set_r1_c2.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_1()));
                if (tv_score_set_r1_c2.getText().equals("6")) {
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c2.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                if (tv_score_set_r2_c2.getText().equals("6")) {
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_1()));
                if (tv_score_set_r1_c3.getText().equals("6")) {
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_2()));
                if (tv_score_set_r2_c3.getText().equals("6")) {
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                break;
            case 3:
                tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                tv_score_set_r1_c1.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_1()));
                if (tv_score_set_r1_c1.getText().equals("6")) {
                    tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c1.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                if (tv_score_set_r2_c1.getText().equals("6")) {
                    tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#28A745"));
                }

                tv_score_set_r1_c2.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_1()));
                if (tv_score_set_r1_c2.getText().equals("6")) {
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c2.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_2()));
                if (tv_score_set_r2_c2.getText().equals("6")) {
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(2).getScore_jeux_joueur_1()));
                if (tv_score_set_r1_c3.getText().equals("6")) {
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(2).getScore_jeux_joueur_2()));
                if (tv_score_set_r2_c3.getText().equals("6")) {
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                break;
        }
    }

    @SuppressLint("SetTextI18n")
    @RequiresApi(api = Build.VERSION_CODES.O)
    public void miseAJourInformationPartieEnCours() {
        Manche mancheEnCours = null;
        Jeu jeuEnCours = null;
        Echange echangeEnCours = null;

        if(partie.getScore_manche() != null) {
            for (Manche manche : partie.getScore_manche()) {
                if (!manche.isEtat_manche()) {
                    mancheEnCours = manche;
                }
            }

            if(mancheEnCours != null && mancheEnCours.getScore_jeu() != null) {
                for (Jeu jeu : mancheEnCours.getScore_jeu()) {
                    if (!jeu.isEtat_jeu()) {
                        jeuEnCours = jeu;
                    }
                }
                if(jeuEnCours != null && jeuEnCours.getEchangeList() != null) {
                    for (Echange echange : jeuEnCours.getEchangeList()) {
                        if (!echange.isEtat_echange()) {
                            echangeEnCours = echange;
                        }
                    }
                }
            }
        }

        TextView tv_service_joueur_1 = findViewById(R.id.tv_service_joueur_1);
        TextView tv_service_joueur_2 = findViewById(R.id.tv_service_joueur_2);

        TextView tv_contestation_joueur_1 = findViewById(R.id.tv_contestation_joueur_1);
        TextView tv_contestation_joueur_2 = findViewById(R.id.tv_contestation_joueur_2);


        if(jeuEnCours != null) {

            ((TextView) findViewById(R.id.tv_points_joueur_1)).setText(String.valueOf(jeuEnCours.getScore_echange_joueur_1()));
            ((TextView) findViewById(R.id.tv_points_joueur_2)).setText(String.valueOf(jeuEnCours.getScore_echange_joueur_2()));
        }

        tv_contestation_joueur_1.setVisibility(View.INVISIBLE);
        tv_contestation_joueur_2.setVisibility(View.INVISIBLE);

        if(echangeEnCours != null) {

            if (jeuEnCours.getJoueur_au_service().equals(partie.getJoueur_1())) {
                tv_service_joueur_1.setText("Service (" + echangeEnCours.getVitesse_service() + " km/h)");
                tv_service_joueur_1.setVisibility(View.VISIBLE);
                tv_service_joueur_2.setVisibility(View.INVISIBLE);
            } else {
                tv_service_joueur_2.setText("Service (" + echangeEnCours.getVitesse_service() + " km/h)");
                tv_service_joueur_2.setVisibility(View.VISIBLE);
                tv_service_joueur_1.setVisibility(View.INVISIBLE);
            }

            if (echangeEnCours.getConteste_par_joueur() != null && echangeEnCours.getConteste_par_joueur().equals(partie.getJoueur_1())) {
                if (echangeEnCours.isContestation_acceptee()) {
                    tv_contestation_joueur_1.setText("Contestation acceptée");
                    tv_contestation_joueur_1.setTextColor(Color.parseColor("#28A745"));
                    tv_contestation_joueur_1.setVisibility(View.VISIBLE);
                } else {
                    tv_contestation_joueur_1.setText("Contestation refusée");
                    tv_contestation_joueur_1.setTextColor(Color.parseColor("#EE0000"));
                    tv_contestation_joueur_1.setVisibility(View.VISIBLE);
                }

                tv_contestation_joueur_1.setVisibility(View.VISIBLE);
            } else if (echangeEnCours.getConteste_par_joueur() != null && echangeEnCours.getConteste_par_joueur().equals(partie.getJoueur_2())) {
                if (echangeEnCours.isContestation_acceptee()) {
                    tv_contestation_joueur_2.setVisibility(View.VISIBLE);
                    tv_contestation_joueur_2.setText("Contestation acceptée");
                    tv_contestation_joueur_2.setTextColor(Color.parseColor("#28A745"));
                } else {
                    tv_contestation_joueur_2.setVisibility(View.VISIBLE);
                    tv_contestation_joueur_2.setText("Contestation refusée");
                    tv_contestation_joueur_2.setTextColor(Color.parseColor("#EE0000"));
                }
                tv_contestation_joueur_2.setVisibility(View.VISIBLE);
            }

            ((TextView) findViewById(R.id.tv_coups_echange)).setText(String.valueOf(echangeEnCours.getNombre_coup_echangee()));
        }
        int secondes = partie.getDuree_partie() % 60;
        int heures = partie.getDuree_partie() / 60;
        int minutes = heures % 60;
        heures /= 60;

        ((TextView) findViewById(R.id.tv_temps_partie)).setText(heures + ":" + minutes + ":" + secondes);

        if(partie.getScore_manche().size() > 1){
            findViewById(R.id.btn_parier_joueur_1).setVisibility(View.INVISIBLE);
            findViewById(R.id.btn_parier_joueur_2).setVisibility(View.INVISIBLE);
        }
        else {
            findViewById(R.id.btn_parier_joueur_1).setVisibility(View.VISIBLE);
            findViewById(R.id.btn_parier_joueur_2).setVisibility(View.VISIBLE);
        }

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

                            new HttpEnvoyerParis(((MyApplication) getApplicationContext()).utilisateur.getId(), partie.getId(), partie.getJoueur_1().getId(), Integer.parseInt(String.valueOf(montant.getText())), new HttpEnvoyerParis.AsyncResponse() {
                                @Override
                                public void processFinish(int montant_pari) {
                                    if (montant_pari == -1) {
                                        AlertDialog.Builder builder = new AlertDialog.Builder(ResumePartie.this);
                                        builder.setMessage("Vous ne pouvez parier qu'avant la fin de la première manche")
                                                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                                                    public void onClick(DialogInterface dialog, int id) {
                                                    }
                                                }).setTitle("Erreur");
                                        builder.create();
                                        builder.show();
                                    }
                                }
                            }).execute();
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

                        new HttpEnvoyerParis(((MyApplication) getApplicationContext()).utilisateur.getId(), partie.getId(), partie.getJoueur_2().getId(), Integer.parseInt(String.valueOf(montant.getText())), new HttpEnvoyerParis.AsyncResponse() {
                            @Override
                            public void processFinish(int montant_pari) {
                                if (montant_pari == -1) {
                                    AlertDialog.Builder builder = new AlertDialog.Builder(ResumePartie.this);
                                    builder.setMessage("Vous ne pouvez parier qu'avant la fin de la première manche")
                                            .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                                                public void onClick(DialogInterface dialog, int id) {
                                                }
                                            }).setTitle("Erreur");
                                    builder.create();
                                    builder.show();
                                }
                            }
                        }).execute();
                    }
                })
                .setNegativeButton("Annuler", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                    }
                });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void rafraichirMatch(View view) {
        Toast.makeText(getApplicationContext(), "Mise à jour de la partie en cours ...", Toast.LENGTH_LONG).show();

        new HttpRecupererPartie(new HttpRecupererPartie.AsyncResponse(){
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void processFinish(Partie partie){
                ResumePartie.setPartie(partie);
                miseAJourTableauDesScores();

                if (partie.getEtat_partie() == 2) {
                    Intent intent = new Intent(ResumePartie.this, ResumePartieTermine.class);
                    intent.putExtra("partie", partie);
                    startActivity(intent);
                }
                else {
                    miseAJourInformationPartieEnCours();
                }
            }
        }).execute();
    }

    public static Partie getPartie() {
        return partie;
    }

    public static void setPartie(Partie partie) {
        ResumePartie.partie = partie;
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