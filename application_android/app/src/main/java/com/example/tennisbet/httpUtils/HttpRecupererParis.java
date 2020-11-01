package com.example.tennisbet.httpUtils;

import android.os.AsyncTask;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;

import com.example.tennisbet.modele.Joueur;
import com.example.tennisbet.modele.Pari;
import com.example.tennisbet.modele.Utilisateur;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.HttpURLConnection;
import java.util.ArrayList;

public class HttpRecupererParis extends AsyncTask<Void, Void, ArrayList<Pari>> {

    public HttpRecupererParis.AsyncResponse delegate;
    private Utilisateur utilisateur;

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }

    public interface AsyncResponse {
        void processFinish(ArrayList<Pari> listParis);
    }

    public HttpRecupererParis(HttpRecupererParis.AsyncResponse delegate, Utilisateur utilisateur) {
        this.delegate = delegate;
        this.utilisateur = utilisateur;
    }

    @Override
    protected void onPostExecute(ArrayList<Pari> listParis) {
        super.onPostExecute(listParis);
        delegate.processFinish(listParis);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected ArrayList<Pari> doInBackground(Void... params) {
        ArrayList<Pari> listParis = new ArrayList<>();

        try {
            //Connect to the server
            HttpURLConnection connection = HttpUtils.getConnection("/paris/utilisateur/"+utilisateur.getId(), "GET");
            connection.connect();

            //get the list from the input stream
            String result = HttpUtils.InputStreamToString(connection.getInputStream());
            JSONArray array = new JSONArray(result);


            listParis = getInfo(array);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return listParis;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    protected ArrayList<Pari> getInfo(JSONArray array) {
        ArrayList<Pari> listParis = new ArrayList<>();

        try {
            for (int i = 0; i < array.length(); i++) {
                JSONObject object = new JSONObject(array.getString(i));

                int id_pari = object.getInt("id_pari");

                JSONObject joueur1_obj = new JSONObject(object.getString("joueur1"));
                JSONObject joueur2_obj = new JSONObject(object.getString("joueur2"));
                Joueur joueur1 = new Joueur(joueur1_obj.getInt("id_joueur"), joueur1_obj.getString("prenom"), joueur1_obj.getString("nom"), joueur1_obj.getInt("age"), joueur1_obj.getInt("rang"), joueur1_obj.getString("pays"));
                Joueur joueur2 = new Joueur(joueur2_obj.getInt("id_joueur"), joueur2_obj.getString("prenom"), joueur2_obj.getString("nom"), joueur2_obj.getInt("age"), joueur2_obj.getInt("rang"), joueur2_obj.getString("pays"));

                int joueur_gagnant = object.getInt("joueur_gagnant");

                double montant_parie = object.getDouble("montant_parie");

                double montant_gagne = object.getDouble("montant_gagne");

                int num_joueur_parie = object.getInt("num_joueur_parie");

                Log.d("MONTAG", "HttpRecupererParis : MontantParie = "+montant_parie);

                Pari pari = new Pari(id_pari,null,montant_parie,montant_gagne,joueur1,joueur2,null,num_joueur_parie,joueur_gagnant);

                listParis.add(pari);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return listParis;
    }
}
