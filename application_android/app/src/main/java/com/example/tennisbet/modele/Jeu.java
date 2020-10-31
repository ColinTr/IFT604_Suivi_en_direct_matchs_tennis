/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.modele;

import java.io.Serializable;
import java.util.ArrayList;

public class Jeu implements Serializable {

    private int id;
    private int id_manche;
    private Joueur joueur_au_service;
    private Joueur gagne_par_joueur;
    private int score_echange_joueur_1;
    private int score_echange_joueur_2;
    private ArrayList<Echange> EchangeList;
    private boolean etat_jeu; // 0 = en cours et 1 = termine

    public Jeu(int id, int id_manche, Joueur joueur_au_service, Joueur gagne_par_joueur, int score_echange_joueur_1, int score_echange_joueur_2, ArrayList<Echange> echangeList, boolean etat_jeu) {
        this.id = id;
        this.id_manche = id_manche;
        this.joueur_au_service = joueur_au_service;
        this.gagne_par_joueur = gagne_par_joueur;
        this.score_echange_joueur_1 = score_echange_joueur_1;
        this.score_echange_joueur_2 = score_echange_joueur_2;
        EchangeList = echangeList;
        this.etat_jeu = etat_jeu;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_manche() {
        return id_manche;
    }

    public void setId_manche(int id_manche) {
        this.id_manche = id_manche;
    }

    public Joueur getJoueur_au_service() {
        return joueur_au_service;
    }

    public void setJoueur_au_service(Joueur joueur_au_service) {
        this.joueur_au_service = joueur_au_service;
    }

    public int getScore_echange_joueur_1() {
        return score_echange_joueur_1;
    }

    public void setScore_echange_joueur_1(int score_echange_joueur_1) {
        this.score_echange_joueur_1 = score_echange_joueur_1;
    }

    public int getScore_echange_joueur_2() {
        return score_echange_joueur_2;
    }

    public void setScore_echange_joueur_2(int score_echange_joueur_2) {
        this.score_echange_joueur_2 = score_echange_joueur_2;
    }

    public boolean isEtat_jeu() {
        return etat_jeu;
    }

    public void setEtat_jeu(boolean etat_jeu) {
        this.etat_jeu = etat_jeu;
    }

    public ArrayList<Echange> getEchangeList() {
        return EchangeList;
    }

    public void setEchangeList(ArrayList<Echange> echangeList) {
        EchangeList = echangeList;
    }

    public Joueur getGagne_par_joueur() {
        return gagne_par_joueur;
    }

    public void setGagne_par_joueur(Joueur gagne_par_joueur) {
        this.gagne_par_joueur = gagne_par_joueur;
    }
}
