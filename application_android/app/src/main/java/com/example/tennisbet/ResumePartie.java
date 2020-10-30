package com.example.tennisbet;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.widget.TextView;

import com.example.tennisbet.models.Partie;

public class ResumePartie extends AppCompatActivity {

    private Partie partie;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resume_partie);

        Intent intent = getIntent();

        partie = (Partie) intent.getSerializableExtra("partie");

        TextView textView2 = (TextView) findViewById(R.id.textView2);
        TextView textView = (TextView) findViewById(R.id.textView);
        textView2.setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom() + " (" + partie.getJoueur_1().getRang() + ")");
        textView.setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom() + " (" + partie.getJoueur_2().getRang() + ")");

        TextView tv_score_set_r1_c1 = (TextView) findViewById(R.id.tv_score_set_r1_c1);;
        TextView tv_score_set_r1_c2 = (TextView) findViewById(R.id.tv_score_set_r1_c2);;
        TextView tv_score_set_r1_c3 = (TextView) findViewById(R.id.tv_score_set_r1_c3);;
        TextView tv_score_set_r2_c1 = (TextView) findViewById(R.id.tv_score_set_r2_c1);;
        TextView tv_score_set_r2_c2 = (TextView) findViewById(R.id.tv_score_set_r2_c2);;
        TextView tv_score_set_r2_c3 = (TextView) findViewById(R.id.tv_score_set_r2_c3);;

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
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));
                break;
            case 2:
                tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#FFFFFF"));
                tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                tv_score_set_r1_c2.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_1()));
                tv_score_set_r2_c2.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_1()));
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_2()));
                break;
            case 3:
                tv_score_set_r1_c1.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r1_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r1_c3.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c1.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c2.setBackgroundColor(Color.parseColor("#D5000000"));
                tv_score_set_r2_c3.setBackgroundColor(Color.parseColor("#D5000000"));

                tv_score_set_r1_c1.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_1()));
                tv_score_set_r2_c1.setText(Integer.toString(partie.getScore_manche().get(0).getScore_jeux_joueur_2()));

                tv_score_set_r1_c2.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_1()));
                tv_score_set_r2_c2.setText(Integer.toString(partie.getScore_manche().get(1).getScore_jeux_joueur_2()));

                tv_score_set_r1_c3.setText(Integer.toString(partie.getScore_manche().get(2).getScore_jeux_joueur_1()));
                tv_score_set_r2_c3.setText(Integer.toString(partie.getScore_manche().get(2).getScore_jeux_joueur_2()));
                break;
        }
    }
}