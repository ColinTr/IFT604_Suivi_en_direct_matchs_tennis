package com.example.tennisbet.modele;

public class Pari {

    private int id;
    private Utilisateur parieur;
    private double montant_parie;
    private double montant_gagne;
    private Joueur joueur1;
    private Joueur joueur2;
    private Partie partie_parie;
    private int num_joueur_parie;
    private int joueur_gagnant;

    public Pari(int id, Utilisateur parieur, double montant_parie, double montant_gagne, Joueur joueur1, Joueur joueur2, Partie partie_parie, int num_joueur_parie, int joueur_gagnant) {
        this.id = id;
        this.parieur = parieur;
        this.montant_parie = montant_parie;
        this.montant_gagne = montant_gagne;
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.partie_parie = partie_parie;
        this.num_joueur_parie = num_joueur_parie;
        this.joueur_gagnant = joueur_gagnant;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Utilisateur getParieur() {
        return parieur;
    }

    public void setParieur(Utilisateur parieur) {
        this.parieur = parieur;
    }

    public double getMontant_parie() {
        return montant_parie;
    }

    public void setMontant_parie(double montant_parie) {
        this.montant_parie = montant_parie;
    }

    public double getMontant_gagne() {
        return montant_gagne;
    }

    public void setMontant_gagne(double montant_gagne) {
        this.montant_gagne = montant_gagne;
    }

    public Joueur getJoueur1() {
        return joueur1;
    }

    public void setJoueur1(Joueur joueur1) {
        this.joueur1 = joueur1;
    }

    public Joueur getJoueur2() {
        return joueur2;
    }

    public void setJoueur2(Joueur joueur2) {
        this.joueur2 = joueur2;
    }

    public Partie getPartie_parie() {
        return partie_parie;
    }

    public void setPartie_parie(Partie partie_parie) {
        this.partie_parie = partie_parie;
    }

    public int getNum_joueur_parie() {
        return num_joueur_parie;
    }

    public void setNum_joueur_parie(int num_joueur_parie) {
        this.num_joueur_parie = num_joueur_parie;
    }

    public int getJoueur_gagnant() {
        return joueur_gagnant;
    }

    public void setJoueur_gagnant(int joueur_gagnant) {
        this.joueur_gagnant = joueur_gagnant;
    }
}
