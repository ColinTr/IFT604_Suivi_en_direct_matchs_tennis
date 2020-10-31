package com.example.tennisbet;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.tennisbet.httpUtils.HttpEnvoyerInfosUtilisateurOperation;
import com.example.tennisbet.modele.Utilisateur;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.d("Firebase from class", "token "+ MyFirebaseMessagingService.getToken(this));
    }

    public void Entrer(View view) {
        String nom_utilisateur = ((EditText)findViewById(R.id.et_nom_utilisateur)).getText().toString();
        String firebase_token = MyFirebaseMessagingService.getToken(this);

        // On récupère l'id utilisateur en envoyant le nom_utilisateur à notre serveur NodeJs
        // et on en profite pour mettre à jour le token firebase associé à l'utilisateur
        HttpEnvoyerInfosUtilisateurOperation utilisateurSender = new HttpEnvoyerInfosUtilisateurOperation(new Utilisateur(-1, firebase_token, nom_utilisateur));
        utilisateurSender.execute();

        ((MyApplication) getApplicationContext()).utilisateur = utilisateurSender.getUtilisateur();

        Intent intent = new Intent(this, ListeMatchs.class);
        startActivity(intent);
    }
}