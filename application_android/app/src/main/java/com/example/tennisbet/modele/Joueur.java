/*
  Troisemaine Colin (matricule 20 088 209)
  Levieux Quentin (matricule 20 102 087)
  Verdier Adrien (matricule 20 088 959)
  Alexandre Turpin (matricule 20 088 156)
 */

package com.example.tennisbet.modele;

import java.io.Serializable;

public class Joueur implements Serializable {

    private int id;
    private String prenom;
    private String nom;
    private int age;
    private int rang;
    private String pays;

    public Joueur(int id, String prenom, String nom, int age, int rang, String pays) {
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.age = age;
        this.rang = rang;
        this.pays = pays;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getRang() {
        return rang;
    }

    public void setRang(int rang) {
        this.rang = rang;
    }

    public String getPays() {
        return pays;
    }

    public void setPays(String pays) {
        this.pays = pays;
    }
}
