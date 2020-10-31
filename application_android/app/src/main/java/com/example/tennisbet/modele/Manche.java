/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.modele;

import java.io.Serializable;
import java.util.ArrayList;

public class Manche  implements Serializable {

    private int id;
    private int id_partie;
    private int score_jeux_joueur_1;
    private int score_jeux_joueur_2;
    private int nb_contestations_joueur_1;
    private int nb_contestations_joueur_2;
    private ArrayList<Jeu> score_jeu;
    private boolean etat_manche; // 0 = en cours et 1 = termine

    public Manche(int id, int id_partie, int score_jeux_joueur_1, int score_jeux_joueur_2, int nb_contestations_joueur_1, int nb_contestations_joueur_2, ArrayList<Jeu> score_jeu, boolean etat_manche) {
        this.id = id;
        this.id_partie = id_partie;
        this.score_jeux_joueur_1 = score_jeux_joueur_1;
        this.score_jeux_joueur_2 = score_jeux_joueur_2;
        this.nb_contestations_joueur_1 = nb_contestations_joueur_1;
        this.nb_contestations_joueur_2 = nb_contestations_joueur_2;
        this.score_jeu = score_jeu;
        this.etat_manche = etat_manche;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_partie() {
        return id_partie;
    }

    public void setId_partie(int id_partie) {
        this.id_partie = id_partie;
    }

    public int getScore_jeux_joueur_1() {
        return score_jeux_joueur_1;
    }

    public void setScore_jeux_joueur_1(int score_jeux_joueur_1) {
        this.score_jeux_joueur_1 = score_jeux_joueur_1;
    }

    public int getScore_jeux_joueur_2() {
        return score_jeux_joueur_2;
    }

    public void setScore_jeux_joueur_2(int score_jeux_joueur_2) {
        this.score_jeux_joueur_2 = score_jeux_joueur_2;
    }

    public int getNb_contestations_joueur_1() {
        return nb_contestations_joueur_1;
    }

    public void setNb_contestations_joueur_1(int nb_contestations_joueur_1) {
        this.nb_contestations_joueur_1 = nb_contestations_joueur_1;
    }

    public int getNb_contestations_joueur_2() {
        return nb_contestations_joueur_2;
    }

    public void setNb_contestations_joueur_2(int nb_contestations_joueur_2) {
        this.nb_contestations_joueur_2 = nb_contestations_joueur_2;
    }

    public boolean isEtat_manche() {
        return etat_manche;
    }

    public void setEtat_manche(boolean etat_manche) {
        this.etat_manche = etat_manche;
    }

    public ArrayList<Jeu> getScore_jeu() {
        return score_jeu;
    }

    public void setScore_jeu(ArrayList<Jeu> score_jeu) {
        this.score_jeu = score_jeu;
    }
}
