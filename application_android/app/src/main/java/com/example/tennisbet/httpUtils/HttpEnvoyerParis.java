package com.example.tennisbet.httpUtils;

import android.os.AsyncTask;

import com.example.tennisbet.modele.Partie;

import org.json.JSONObject;

import java.io.DataOutputStream;
import java.net.HttpURLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;

public class HttpEnvoyerParis extends AsyncTask<Void, Void, Boolean> {

    private static int id_utilisateur;
    private static int id_partie;
    private static int id_joueur;
    private static int montant_pari;

    public HttpEnvoyerParis(int id_utilisateur, int id_partie, int id_joueur, int montant_pari){
        this.id_utilisateur = id_utilisateur;
        this.id_partie = id_partie;
        this.id_joueur = id_joueur;
        this.montant_pari = montant_pari;
    }

    @Override
    protected Boolean doInBackground(Void... params) {

        try {
            //Connection au serveur
            HttpURLConnection connection = HttpUtils.getConnection("/paris", "POST");
            connection.setRequestProperty("Content-Type","application/json");
            connection.setRequestProperty("Host", "android.schoolportal.gr");
            connection.connect();

            //Creation du contenu JSON
            JSONObject jsonParam = new JSONObject();
            jsonParam.put("id_utilisateur", Integer.toString(id_utilisateur));
            jsonParam.put("id_partie", Integer.toString(id_partie));
            jsonParam.put("id_joueur", Integer.toString(id_joueur));
            jsonParam.put("montant_pari", Integer.toString(montant_pari));

            DataOutputStream output = new DataOutputStream(connection.getOutputStream());
            output.writeBytes(URLEncoder.encode(jsonParam.toString(), "UTF-8"));
            output.flush();
            output.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

}
