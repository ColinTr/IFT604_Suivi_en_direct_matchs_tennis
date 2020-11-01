/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.modele;

import java.io.Serializable;

public class Echange implements Serializable {

    private int id;
    private int id_jeu;
    private Joueur gagne_par_joueur;
    private Joueur conteste_par_joueur;
    private boolean contestation_acceptee; // 0 = non et 1 = oui
    private boolean etat_echange; // 0 = en cours et 1 = termine
    private int vitesse_service;
    private int nombre_coup_echangee;

    public Echange(int id, int id_jeu, Joueur gagne_par_joueur, Joueur conteste_par_joueur, boolean contestation_acceptee, boolean etat_echange, int vitesse_service, int nombre_coup_echangee) {
        this.id = id;
        this.id_jeu = id_jeu;
        this.gagne_par_joueur = gagne_par_joueur;
        this.conteste_par_joueur = conteste_par_joueur;
        this.contestation_acceptee = contestation_acceptee;
        this.etat_echange = etat_echange;
        this.vitesse_service = vitesse_service;
        this.nombre_coup_echangee = nombre_coup_echangee;
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
        return vitesse_service;
    }

    public void setVitesse_service(int vitesse_service) {
        this.vitesse_service = vitesse_service;
    }

    public int getNombre_coup_echangee() {
        return nombre_coup_echangee;
    }

    public void setNombre_coup_echangee(int nombre_coup_echangee) {
        this.nombre_coup_echangee = nombre_coup_echangee;
    }
}
