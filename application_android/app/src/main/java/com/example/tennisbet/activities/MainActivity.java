/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.example.tennisbet.LoadingDialog;
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
        MyApplication.setIdPartieDontLUtilisateurRegardeLesDetails(-1);

        String nom_utilisateur = ((EditText) findViewById(R.id.et_nom_utilisateur)).getText().toString();

        final LoadingDialog loadingDialog = new LoadingDialog(MainActivity.this);
        if (nom_utilisateur.equals("")) {
            AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
            builder.setMessage("Veuillez renseigner un nom d'utilisateur pour vous connecter")
                    .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                        }
                    }).setTitle("Erreur");
            builder.create();
            builder.show();
        } else {
            loadingDialog.startLoadingDialog();
            String firebase_token = MyFirebaseMessagingService.getToken(this);
            new HttpEnvoyerInfosUtilisateurOperation(new Utilisateur(-1, firebase_token, nom_utilisateur), new HttpEnvoyerInfosUtilisateurOperation.AsyncResponse() {
                @Override
                public void processFinish(Utilisateur utilisateur) {
                    loadingDialog.dismissDialog();
                    if (utilisateur.getId() != -1) {
                        ((MyApplication) getApplicationContext()).utilisateur = utilisateur;
                        Intent intent = new Intent(MainActivity.this, ListeParties.class);
                        startActivity(intent);
                    } else {
                        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                        builder.setMessage("La connexion au serveur a échoué")
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
    }
}