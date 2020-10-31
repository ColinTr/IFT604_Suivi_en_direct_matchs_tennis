package com.example.tennisbet.httpUtils;

import android.os.AsyncTask;

import com.example.tennisbet.MatchListAdapter;
import com.example.tennisbet.R;
import com.example.tennisbet.modele.Partie;
import com.example.tennisbet.modele.Utilisateur;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;

public class HttpEnvoyerInfosUtilisateurOperation extends AsyncTask<Void, Void, String> {

    private Utilisateur utilisateur;

    public HttpEnvoyerInfosUtilisateurOperation(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    @Override
    protected String doInBackground(Void... voids) {
        HttpURLConnection connection = null;
        try {
            //Connect to the server
            connection = HttpUtils.getConnection("/utilisateurs/" + utilisateur.getNomUtilisateur() + "/" + utilisateur.getToken(), "GET");
            connection.connect();

            //get the list from the input stream
            String result = HttpUtils.InputStreamToString(connection.getInputStream());
            JSONObject myJsonObject = new JSONObject(result);

            // On renvoie l'id de l'utilisateur récupéré
            return myJsonObject.getString("id_utilisateur");
        } catch (IOException | JSONException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void onPostExecute(String idUtilisateur) {
        super.onPostExecute(idUtilisateur);
        // TODO
    }
}
