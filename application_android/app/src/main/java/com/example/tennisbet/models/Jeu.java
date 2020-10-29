package com.example.tennisbet.models;

public class Jeu {

    private int id;
    private int id_manche;
    private Joueur joueur_au_service;
    private int score_echange_joueur_1;
    private int score_echange_joueur_2;
    private boolean etat_jeu; // 0 = en cours et 1 = termine

    public Jeu(int id, int id_manche, Joueur joueur_au_service, int score_echange_joueur_1, int score_echange_joueur_2, boolean etat_jeu) {
        this.id = id;
        this.id_manche = id_manche;
        this.joueur_au_service = joueur_au_service;
        this.score_echange_joueur_1 = score_echange_joueur_1;
        this.score_echange_joueur_2 = score_echange_joueur_2;
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
}
