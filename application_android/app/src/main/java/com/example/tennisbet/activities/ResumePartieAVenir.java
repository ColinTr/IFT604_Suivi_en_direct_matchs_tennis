package com.example.tennisbet.activities;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.example.tennisbet.R;
import com.example.tennisbet.modele.Partie;

public class ResumePartieAVenir extends AppCompatActivity {

    private Partie partie;

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resume_partie_a_venir);

        Intent intent = getIntent();

        partie = (Partie) intent.getSerializableExtra("partie");

        ((TextView)findViewById(R.id.tv_joueur1)).setText(partie.getJoueur_1().getPrenom().charAt(0) + "." + partie.getJoueur_1().getNom());
        ((TextView)findViewById(R.id.tv_joueur2)).setText(partie.getJoueur_2().getPrenom().charAt(0) + "." + partie.getJoueur_2().getNom());

        miseAJourAfficahge();
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void miseAJourAfficahge() {

        switch(partie.getEtat_partie()) {
            case 1 :
                Intent intent = new Intent(this, ResumePartie.class);
                intent.putExtra("partie", partie);
                startActivity(intent);
                break;
            case 2 :
                Intent intent2 = new Intent(this, ResumePartieTermine.class);
                intent2.putExtra("partie", partie);
                startActivity(intent2);
            case 0 :
                miseAJourInformationPartie();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void miseAJourInformationPartie() {
        ((TextView)findViewById(R.id.tv_heure_match)).setText(partie.getDatetime_debut_partie().getHour() + ":" + partie.getDatetime_debut_partie().getMinute());
        ((TextView)findViewById(R.id.tv_age_joueur_1)).setText(String.valueOf(partie.getJoueur_1().getAge()));
        ((TextView)findViewById(R.id.tv_age_joueur_2)).setText(String.valueOf(partie.getJoueur_2().getAge()));
        ((TextView)findViewById(R.id.tv_rang_joueur_1)).setText(String.valueOf(partie.getJoueur_1().getRang()));
        ((TextView)findViewById(R.id.tv_rang_joueur_2)).setText(String.valueOf(partie.getJoueur_2().getRang()));
        ((TextView)findViewById(R.id.tv_pays_joueur_1)).setText(partie.getJoueur_1().getPays());
        ((TextView)findViewById(R.id.tv_pays_joueur_2)).setText(partie.getJoueur_2().getPays());
    }

    public void rafraichirMatch(View view) {
    }

    public void parierSurJoueur1(View view) {
    }

    public void parierSurJoueur2(View view) {
    }
}