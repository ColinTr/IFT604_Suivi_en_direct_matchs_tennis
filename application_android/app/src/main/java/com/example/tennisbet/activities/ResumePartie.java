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
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.R;
import com.example.tennisbet.httpUtils.HttpEnvoyerParis;
import com.example.tennisbet.httpUtils.HttpRecupererPartiesDuJourOperation;
import com.example.tennisbet.httpUtils.HttpUtils;
import com.example.tennisbet.modele.Echange;
import com.example.tennisbet.modele.Jeu;
import com.example.tennisbet.modele.Manche;
import com.example.tennisbet.modele.Partie;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

import static java.lang.Math.abs;

public class ResumePartie extends AppCompatActivity {

    private Partie partie;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resume_partie);

        Intent intent = getIntent();

        partie = (Partie) intent.getSerializableExtra("partie");

        TextView tv_joueur1 = (TextView) findViewById(R.id.tv_joueur1);
        TextView tv_joueur2 = (TextView) findViewById(R.id.tv_joueur2);
        TextView tv_joueur1_2 = (TextView) findViewById(R.id.tv_joueur1_2);
        TextView tv_joueur2_2 = (TextView) findViewById(R.id.tv_joueur2_2);
        tv_joueur1_2.setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom());
        tv_joueur2_2.setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom());

        tv_joueur1.setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom() + " (" + partie.getJoueur_1().getRang() + ")");
        tv_joueur2.setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom() + " (" + partie.getJoueur_2().getRang() + ")");

        miseAJourAfficahge();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void miseAJourAfficahge() {

        miseAJourTableauDesScores();

        //Affichage si la partie est terminee
        if(partie.getEtat_partie() == 2)
        {
            miseAJourInformationsPartieTermine();
        }
        else {
            miseAJourInformationPartieEnCours();
        }
    }

    public void miseAJourTableauDesScores() {

        TextView tv_score_set_r1_c1 = (TextView) findViewById(R.id.tv_score_set_r1_c1);
        TextView tv_score_set_r1_c2 = (TextView) findViewById(R.id.tv_score_set_r1_c2);
        TextView tv_score_set_r1_c3 = (TextView) findViewById(R.id.tv_score_set_r1_c3);
        TextView tv_score_set_r2_c1 = (TextView) findViewById(R.id.tv_score_set_r2_c1);
        TextView tv_score_set_r2_c2 = (TextView) findViewById(R.id.tv_score_set_r2_c2);
        TextView tv_score_set_r2_c3 = (TextView) findViewById(R.id.tv_score_set_r2_c3);

        int nb_manches_joue = partie.getScore_manche().size();

        switch(nb_manches_joue) {
            case 1:
                tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_1()));
                if(tv_score_set_r1_c3.getText().equals("6")){
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                if(tv_score_set_r2_c3.getText().equals("6")){
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
                if(tv_score_set_r1_c2.getText().equals("6")){
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c2.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                if(tv_score_set_r2_c2.getText().equals("6")){
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_1()));
                if(tv_score_set_r1_c3.getText().equals("6")){
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_2()));
                if(tv_score_set_r2_c3.getText().equals("6")){
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
                if(tv_score_set_r1_c1.getText().equals("6")){
                    tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c1.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                if(tv_score_set_r2_c1.getText().equals("6")){
                    tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#28A745"));
                }

                tv_score_set_r1_c2.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_1()));
                if(tv_score_set_r1_c2.getText().equals("6")){
                    tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c2.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_2()));
                if(tv_score_set_r2_c2.getText().equals("6")){
                    tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#28A745"));
                }

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(2).getScore_jeux_joueur_1()));
                if(tv_score_set_r1_c3.getText().equals("6")){
                    tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(2).getScore_jeux_joueur_2()));
                if(tv_score_set_r2_c3.getText().equals("6")){
                    tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#28A745"));
                }
                break;
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void miseAJourInformationsPartieTermine() {
        TextView tv_text_etat_match = (TextView) findViewById(R.id.tv_text_etat_match);
        TextView tv_temps_partie = (TextView) findViewById(R.id.tv_temps_partie);

        TextView tv_joueur1 = (TextView) findViewById(R.id.tv_joueur1);
        TextView tv_joueur2 = (TextView) findViewById(R.id.tv_joueur2);

        ((TextView) findViewById(R.id.tv_service_joueur_1)).setVisibility(TextView.INVISIBLE);
        ((TextView) findViewById(R.id.tv_service_joueur_2)).setVisibility(TextView.INVISIBLE);

        ((TextView) findViewById(R.id.tv_contestation_joueur_1)).setVisibility(TextView.INVISIBLE);
        ((TextView) findViewById(R.id.tv_contestation_joueur_2)).setVisibility(TextView.INVISIBLE);

        ((TextView) findViewById(R.id.btn_parier_joueur_1)).setVisibility(TextView.INVISIBLE);
        ((TextView) findViewById(R.id.btn_parier_joueur_2)).setVisibility(TextView.INVISIBLE);

        ((TextView) findViewById(R.id.tv_joueur1_2)).setVisibility(TextView.INVISIBLE);
        ((TextView) findViewById(R.id.tv_joueur2_2)).setVisibility(TextView.INVISIBLE);

        ((TextView) findViewById(R.id.tv_points_joueur_1)).setVisibility(TextView.INVISIBLE);
        ((TextView) findViewById(R.id.tv_points_joueur_2)).setVisibility(TextView.INVISIBLE);

        ((TextView) findViewById(R.id.tv_text_coups_echange)).setVisibility(TextView.INVISIBLE);
        ((TextView) findViewById(R.id.tv_coups_echange)).setVisibility(TextView.INVISIBLE);

        switch (partie.getJoueur_gagnant()) {
            case 1:
                tv_joueur1.setTypeface(null, Typeface.BOLD);
                break;
            case 2:
                tv_joueur2.setTypeface(null, Typeface.BOLD);
                break;
        }
        long seconds = ChronoUnit.SECONDS.between(partie.getDatetime_debut_partie(), partie.getDateTime_fin_partie());
        LocalTime timeOfDay = LocalTime.ofSecondOfDay(seconds);
        String time = timeOfDay.toString();
        tv_temps_partie.setText(time);

        tv_text_etat_match.setText("Match Terminé");
    }

    public void miseAJourInformationPartieEnCours() {
        Manche mancheEnCours = null;
        Jeu jeuEnCours = null;
        Echange echangeEnCours = null;

        for(Manche manche : partie.getScore_manche()){
            if(!manche.isEtat_manche()){
                mancheEnCours = manche;
            }
        }

        for(Jeu jeu : mancheEnCours.getScore_jeu()){
            if(!jeu.isEtat_jeu()){
                jeuEnCours = jeu;
            }
        }

        for(Echange echange : jeuEnCours.getEchangeList()){
            if(!echange.isEtat_echange()){
                echangeEnCours = echange;
            }
        }

        TextView tv_service_joueur_1 = (TextView) findViewById(R.id.tv_service_joueur_1);
        TextView tv_service_joueur_2 = (TextView) findViewById(R.id.tv_service_joueur_2);

        TextView tv_contestation_joueur_1 = (TextView) findViewById(R.id.tv_contestation_joueur_1);
        TextView tv_contestation_joueur_2 = (TextView) findViewById(R.id.tv_contestation_joueur_2);

        ((TextView) findViewById(R.id.tv_points_joueur_1)).setText(String.valueOf(jeuEnCours.getScore_echange_joueur_1()));
        ((TextView) findViewById(R.id.tv_points_joueur_2)).setText(String.valueOf(jeuEnCours.getScore_echange_joueur_2()));

        if(jeuEnCours.getJoueur_au_service().equals(partie.getJoueur_1())){
            tv_service_joueur_1.setText("Service (" + String.valueOf(echangeEnCours.getVitesse_service()) + " km/h)");
            tv_service_joueur_2.setVisibility(View.INVISIBLE);
        }
        else {
            tv_service_joueur_2.setText("Service (" + String.valueOf(echangeEnCours.getVitesse_service()) + " km/h)");
            tv_service_joueur_1.setVisibility(View.INVISIBLE);
        }

        tv_contestation_joueur_1.setVisibility(View.INVISIBLE);
        tv_contestation_joueur_2.setVisibility(View.INVISIBLE);

        if(echangeEnCours.getConteste_par_joueur() != null && echangeEnCours.getConteste_par_joueur().equals(partie.getJoueur_1())){
            if(echangeEnCours.isContestation_acceptee()){
                tv_contestation_joueur_1.setText("Contestation acceptée");
                tv_contestation_joueur_1.setTextColor(Color.parseColor("#28A745"));
            } else {
                tv_contestation_joueur_1.setText("Contestation refusée");
                tv_contestation_joueur_1.setTextColor(Color.parseColor("#EE0000"));
            }

            tv_contestation_joueur_1.setVisibility(View.VISIBLE);
        }
        else if(echangeEnCours.getConteste_par_joueur() != null && echangeEnCours.getConteste_par_joueur().equals(partie.getJoueur_2())){
            if(echangeEnCours.isContestation_acceptee()){
                tv_contestation_joueur_2.setText("Contestation acceptée");
                tv_contestation_joueur_2.setTextColor(Color.parseColor("#28A745"));
            } else {
                tv_contestation_joueur_2.setText("Contestation refusée");
                tv_contestation_joueur_2.setTextColor(Color.parseColor("#EE0000"));
            }
            tv_contestation_joueur_2.setVisibility(View.VISIBLE);
        }

        ((TextView) findViewById(R.id.tv_coups_echange)).setText(String.valueOf(echangeEnCours.getNombre_coup_echangee()));

    }

    public void parierSurJoueur1(View view) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = this.getLayoutInflater();
        View mView = inflater.inflate(R.layout.dialog_parie, null);
        final EditText montant = (EditText) mView.findViewById(R.id.et_montant_pari);
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
                    public void onClick(DialogInterface dialog, int id) {}
                });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void parierSurJoueur2(View view) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = this.getLayoutInflater();
        View mView = inflater.inflate(R.layout.dialog_parie, null);
        final EditText montant = (EditText) mView.findViewById(R.id.et_montant_pari);
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
                    public void onClick(DialogInterface dialog, int id) {}
                });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    public void rafraichirMatch(View view) {
    }
}