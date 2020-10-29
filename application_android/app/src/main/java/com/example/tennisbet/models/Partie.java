package com.example.tennisbet.models;

import java.time.LocalDateTime;
import java.util.ArrayList;

public class Partie {
    private int id;
    private Joueur joueur_1;
    private Joueur joueur_2;
    private LocalDateTime datetime_debut_partie;
    private LocalDateTime dateTime_fin_partie;
    private ArrayList<Manche> score_manche;
    private int etat_partie; // 0 = a venir, 1 = en cours, 2 = termine

    public Partie(int id, Joueur joueur_1, Joueur joueur_2, LocalDateTime datetime_debut_partie, LocalDateTime dateTime_fin_partie, ArrayList<Manche> score_manche, int etat_partie) {
        this.id = id;
        this.joueur_1 = joueur_1;
        this.joueur_2 = joueur_2;
        this.datetime_debut_partie = datetime_debut_partie;
        this.dateTime_fin_partie = dateTime_fin_partie;
        this.score_manche = score_manche;
        this.etat_partie = etat_partie;
    }

    //Creer une partie vide
    public Partie(int id, Joueur joueur_1, Joueur joueur_2, LocalDateTime datetime_debut_partie, LocalDateTime dateTime_fin_partie) {
        this.id = id;
        this.joueur_1 = joueur_1;
        this.joueur_2 = joueur_2;
        this.datetime_debut_partie = datetime_debut_partie;
        this.dateTime_fin_partie = dateTime_fin_partie;
        this.score_manche = null;
        this.etat_partie = 0;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Joueur getJoueur_1() {
        return joueur_1;
    }

    public void setJoueur_1(Joueur joueur_1) {
        this.joueur_1 = joueur_1;
    }

    public Joueur getJoueur_2() {
        return joueur_2;
    }

    public void setJoueur_2(Joueur joueur_2) {
        this.joueur_2 = joueur_2;
    }

    public LocalDateTime getDatetime_debut_partie() {
        return datetime_debut_partie;
    }

    public void setDatetime_debut_partie(LocalDateTime datetime_debut_partie) {
        this.datetime_debut_partie = datetime_debut_partie;
    }

    public LocalDateTime getDateTime_fin_partie() {
        return dateTime_fin_partie;
    }

    public void setDateTime_fin_partie(LocalDateTime dateTime_fin_partie) {
        this.dateTime_fin_partie = dateTime_fin_partie;
    }

    public ArrayList<Manche> getScore_manche() {
        return score_manche;
    }

    public void setScore_manche(ArrayList<Manche> score_manche) {
        this.score_manche = score_manche;
    }

    public int getEtat_partie() {
        return etat_partie;
    }

    public void setEtat_partie(int etat_partie) {
        this.etat_partie = etat_partie;
    }
}

