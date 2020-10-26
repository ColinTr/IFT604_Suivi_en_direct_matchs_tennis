/**
 * Troisemaine Colin (matricule 20 088 209)
 * Levieux Quentin (matricule 20 102 087)
 * Verdier Adrien (matricule 20 088 959)
 * Alexandre Turpin (matricule 20 088 156)
 */

class Joueur {
  constructor (id_joueur, prenom, nom, age, rang, pays) {
    this.id_joueur = id_joueur;
    this.prenom = prenom;
    this.nom = nom;
    this.age = age;
    this.rang = rang;
    this.pays = pays;
  }
}

module.exports = Joueur;
