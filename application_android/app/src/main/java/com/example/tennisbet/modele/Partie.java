/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.modele;

import android.os.Build;

import androidx.annotation.RequiresApi;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class Partie implements Serializable {
    private int id;
    private Joueur joueur_1;
    private Joueur joueur_2;
    private LocalDateTime datetime_debut_partie;
    private LocalDateTime dateTime_fin_partie;
    private ArrayList<Manche> score_manche;
    private int etat_partie; // 0 = a venir, 1 = en cours, 2 = termine
    private int joueur_gagnant; // 0 = aucun, 1 = joueur 1, 2 = joueur 2
    private int duree_partie;

    public Partie(int id, Joueur joueur_1, Joueur joueur_2, LocalDateTime datetime_debut_partie, LocalDateTime dateTime_fin_partie, ArrayList<Manche> score_manche, int etat_partie, int joueur_gagnant, int duree_partie) {
        this.id = id;
        this.joueur_1 = joueur_1;
        this.joueur_2 = joueur_2;
        this.datetime_debut_partie = datetime_debut_partie;
        this.dateTime_fin_partie = dateTime_fin_partie;
        this.score_manche = score_manche;
        this.etat_partie = etat_partie;
        this.joueur_gagnant = joueur_gagnant;
        this.duree_partie = duree_partie;
    }

    public int getDuree_partie() {
        return duree_partie;
    }

    public void setDuree_partie(int duree_partie) {
        this.duree_partie = duree_partie;
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

    public int getJoueur_gagnant() {
        return joueur_gagnant;
    }

    public void setJoueur_gagnant(int joueur_gagnant) {
        this.joueur_gagnant = joueur_gagnant;
    }
}

