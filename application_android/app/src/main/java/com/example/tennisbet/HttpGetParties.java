package com.example.tennisbet;

import android.os.AsyncTask;
import android.os.Build;
import android.widget.ListView;

import androidx.annotation.RequiresApi;

import com.example.tennisbet.models.Echange;
import com.example.tennisbet.models.Jeu;
import com.example.tennisbet.models.Joueur;
import com.example.tennisbet.models.Manche;
import com.example.tennisbet.models.Partie;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

public class HttpGetParties extends AsyncTask<Void, Void, ArrayList<Partie>> {

    static final String REQUEST_METHOD = "GET";
    static final int READ_TIMEOUT = 15000;
    static final int CONNECTION_TIMEOUT = 15000;
    private static final String SERVER = "http://10.0.2.2:3000";
    private static ListView list;
    private static ListeMatchs listeM;

    public HttpGetParties(ListeMatchs listeM, ListView list) {
        this.list = list;
        this.listeM = listeM;
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    @Override
    protected ArrayList<Partie> doInBackground(Void... params){
        ArrayList<Partie> listPartie = new ArrayList<Partie>();

        try {
            //Connect to the server
            URL myURL = new URL(SERVER + "/parties");
            HttpURLConnection connection = (HttpURLConnection) myURL.openConnection();
            connection.setRequestMethod(REQUEST_METHOD);
            connection.setReadTimeout(READ_TIMEOUT);
            connection.setConnectTimeout(CONNECTION_TIMEOUT);
            connection.connect();

            //get the list from the input stream
            String result = InputStreamOperations.InputStreamToString(connection.getInputStream());
            JSONArray array = new JSONArray(result);

            listPartie = getInfo(array);

        } catch(Exception e){
            e.printStackTrace();
        }
        return listPartie;
    }

    protected void onPostExecute(ArrayList<Partie> listPartie){
        super.onPostExecute(listPartie);
        MatchListAdapter adapter = new MatchListAdapter(listeM, R.layout.list_matchs_layout, listPartie);
        list.setAdapter(adapter);
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    protected ArrayList<Partie> getInfo(JSONArray array){
        ArrayList<Partie> listPartie = new ArrayList<Partie>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        try{
            for (int i = 0 ; i < array.length(); i++){
                JSONObject object = new JSONObject(array.getString(i));
                int id_partie = object.getInt("id_partie");
                JSONObject joueur1_obj = new JSONObject(object.getString("joueur1"));
                JSONObject joueur2_obj = new JSONObject(object.getString("joueur2"));
                LocalDateTime datetime_debut_partie = LocalDateTime.parse(object.getString("datetime_debut_partie"), formatter);
                LocalDateTime datetime_fin_partie;
                try {
                    datetime_fin_partie = LocalDateTime.parse(object.getString("datetime_fin_partie"), formatter);
                }catch (Exception e ){
                    datetime_fin_partie = null;
                }

                int etat_partie = object.getInt("etat_partie");

                boolean etatM;
                if (etat_partie == 1){
                    etatM = true;
                }
                else{
                    etatM = false;
                }

                JSONArray liste_manches = new JSONArray(object.getString("liste_manches"));

                Joueur joueur1 = new Joueur(joueur1_obj.getInt("id_joueur"), joueur1_obj.getString("prenom"), joueur1_obj.getString("nom"), joueur1_obj.getInt("age"), joueur1_obj.getInt("rang"), joueur1_obj.getString("pays"));
                Joueur joueur2 = new Joueur(joueur2_obj.getInt("id_joueur"), joueur2_obj.getString("prenom"), joueur2_obj.getString("nom"), joueur2_obj.getInt("age"), joueur2_obj.getInt("rang"), joueur2_obj.getString("pays"));

                ArrayList<Manche> MancheList = getListManche(liste_manches, joueur1, joueur2, id_partie, etatM);

                Partie partie = new Partie(id_partie, joueur1, joueur2, datetime_debut_partie, datetime_fin_partie, MancheList, etat_partie);
                listPartie.add(partie);
            }
        } catch (Exception e){
            e.printStackTrace();
        }

        return listPartie;
    }

    protected ArrayList<Manche> getListManche (JSONArray liste_manches, Joueur joueur1, Joueur joueur2, int id_partie, boolean etatM) throws JSONException {
        ArrayList<Manche> MancheList = new ArrayList<Manche>();
        for (int j = 0 ; j < liste_manches.length() ; j++){
            JSONObject object2 = new JSONObject(liste_manches.getString(j));
            int id_manche = object2.getInt("id_manche");
            int score_jeux_joueur_1 = object2.getInt("score_jeux_joueur_1");
            int score_jeux_joueur_2 = object2.getInt("score_jeux_joueur_2");
            int nb_contestations_joueur_1 = object2.getInt("nb_contestations_joueur_1");
            int nb_contestations_joueur_2 = object2.getInt("nb_contestations_joueur_2");
            int etat_manche = object2.getInt(("etat_manche"));
            JSONArray liste_jeux = new JSONArray(object2.getString("liste_jeux"));

            ArrayList<Jeu> JeuList = getListJeu(liste_jeux, joueur1, joueur2, id_manche);

            Manche manche = new Manche(id_manche, id_partie, score_jeux_joueur_1, score_jeux_joueur_2, nb_contestations_joueur_1, nb_contestations_joueur_2, JeuList, etatM);
            MancheList.add(manche);
        }
        return MancheList;
    }

    protected ArrayList<Jeu> getListJeu (JSONArray liste_jeux, Joueur joueur1, Joueur joueur2, int id_manche) throws JSONException {
        ArrayList<Jeu> JeuList = new ArrayList<Jeu>();
        for(int k = 0 ; k < liste_jeux.length() ; k++){
            JSONObject object3 = new JSONObject(liste_jeux.getString(k));
            int id_jeu = object3.getInt("id_jeu");
            int gagne_par_joueur = object3.getInt("gagne_par_joueur");
            int joueur_au_service = object3.getInt("joueur_au_service");

            Joueur serveur;
            if (joueur_au_service == 1) {
                serveur = joueur1;
            }
            else {
                serveur = joueur2;
            }

            int score_echanges_joueur_1 = object3.getInt("score_echanges_joueur_1");
            int score_echanges_joueur_2 = object3.getInt("score_echanges_joueur_2");
            int etat_Jeu = object3.getInt("etat_Jeu");

            boolean etatJ;
            if (etat_Jeu == 1){
                etatJ = true;
            }
            else{
                etatJ = false;
            }

            JSONArray liste_echange = new JSONArray(object3.getString("list_echanges"));

            ArrayList<Echange> EchangeList = getListEchange(liste_echange, joueur1, joueur2);

            Jeu jeu = new Jeu(id_jeu, id_manche, serveur, score_echanges_joueur_1, score_echanges_joueur_2, EchangeList, etatJ);
            JeuList.add(jeu);
        }
        return JeuList;
    }

    protected ArrayList<Echange> getListEchange (JSONArray liste_echange, Joueur joueur1, Joueur joueur2) throws JSONException {
        ArrayList<Echange> EchangeList = new ArrayList<Echange>();
        for (int n = 0; n < liste_echange.length() ; n ++){
            JSONObject object4 = new JSONObject(liste_echange.getString(n));
            int id_echange = object4.getInt("id_echange");
            int id_jeuB = object4.getInt("id_jeu");
            int gagne_par_joueurB = object4.getInt("gagne_par_joueur");

            Joueur vainqueur;
            if (gagne_par_joueurB == 1) {
                vainqueur = joueur1;
            }
            else {
                vainqueur = joueur2;
            }

            int conteste_par_joueur = object4.getInt("conteste_par_joueur");

            Joueur contestant;
            if (conteste_par_joueur == 1) {
                contestant = joueur1;
            }
            else if (conteste_par_joueur == 2){
                contestant = joueur2;
            }
            else {
                contestant = null;
            }

            int contestation_acceptee = object4.getInt("contestation_acceptee");
            boolean contestation;
            if (contestation_acceptee == 1){
                contestation = true;
            }
            else{
                contestation = false ;
            }

            int etat_echange = object4.getInt("etat_echange");

            boolean echangeEtat;
            if (etat_echange == 1){
                echangeEtat = true;
            }
            else{
                echangeEtat = false;
            }

            int vitesse_service = object4.getInt("vitesse_service");
            int nombre_coup_echangee = object4.getInt("nombre_coup_echange");

            Echange echange = new Echange(id_echange, id_jeuB, vainqueur, contestant, contestation, echangeEtat, vitesse_service, nombre_coup_echangee);
            EchangeList.add(echange);
        }
        return EchangeList;
    }
}
