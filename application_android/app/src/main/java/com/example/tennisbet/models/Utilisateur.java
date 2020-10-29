package com.example.tennisbet.models;

public class Utilisateur {

    private int id;
    private String nom_utilisateur;

    public Utilisateur(int id, String nom_utilisateur) {
        this.id = id;
        this.nom_utilisateur = nom_utilisateur;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNom_utilisateur() {
        return nom_utilisateur;
    }

    public void setNom_utilisateur(String nom_utilisateur) {
        this.nom_utilisateur = nom_utilisateur;
    }
}
