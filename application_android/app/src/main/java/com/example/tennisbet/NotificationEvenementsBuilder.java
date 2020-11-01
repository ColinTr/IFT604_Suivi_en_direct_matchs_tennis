/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet;

import android.app.Notification;
import android.util.Log;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.example.tennisbet.httpUtils.HttpRecupererPartie;
import com.example.tennisbet.modele.Echange;
import com.example.tennisbet.modele.Jeu;
import com.example.tennisbet.modele.Manche;
import com.example.tennisbet.modele.Partie;

import java.util.ArrayList;

public class NotificationEvenementsBuilder {

    private static int notificationId = 123456759;

    public static void sendUpToDateEvenementsNotification() {
        int currentPartieId = MyApplication.getIdPartieDontLUtilisateurRegardeLesDetails();
        if(currentPartieId != -1){
            new HttpRecupererPartie(new HttpRecupererPartie.AsyncResponse() {
                @Override
                public void processFinish(Partie partieCourante) {
                    //Here we receive the result fired from async class of onPostExecute(result) method.
                    Log.d("node", "creating notification for partie " + partieCourante.getId());

                    Manche mancheEnCours = null;
                    Jeu jeuEnCours = null;
                    for (Manche manche : partieCourante.getScore_manche()) {
                        if (!manche.isEtat_manche()) {
                            mancheEnCours = manche;
                        }
                    }
                    if(mancheEnCours != null) {
                        for (Jeu jeu : mancheEnCours.getScore_jeu()) {
                            if (!jeu.isEtat_jeu()) {
                                jeuEnCours = jeu;
                            }
                        }
                    }

                    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(MyApplication.getAppContext());
                    NotificationCompat.Builder builder = new NotificationCompat.Builder(MyApplication.getAppContext(), "Default")
                            .setOngoing(true)
                            .setSmallIcon(R.mipmap.ic_launcher)
                            .setContentTitle("Événements (points et contestations)")
                            .setContentText(partieCourante.getJoueur_1().getNom() + " " + partieCourante.getJoueur_1().getPrenom().charAt(0) + " vs " + partieCourante.getJoueur_2().getNom() + " " + partieCourante.getJoueur_2().getPrenom().charAt(0))
                            .setStyle(new NotificationCompat.InboxStyle()
                                    .addLine(partieCourante.getJoueur_1().getNom() + " " + partieCourante.getJoueur_1().getPrenom().charAt(0) + " vs " + partieCourante.getJoueur_2().getNom() + " " + partieCourante.getJoueur_2().getPrenom().charAt(0))
                                    .addLine("Score manches : " + calculerScoreManchesGagnees(partieCourante.getScore_manche()))
                                    .addLine("Score jeu en cours : " + (mancheEnCours != null ? (mancheEnCours.getScore_jeux_joueur_1() + " / " + mancheEnCours.getScore_jeux_joueur_2()) : "0 / 0"))
                                    .addLine("Score échange en cours : " + (jeuEnCours != null ? (jeuEnCours.getScore_echange_joueur_1() + " / " + jeuEnCours.getScore_echange_joueur_2()) : "0 / 0")));
                    notificationManager.notify(notificationId, builder.build());
                }
            }).execute();
        }
    }

    private static String calculerScoreManchesGagnees(ArrayList<Manche> manches) {
        int score_j1 = 0, score_j2 = 0;
        for (Manche manche: manches) {
            if(manche.getScore_jeux_joueur_1() >= 6 || manche.getScore_jeux_joueur_2() >= 6) {
                if(manche.getScore_jeux_joueur_1() > manche.getScore_jeux_joueur_2()){
                    score_j1++;
                } else {
                    score_j2++;
                }
            }
        }
        return score_j1 + " / " + score_j2;
    }

    public static void deleteEvenementsNotification() {
        NotificationManagerCompat.from(MyApplication.getAppContext()).cancel(notificationId);
    }
}