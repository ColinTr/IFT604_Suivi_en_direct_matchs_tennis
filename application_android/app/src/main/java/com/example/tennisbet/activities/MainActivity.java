/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.R;
import com.example.tennisbet.httpUtils.HttpEnvoyerInfosUtilisateurOperation;
import com.example.tennisbet.modele.Utilisateur;
import com.example.tennisbet.services.InformationsPartiesService;
import com.example.tennisbet.services.MyFirebaseMessagingService;

public class MainActivity extends AppCompatActivity {

    Intent informationsPartiesService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.d("Firebase from class", "token " + MyFirebaseMessagingService.getToken(this));

        informationsPartiesService = new Intent(MainActivity.this, InformationsPartiesService.class);
        startService(informationsPartiesService);
    }

    public void Entrer(View view) {
        String nom_utilisateur = ((EditText) findViewById(R.id.et_nom_utilisateur)).getText().toString();
        String firebase_token = MyFirebaseMessagingService.getToken(this);

        // On récupère l'id utilisateur en envoyant le nom_utilisateur à notre serveur NodeJs
        // et on en profite pour mettre à jour le token firebase associé à l'utilisateur
        HttpEnvoyerInfosUtilisateurOperation utilisateurSender = new HttpEnvoyerInfosUtilisateurOperation(new Utilisateur(-1, firebase_token, nom_utilisateur));
        utilisateurSender.execute();

        ((MyApplication) getApplicationContext()).utilisateur = utilisateurSender.getUtilisateur();

        Intent intent = new Intent(this, ListeParties.class);
        startActivity(intent);
    }
}