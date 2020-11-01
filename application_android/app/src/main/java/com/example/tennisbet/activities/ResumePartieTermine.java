/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.activities;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.widget.TextView;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.R;
import com.example.tennisbet.modele.Echange;
import com.example.tennisbet.modele.Jeu;
import com.example.tennisbet.modele.Manche;
import com.example.tennisbet.modele.Partie;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;

public class ResumePartieTermine extends AppCompatActivity {

    private Partie partie;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resume_partie_termine);

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
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    public void miseAJourAfficahge() {
        MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(-1);

        miseAJourTableauDesScores();

        TextView tv_temps_partie = findViewById(R.id.tv_temps_partie);

        TextView tv_joueur1 = findViewById(R.id.tv_joueur1);
        TextView tv_joueur2 = findViewById(R.id.tv_joueur2);

        ArrayList<Integer> listPointsMarquee = calculNombreDePointGagne();

        ((TextView) findViewById(R.id.tv_service_joueur_1)).setText(String.valueOf(listPointsMarquee.get(0)));
        ((TextView) findViewById(R.id.tv_service_joueur_2)).setText(String.valueOf(listPointsMarquee.get(1)));

        ArrayList<Double> listVitesseService = calculVitesseMoyenneService();

        ((TextView) findViewById(R.id.tv_points_joueur_1)).setText(String.format("%.1f", listVitesseService.get(0)));
        ((TextView) findViewById(R.id.tv_points_joueur_2)).setText(String.format("%.1f", listVitesseService.get(1)));

        ((TextView) findViewById(R.id.tv_coups_echange)).setText(String.valueOf(calculNombreCoupsEchange()));

        ArrayList<Integer> listContestation = calculNombrePointsContestee();

        ((TextView) findViewById(R.id.tv_contestation_joueur_1_valide)).setText(String.valueOf(listContestation.get(0)));
        ((TextView) findViewById(R.id.tv_contestation_joueur_2_valide)).setText(String.valueOf(listContestation.get(2)));
        ((TextView) findViewById(R.id.tv_contestation_joueur_1_refuse)).setText(String.valueOf(listContestation.get(1)));
        ((TextView) findViewById(R.id.tv_contestation_joueur_2_refuse)).setText(String.valueOf(listContestation.get(3)));

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
    }

    @SuppressLint("SetTextI18n")
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

    public ArrayList<Integer> calculNombrePointsContestee() {
        int pointsContesteValideJoueur1 = 0;
        int pointsContesteRefuseJoueur1 = 0;
        int pointsContesteValideJoueur2 = 0;
        int pointsContesteRefuseJoueur2 = 0;

        for (Manche manche : partie.getScore_manche()) {
            for (Jeu jeu : manche.getScore_jeu()) {
                for (Echange echange : jeu.getEchangeList()) {
                    if (echange.getConteste_par_joueur() != null && echange.getConteste_par_joueur().equals(partie.getJoueur_1())) {
                        if (echange.isContestation_acceptee()) {
                            pointsContesteValideJoueur1++;
                        } else {
                            pointsContesteRefuseJoueur1++;
                        }
                    } else if (echange.getConteste_par_joueur() != null && echange.getConteste_par_joueur().equals(partie.getJoueur_2())) {
                        if (echange.isContestation_acceptee()) {
                            pointsContesteValideJoueur2++;
                        } else {
                            pointsContesteRefuseJoueur2++;
                        }
                    }
                }
            }
        }

        ArrayList<Integer> listPointsConteste = new ArrayList<>();
        listPointsConteste.add(pointsContesteValideJoueur1);
        listPointsConteste.add(pointsContesteRefuseJoueur1);
        listPointsConteste.add(pointsContesteValideJoueur2);
        listPointsConteste.add(pointsContesteRefuseJoueur2);
        return listPointsConteste;

    }

    public int calculNombreCoupsEchange() {
        int nbCoupsEchange = 0;

        for (Manche manche : partie.getScore_manche()) {
            for (Jeu jeu : manche.getScore_jeu()) {
                for (Echange echange : jeu.getEchangeList()) {
                    nbCoupsEchange += echange.getNombre_coup_echangee();
                }
            }
        }
        return nbCoupsEchange;
    }

    public ArrayList<Double> calculVitesseMoyenneService() {
        double vitesseMoyenneServiceJoueur1 = 0;
        int nombreServicesJoueurs1 = 0;
        double vitesseMoyenneServiceJoueur2 = 0;
        int nombreServicesJoueurs2 = 0;

        for (Manche manche : partie.getScore_manche()) {
            for (Jeu jeu : manche.getScore_jeu()) {
                if (jeu.getJoueur_au_service().equals(partie.getJoueur_1())) {
                    for (Echange echange : jeu.getEchangeList()) {
                        vitesseMoyenneServiceJoueur1 = vitesseMoyenneServiceJoueur1 + echange.getVitesse_service();
                        nombreServicesJoueurs1++;
                    }
                } else {
                    for (Echange echange : jeu.getEchangeList()) {
                        vitesseMoyenneServiceJoueur2 = vitesseMoyenneServiceJoueur2 + echange.getVitesse_service();
                        nombreServicesJoueurs2++;
                    }
                }
            }
        }

        vitesseMoyenneServiceJoueur1 = vitesseMoyenneServiceJoueur1 / nombreServicesJoueurs1;
        vitesseMoyenneServiceJoueur2 = vitesseMoyenneServiceJoueur2 / nombreServicesJoueurs2;

        ArrayList<Double> listVitesseMoyenne = new ArrayList<>();
        listVitesseMoyenne.add(vitesseMoyenneServiceJoueur1);
        listVitesseMoyenne.add(vitesseMoyenneServiceJoueur2);

        return listVitesseMoyenne;

    }

    public ArrayList<Integer> calculNombreDePointGagne() {
        int pointGagneJoueur1 = 0;
        int pointGagneJoueur2 = 0;

        for (Manche manche : partie.getScore_manche()) {
            for (Jeu jeu : manche.getScore_jeu()) {
                if (jeu.getGagne_par_joueur().equals(partie.getJoueur_1())) {
                    pointGagneJoueur1 += 4;
                    switch (jeu.getScore_echange_joueur_2()) {
                        case 0:
                            break;
                        case 15:
                            pointGagneJoueur2 += 1;
                        case 30:
                            pointGagneJoueur2 += 2;
                        case 40:
                            pointGagneJoueur2 += 3;
                    }
                } else {
                    pointGagneJoueur2 += 4;
                    switch (jeu.getScore_echange_joueur_1()) {
                        case 0:
                            break;
                        case 15:
                            pointGagneJoueur1 += 1;
                        case 30:
                            pointGagneJoueur1 += 2;
                        case 40:
                            pointGagneJoueur1 += 3;
                    }
                }
            }
        }

        ArrayList<Integer> listPointsGagne = new ArrayList<>();
        listPointsGagne.add(pointGagneJoueur1);
        listPointsGagne.add(pointGagneJoueur2);

        return listPointsGagne;
    }
}