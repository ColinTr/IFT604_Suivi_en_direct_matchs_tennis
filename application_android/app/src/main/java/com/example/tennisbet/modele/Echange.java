package com.example.tennisbet.modele;

import java.io.Serializable;

public class Echange implements Serializable {

    private int id;
    private int id_jeu;
    private Joueur gagne_par_joueur;
    private Joueur conteste_par_joueur;
    private boolean contestation_acceptee; // 0 = non et 1 = oui
    private boolean etat_echange; // 0 = en cours et 1 = termine
    private int Vitesse_service;
    private int Nombre_coup_echangee;

    public Echange(int id, int id_jeu, Joueur gagne_par_joueur, Joueur conteste_par_joueur, boolean contestation_acceptee, boolean etat_echange, int vitesse_service, int nombre_coup_echangee) {
        this.id = id;
        this.id_jeu = id_jeu;
        this.gagne_par_joueur = gagne_par_joueur;
        this.conteste_par_joueur = conteste_par_joueur;
        this.contestation_acceptee = contestation_acceptee;
        this.etat_echange = etat_echange;
        Vitesse_service = vitesse_service;
        Nombre_coup_echangee = nombre_coup_echangee;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId_jeu() {
        return id_jeu;
    }

    public void setId_jeu(int id_jeu) {
        this.id_jeu = id_jeu;
    }

    public Joueur getGagne_par_joueur() {
        return gagne_par_joueur;
    }

    public void setGagne_par_joueur(Joueur gagne_par_joueur) {
        this.gagne_par_joueur = gagne_par_joueur;
    }

    public Joueur getConteste_par_joueur() {
        return conteste_par_joueur;
    }

    public void setConteste_par_joueur(Joueur conteste_par_joueur) {
        this.conteste_par_joueur = conteste_par_joueur;
    }

    public boolean isContestation_acceptee() {
        return contestation_acceptee;
    }

    public void setContestation_acceptee(boolean contestation_acceptee) {
        this.contestation_acceptee = contestation_acceptee;
    }

    public boolean isEtat_echange() {
        return etat_echange;
    }

    public void setEtat_echange(boolean etat_echange) {
        this.etat_echange = etat_echange;
    }

    public int getVitesse_service() {
        return Vitesse_service;
    }

    public void setVitesse_service(int vitesse_service) {
        Vitesse_service = vitesse_service;
    }

    public int getNombre_coup_echangee() {
        return Nombre_coup_echangee;
    }

    public void setNombre_coup_echangee(int nombre_coup_echangee) {
        Nombre_coup_echangee = nombre_coup_echangee;
    }
}