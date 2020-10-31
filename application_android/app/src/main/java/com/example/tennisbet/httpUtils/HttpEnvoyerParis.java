/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.httpUtils;

import android.os.AsyncTask;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;

public class HttpEnvoyerParis extends AsyncTask<Void, Void, Boolean> {

    private static int id_utilisateur;
    private static int id_partie;
    private static int id_joueur;
    private static int montant_pari;

    public HttpEnvoyerParis(int id_utilisateur, int id_partie, int id_joueur, int montant_pari) {
        this.id_utilisateur = id_utilisateur;
        this.id_partie = id_partie;
        this.id_joueur = id_joueur;
        this.montant_pari = montant_pari;
    }

    @Override
    protected Boolean doInBackground(Void... params) {

        try {
            //Creation du contenu JSON
            JSONObject jsonParam = new JSONObject();
            jsonParam.put("id_utilisateur", (id_utilisateur));
            jsonParam.put("id_partie", id_partie);
            jsonParam.put("id_joueur", id_joueur);
            jsonParam.put("montant_pari", montant_pari);
            String data = jsonParam.toString();

            // Initialisation de notre connexion
            HttpURLConnection urlConnection = HttpUtils.getConnection("/paris", "POST");
            urlConnection.setRequestProperty("content-type", "application/json");
            urlConnection.setDoInput(true);
            urlConnection.setDoOutput(true);
            OutputStream out = new BufferedOutputStream(urlConnection.getOutputStream());
            urlConnection.connect();

            // Envoie de nos données
            BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(out, "UTF-8"));
            writer.write(data);
            writer.flush();
            writer.close();
            out.close();

            try {
                //Récupération de la réponse du serveur
                InputStream in = new BufferedInputStream(urlConnection.getInputStream());
                BufferedReader reader = new BufferedReader(new InputStreamReader(in));
                StringBuilder result = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    result.append(line);
                }

                Log.d("test", "result from server: " + result.toString());

            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (urlConnection != null) {
                    urlConnection.disconnect();
                }
            }

        } catch (IOException | JSONException e) {
            System.out.println(e.getMessage());
        }

        return null;
    }

    @Override
    protected void onPostExecute(Boolean bool) {
        super.onPostExecute(bool);
    }

}