package com.example.tennisbet.modele;

public class Utilisateur {

    private int id;
    private String token;
    private String nomUtilisateur;

    public Utilisateur(int id, String token, String nomUtilisateur) {
        this.id = id;
        this.token = token;
        this.nomUtilisateur = nomUtilisateur;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }
}
