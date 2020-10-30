package com.example.tennisbet.httpUtils;

import android.os.AsyncTask;
import android.util.Log;

import com.example.tennisbet.modele.Utilisateur;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;

public class HttpEnvoyerInfosUtilisateurOperation extends AsyncTask<Void, Void, Void> {

    private Utilisateur utilisateur;

    public HttpEnvoyerInfosUtilisateurOperation(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    @Override
    protected Void doInBackground(Void... voids) {
        HttpURLConnection connection = null;
        try {
            //Connect to the server
            connection = HttpUtils.getConnection("/utilisateurs/" + utilisateur.getNomUtilisateur() + "/" + utilisateur.getToken(), "GET");
            connection.connect();

            //get the list from the input stream
            String result = HttpUtils.InputStreamToString(connection.getInputStream());
            JSONObject myJsonObject = new JSONObject(result);
            String idUtilisateur = myJsonObject.getString("id_utilisateur");
            Log.d("firebase id utilisateur", idUtilisateur);
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}
