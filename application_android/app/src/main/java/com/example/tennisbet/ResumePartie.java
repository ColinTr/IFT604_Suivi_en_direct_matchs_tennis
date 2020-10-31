package com.example.tennisbet;

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

import com.example.tennisbet.modele.Partie;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

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
        tv_joueur1.setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom() + " (" + partie.getJoueur_1().getRang() + ")");
        tv_joueur2.setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom() + " (" + partie.getJoueur_2().getRang() + ")");

        TextView tv_score_set_r1_c1 = (TextView) findViewById(R.id.tv_score_set_r1_c1);
        TextView tv_score_set_r1_c2 = (TextView) findViewById(R.id.tv_score_set_r1_c2);
        TextView tv_score_set_r1_c3 = (TextView) findViewById(R.id.tv_score_set_r1_c3);
        TextView tv_score_set_r2_c1 = (TextView) findViewById(R.id.tv_score_set_r2_c1);
        TextView tv_score_set_r2_c2 = (TextView) findViewById(R.id.tv_score_set_r2_c2);
        TextView tv_score_set_r2_c3 = (TextView) findViewById(R.id.tv_score_set_r2_c3);

        TextView tv_text_etat_match = (TextView) findViewById(R.id.tv_text_etat_match);
        TextView tv_temps_partie = (TextView) findViewById(R.id.tv_temps_partie);

        TextView tv_service_joueur_1 = (TextView) findViewById(R.id.tv_service_joueur_1);
        TextView tv_service_joueur_2 = (TextView) findViewById(R.id.tv_service_joueur_2);

        TextView tv_points_joueur_1 = (TextView) findViewById(R.id.tv_points_joueur_1);
        TextView tv_points_joueur_2 = (TextView) findViewById(R.id.tv_points_joueur_2);

        TextView tv_contestation_joueur_1 = (TextView) findViewById(R.id.tv_contestation_joueur_1);
        TextView tv_contestation_joueur_2 = (TextView) findViewById(R.id.tv_contestation_joueur_2);

        Button btn_parier_joueur_1 = (Button) findViewById(R.id.btn_parier_joueur_1);
        Button btn_parier_joueur_2 = (Button) findViewById(R.id.btn_parier_joueur_2);

        /*if(partie.getEtat_partie() == 2)
        {
            tv_service_joueur_1.setVisibility(TextView.INVISIBLE);
            tv_service_joueur_2.setVisibility(TextView.INVISIBLE);

            tv_contestation_joueur_1.setVisibility(TextView.INVISIBLE);
            tv_contestation_joueur_2.setVisibility(TextView.INVISIBLE);

            btn_parier_joueur_1.setVisibility(TextView.INVISIBLE);
            btn_parier_joueur_2.setVisibility(TextView.INVISIBLE);

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
        }*/

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
                        // Envoit de la requete post pour creer le pari
                        // les parametres qu'il faut :
                        // id utilisateur : ((MyApplication) getApplicationContext()).utilisateur.getId()
                        // id partie : partie.getId()
                        // id joueur : partie.getJoueur_1().getId()
                        // montant : Integer.parseInt(montant.getText())

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
                        // Envoit de la requete post pour creer le pari
                        // les parametres qu'il faut :
                        // id utilisateur : ((MyApplication) getApplicationContext()).utilisateur.getId()
                        // id partie : partie.getId()
                        // id joueur : partie.getJoueur_2().getId()
                        // montant : Integer.parseInt(montant.getText())

                    }
                })
                .setNegativeButton("Annuler", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {}
                });
        AlertDialog dialog = builder.create();
        dialog.show();
    }
}