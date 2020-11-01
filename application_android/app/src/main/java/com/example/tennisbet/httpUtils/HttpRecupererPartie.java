package com.example.tennisbet.httpUtils;

import android.os.AsyncTask;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.example.tennisbet.MyApplication;
import com.example.tennisbet.modele.Joueur;
import com.example.tennisbet.modele.Manche;
import com.example.tennisbet.modele.Partie;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.HttpURLConnection;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class HttpRecupererPartie extends AsyncTask<Void, Void, Partie> {

    public interface AsyncResponse {
        void processFinish(Partie partie);
    }

    public AsyncResponse delegate;

    public HttpRecupererPartie(AsyncResponse delegate) { this.delegate = delegate; }

    @Override
    protected void onPostExecute(Partie partie) {
        super.onPostExecute(partie);
        delegate.processFinish(partie);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected Partie doInBackground(Void... params) {
        Partie partie = null;

        try {
            //Connect to the server
            HttpURLConnection connection = HttpUtils.getConnection("/parties/" + MyApplication.getIdPartieDontLUtilisateurRegardeLesDetails(), "GET");
            connection.connect();

            //get the list from the input stream
            String result = HttpUtils.InputStreamToString(connection.getInputStream());
            JSONObject object = new JSONObject(result);

            partie = getInfo(object);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return partie;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    protected static Partie getInfo(JSONObject object) {
        Partie partie = null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        try {
            int id_partie = object.getInt("id_partie");
            JSONObject joueur1_obj = new JSONObject(object.getString("joueur1"));
            JSONObject joueur2_obj = new JSONObject(object.getString("joueur2"));
            LocalDateTime datetime_debut_partie = LocalDateTime.parse(object.getString("datetime_debut_partie"), formatter);
            LocalDateTime datetime_fin_partie;
            try {
                datetime_fin_partie = LocalDateTime.parse(object.getString("datetime_fin_partie"), formatter);
            } catch (Exception e) {
                datetime_fin_partie = null;
            }

            int etat_partie = object.getInt("etat_partie");

            JSONArray liste_manches = new JSONArray(object.getString("liste_manches"));

            Joueur joueur1 = new Joueur(joueur1_obj.getInt("id_joueur"), joueur1_obj.getString("prenom"), joueur1_obj.getString("nom"), joueur1_obj.getInt("age"), joueur1_obj.getInt("rang"), joueur1_obj.getString("pays"));
            Joueur joueur2 = new Joueur(joueur2_obj.getInt("id_joueur"), joueur2_obj.getString("prenom"), joueur2_obj.getString("nom"), joueur2_obj.getInt("age"), joueur2_obj.getInt("rang"), joueur2_obj.getString("pays"));

            ArrayList<Manche> MancheList = HttpRecupererPartiesDuJourOperation.getListManche(liste_manches, joueur1, joueur2, id_partie);

            int joueur_gagnant = object.getInt("joueur_gagnant");

            partie = new Partie(id_partie, joueur1, joueur2, datetime_debut_partie, datetime_fin_partie, MancheList, etat_partie, joueur_gagnant);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return partie;
    }
}
